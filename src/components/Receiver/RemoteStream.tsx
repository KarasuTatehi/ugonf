import styled from "@emotion/styled"
import { useContext, useEffect, useRef } from "react"
import { ReceiverContext } from "../../pages/Receiver"

const RemoteStream: React.VFC = () => {
  const {
    state: { remoteStream },
  } = useContext(ReceiverContext)

  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const video = videoRef.current
    if (!remoteStream || !video) return
    video.srcObject = remoteStream
  }, [remoteStream])

  return <Video width={1280} height={720} autoPlay muted playsInline ref={videoRef} />
}

const Video = styled("video")`
  background-color: #0f0;
`

export default RemoteStream
