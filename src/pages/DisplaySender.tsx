import styled from "@emotion/styled"
import { useCallback, useEffect, useReducer, useRef } from "react"
import { useLocation } from "react-use"
import Peer from "skyway-js"
import { answerOption, peerConstructor } from "../utils/skyway"

type State = {
  localStreamId?: string
  localStreamActivity?: boolean
  localPeerId: string
  sending: "Start" | "Stop"
  receiverUrl: string
}

type Action =
  | {
      type: "setLocalStreamId"
      payload: string
    }
  | {
      type: "setLocalStreamActivity"
      payload: boolean
    }
  | {
      type: "setLocalPeerId"
      payload: string
    }
  | {
      type: "setSending"
      payload: "Start" | "Stop"
    }
  | {
      type: "setReceiverUrl"
      payload: string
    }

const initState: State = {
  localPeerId: "",
  sending: "Start",
  receiverUrl: "",
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "setLocalStreamId":
      return {
        ...state,
        localStreamId: action.payload,
      }

    case "setLocalStreamActivity":
      return {
        ...state,
        localStreamActivity: action.payload,
      }

    case "setLocalPeerId":
      return {
        ...state,
        localPeerId: action.payload,
      }

    case "setSending":
      return {
        ...state,
        sending: action.payload,
      }

    case "setReceiverUrl":
      return {
        ...state,
        receiverUrl: action.payload,
      }
  }
}

const DisplaySender: React.VFC = () => {
  const [state, dispatch] = useReducer(reducer, initState)

  const localStreamRef = useRef<MediaStream>()
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const setLocalStream = useCallback(async () => {
    if (!localVideoRef.current) return
    const constraints = {
      audio: false,
      video: {
        frameRate: 30,
        height: 720,
        width: 1280,
      },
    }
    try {
      localStreamRef.current = await navigator.mediaDevices.getDisplayMedia(constraints)
      localVideoRef.current.srcObject = localStreamRef.current
      dispatch({ type: "setLocalStreamId", payload: localStreamRef.current.id })
      dispatch({ type: "setLocalStreamActivity", payload: localStreamRef.current.active })
    } catch {
      localStreamRef.current = new MediaStream()
      localVideoRef.current.srcObject = localStreamRef.current
      dispatch({ type: "setLocalStreamId", payload: localStreamRef.current.id })
      dispatch({ type: "setLocalStreamActivity", payload: localStreamRef.current.active })
    }
  }, [])

  const clickSendingBtn: React.MouseEventHandler<HTMLButtonElement> = () => {
    switch (state.sending) {
      case "Start":
        dispatch({ type: "setSending", payload: "Stop" })
        break

      case "Stop":
        dispatch({ type: "setSending", payload: "Start" })
        break
    }
  }

  const peerRef = useRef<Peer>()
  const location = useLocation()
  useEffect(() => {
    peerRef.current = new Peer(peerConstructor)
    peerRef.current.on("open", (peerId) => {
      switch (process.env.NODE_ENV) {
        case "development":
          dispatch({
            type: "setReceiverUrl",
            payload: `${location.protocol}//${location.host}/receiver/${peerId}`,
          })
          break

        case "production":
          dispatch({
            type: "setReceiverUrl",
            payload: `${location.protocol}//${location.host}/ugonf/receiver/${peerId}`,
          })
          break
      }
      dispatch({ type: "setLocalPeerId", payload: peerId })
    })
    peerRef.current.destroy()
  }, [location.host, location.protocol])
  useEffect(() => {
    switch (state.sending) {
      case "Start":
        if (!peerRef.current) return
        peerRef.current.destroy()
        break

      case "Stop":
        peerRef.current = new Peer(state.localPeerId, peerConstructor)
        break
    }
    peerRef.current.on("call", (conn) => {
      conn.answer(localStreamRef.current, answerOption)
    })
  }, [state.localPeerId, state.sending])
  const clickCopyBtn = () => {
    navigator.clipboard.writeText(state.receiverUrl)
  }

  return (
    <>
      <fieldset>
        <legend>Local Stream</legend>
        <Video autoPlay muted playsInline ref={localVideoRef} />
        <hr />
        <div>
          <span>ID: </span>
          <span>{state.localStreamId}</span>
        </div>
        <div>
          <span>Activity: </span>
          <span>{state.localStreamActivity}</span>
        </div>
      </fieldset>
      <fieldset>
        <legend>Display</legend>
        <div>
          <span>Input: </span>
          <button onClick={setLocalStream}>Select</button>
        </div>
        <div>
          <span>Sending: </span>
          <button onClick={clickSendingBtn}>{state.sending}</button>
        </div>
      </fieldset>
      <fieldset>
        <legend>Receiver</legend>
        <div>
          <span>URL: </span>
          <span>{state.receiverUrl} </span>
          <button onClick={clickCopyBtn}>Copy</button>
        </div>
      </fieldset>
    </>
  )
}

const Video = styled("video")`
  display: block;
  background-color: #000;
  width: 100%;
  height: 720px;
`

export default DisplaySender
