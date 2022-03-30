import { useContext, useEffect } from "react"
import Peer from "skyway-js"
import { callOption } from "../../config/skyway"
import { ReceiverContext } from "../../pages/Receiver"

const Skyway: React.VFC = () => {
  const {
    state: { key, peer, to },
    dispatch,
  } = useContext(ReceiverContext)

  useEffect(() => {
    if (!key) return
    dispatch({
      type: "setPeer",
      payload: new Peer({ key: key, debug: 3 }),
    })
  }, [dispatch, key])

  useEffect(() => {
    if (!peer || !to) return
    peer.once("open", () => {
      const call = peer.call(to, undefined, callOption)
      call.on("stream", (stream) => {
        dispatch({ type: "setRemoteStream", payload: stream })
      })
    })
    return () => {
      peer.destroy()
    }
  }, [dispatch, peer, to])

  return <></>
}

export default Skyway
