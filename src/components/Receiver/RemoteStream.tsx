import { useContext, useEffect, useRef } from "react"
import { ReceiverContext } from "../../pages/Receiver"

const RemoteStream: React.VFC = () => {
  const {
    state: { remoteStream },
  } = useContext(ReceiverContext)

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !remoteStream) return
    video.srcObject = remoteStream
  }, [remoteStream])

  return <video autoPlay height={720} width={1280} ref={videoRef} />
}

export default RemoteStream
