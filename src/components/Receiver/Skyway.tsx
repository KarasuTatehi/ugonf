import { useContext, useEffect } from "react"
import Peer from "skyway-js"
import { callOption } from "../../config/skyway"
import { ReceiverContext } from "../../pages/Receiver"

const Skyway: React.VFC = () => {
  const {
    state: {
      params: { key, to },
      peer,
    },
    dispatch,
  } = useContext(ReceiverContext)

  useEffect(() => {
    if (!key) return
    dispatch({ type: "setPeer", payload: new Peer({ key, debug: 3 }) })
  }, [dispatch, key])

  useEffect(() => {
    if (!peer) return
    peer.once("open", () => {
      const call = peer.call(to, undefined, callOption)
      call.once("stream", (stream) => {
        dispatch({ type: "setRemoteStream", payload: stream })
      })
    })
  }, [dispatch, peer])

  return <></>
}

export default Skyway
