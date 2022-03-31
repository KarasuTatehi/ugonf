import { useContext, useEffect } from "react"
import Peer from "skyway-js"
import { DisplaySenderContext } from "../../pages/DisplaySender"

const Skyway: React.VFC = () => {
  const {
    state: { key, localStream, peer, peerId, url },
    dispatch,
  } = useContext(DisplaySenderContext)

  const changeKey: React.ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    dispatch({ type: "setKey", payload: value })
  }

  const changePeerId: React.ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    dispatch({ type: "setPeerId", payload: value })
  }

  const clickPeerSwitch = () => {
    if (peer) {
      peer.destroy()
      dispatch({ type: "setPeer", payload: null })
    } else {
      if (!key) return
      if (peerId) {
        dispatch({
          type: "setPeer",
          payload: new Peer(peerId, { key: key, debug: 3 }),
        })
      } else {
        dispatch({
          type: "setPeer",
          payload: new Peer({ key: key, debug: 3 }),
        })
      }
    }
  }

  useEffect(() => {
    if (!peer || !localStream) return
    peer.once("open", (peerId) => {
      dispatch({ type: "setPeerId", payload: peerId })
    })
    peer.on("call", (call) => {
      call.answer(localStream)
    })
    return () => {
      peer.destroy()
    }
  }, [localStream, peer])

  useEffect(() => {
    switch (process.env.NODE_ENV) {
      case "development":
        return dispatch({
          type: "setUrl",
          payload: `${location.protocol}//${location.host}/receiver/${key}/${peerId}`,
        })

      case "production":
        return dispatch({
          type: "setUrl",
          payload: `${location.protocol}//${location.host}/ugonf/receiver/${key}/${peerId}`,
        })
    }
  }, [key, peerId])

  const clickCopy = () => {
    navigator.clipboard.writeText(`${url}`)
  }

  return (
    <fieldset>
      <legend>SkyWay</legend>
      <dl>
        <dt>
          <label htmlFor="js-Skyway__Key">Key</label>
        </dt>
        <dd>
          <input disabled={peer ? true : false} id="js-Skyway__Key" onChange={changeKey} type="password" />
        </dd>
        <dt>
          <label htmlFor="js-Skyway__PeerId">Peer ID</label>
        </dt>
        <dd>
          <input disabled={peer ? true : false} id="js-Skyway__PeerId" onChange={changePeerId} type="text" />
        </dd>
        <dt>Peer</dt>
        <dd>
          <button onClick={clickPeerSwitch}>Switch</button>
          {` => ${peer ? "Open" : "Close"}`}
        </dd>
        <dt>URL</dt>
        <dd>
          <button onClick={clickCopy}>Copy</button>
          {` => ${url}`}
        </dd>
      </dl>
    </fieldset>
  )
}

export default Skyway
