import styled from "@emotion/styled"
import { useReducer, useEffect, useRef, useCallback } from "react"
import { useLocation } from "react-use"
import Peer from "skyway-js"
import { peerConstructor, callOption } from "../utils/skyway"

type State = {
  devices: MediaDeviceInfo[]
  selectedAudioDevice: string
  selectedVideoDevice: string
  localPeerId: string
  sending: "Start" | "Stop"
  receiverUrl: string
}

type Action =
  | {
      type: "setDevices"
      payload: MediaDeviceInfo[]
    }
  | {
      type: "setSelectedVideoDevice"
      payload: string
    }
  | {
      type: "setSelectedAudioDevice"
      payload: string
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
  devices: [],
  selectedAudioDevice: "",
  selectedVideoDevice: "",
  localPeerId: "",
  sending: "Start",
  receiverUrl: "",
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "setDevices":
      return {
        ...state,
        devices: action.payload,
      }

    case "setSelectedAudioDevice":
      return {
        ...state,
        selectedAudioDevice: action.payload,
      }

    case "setSelectedVideoDevice":
      return {
        ...state,
        selectedVideoDevice: action.payload,
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

const Sender: React.VFC = () => {
  const [state, dispatch] = useReducer(reducer, initState)
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      dispatch({ type: "setDevices", payload: devices })
    })
  }, [])

  const changeDevicesOptionHandler = (
    ev: React.ChangeEvent<HTMLSelectElement>
  ) => {
    switch (ev.target.name) {
      case "audioinput":
        return dispatch({
          type: "setSelectedAudioDevice",
          payload: ev.target.options[ev.target.selectedIndex].value,
        })

      case "videoinput":
        return dispatch({
          type: "setSelectedVideoDevice",
          payload: ev.target.options[ev.target.selectedIndex].value,
        })
    }
  }

  const localStreamRef = useRef<MediaStream>()
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const setLocalStream = useCallback(async () => {
    if (!localVideoRef.current) return
    const constraints = {
      audio: state.selectedAudioDevice
        ? {
            deviceId: state.selectedAudioDevice,
          }
        : false,
      video: state.selectedVideoDevice
        ? {
            deviceId: state.selectedVideoDevice,
            frameRate: 30,
            height: 720,
            width: 1280,
          }
        : false,
    }
    try {
      localStreamRef.current = await navigator.mediaDevices.getUserMedia(
        constraints
      )
      localVideoRef.current.srcObject = localStreamRef.current
    } catch {
      localStreamRef.current = new MediaStream()
      localVideoRef.current.srcObject = localStreamRef.current
    }
  }, [state.selectedAudioDevice, state.selectedVideoDevice])
  useEffect(() => {
    setLocalStream()
  }, [setLocalStream])

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
      conn.answer(localStreamRef.current, callOption)
    })
  }, [state.localPeerId, state.sending])
  const clickCopyBtn = () => {
    navigator.clipboard.writeText(state.receiverUrl)
  }

  return (
    <>
      <div>
        <Video autoPlay muted playsInline ref={localVideoRef} />
      </div>
      <div>
        <span>Audio: </span>
        <select name="audioinput" onChange={changeDevicesOptionHandler}>
          <option value="">
            --------------------------------------------------
          </option>
          {state.devices
            .filter((device) => device.kind === "audioinput")
            .map((device, index) => (
              <option key={index} value={device.deviceId}>
                {device.label}
              </option>
            ))}
        </select>
      </div>
      <div>
        <span>Video: </span>
        <select name="videoinput" onChange={changeDevicesOptionHandler}>
          <option value="">
            --------------------------------------------------
          </option>
          {state.devices
            .filter((device) => device.kind === "videoinput")
            .map((device, index) => (
              <option key={index} value={device.deviceId}>
                {device.label}
              </option>
            ))}
        </select>
      </div>
      <div>
        <span>LocalStream ID: </span>
        <span>
          {localStreamRef.current?.id} ({`${localStreamRef.current?.active}`})
        </span>
      </div>
      <div>
        <span>Sending: </span>
        <button onClick={clickSendingBtn}>{state.sending}</button>
      </div>
      <div>
        <span>Receiver URL: </span>
        <span>{state.receiverUrl} </span>
        <button onClick={clickCopyBtn}>Copy</button>
      </div>
    </>
  )
}

const Video = styled("video")`
  display: block;
  background-color: #000;
  width: 100%;
  height: 720px;
`

export default Sender
