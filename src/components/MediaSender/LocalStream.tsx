import styled from "@emotion/styled"
import { useCallback, useContext, useEffect, useRef } from "react"
import { MediaSenderContext } from "../../pages/MediaSender"
import Inputs from "./Inputs"

const LocalStream: React.VFC = () => {
  const {
    state: { audioDevice, localStream, videoDevice },
    dispatch,
  } = useContext(MediaSenderContext)

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      dispatch({ type: "setDevices", payload: devices })
    })
  }, [dispatch])

  const localStreamConstraints = useCallback(() => {
    return {
      audio: false,
      // audio: audioDevice
      //   ? {
      //       deviceId: audioDevice,
      //     }
      //   : false,
      video: videoDevice
        ? {
            deviceId: videoDevice,
            frameRate: 30,
            height: 720,
            width: 1280,
          }
        : false,
    }
  }, [audioDevice, videoDevice])

  useEffect(() => {
    navigator.mediaDevices.getUserMedia(localStreamConstraints()).then((stream) => {
      dispatch({ type: "setLocalStream", payload: stream })
    })
  }, [dispatch, localStreamConstraints])

  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const video = videoRef.current
    if (!video || !localStream) return
    video.srcObject = localStream
  }, [localStream])

  return (
    <fieldset>
      <legend>Local Stream</legend>
      <dl>
        <dt>Preview</dt>
        <dd>
          <StyledVideo width={1280} height={720} autoPlay muted playsInline ref={videoRef} />
        </dd>
        <dt>ID</dt>
        <dd>{`${localStream?.id}`}</dd>
        <dt>Active</dt>
        <dd>{`${localStream?.active}`}</dd>
      </dl>
      <Inputs />
    </fieldset>
  )
}

const StyledVideo = styled("video")`
  background-color: #000;
`

export default LocalStream
