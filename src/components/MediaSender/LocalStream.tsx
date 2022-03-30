import styled from "@emotion/styled"
import { useCallback, useContext, useEffect, useRef } from "react"
import { MediaSenderContext } from "../../pages/MediaSender"
import Inputs from "./Inputs"

const LocalStream: React.VFC = () => {
  const {
    state: { audioDevice, localStream, videoDevice },
    dispatch,
  } = useContext(MediaSenderContext)

  const setDevices = useCallback(async () => {
    try {
      dispatch({
        type: "setDevices",
        payload: await navigator.mediaDevices.enumerateDevices(),
      })
    } catch {
      dispatch({
        type: "setDevices",
        payload: [],
      })
    }
  }, [dispatch])

  useEffect(() => {
    setDevices()
  }, [setDevices])

  const setLocalStream = useCallback(async () => {
    const constraints: MediaStreamConstraints = {
      audio: audioDevice
        ? {
            deviceId: audioDevice,
          }
        : false,
      video: videoDevice
        ? {
            deviceId: videoDevice,
            frameRate: 30,
            height: 720,
            width: 1280,
          }
        : false,
    }

    try {
      dispatch({
        type: "setLocalStream",
        payload: await navigator.mediaDevices.getUserMedia(constraints),
      })
    } catch {
      dispatch({
        type: "setLocalStream",
        payload: new MediaStream(),
      })
    }
  }, [audioDevice, dispatch, videoDevice])

  useEffect(() => {
    setLocalStream()
  }, [setLocalStream])

  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.srcObject = localStream
  }, [localStream])

  const { active, id } = localStream

  return (
    <fieldset>
      <legend>Local Stream</legend>
      <dl>
        <dt>Preview</dt>
        <dd>
          <StyledVideo autoPlay height={720} width={1280} ref={videoRef} />
        </dd>
        <dt>ID</dt>
        <dd>{id}</dd>
        <dt>Active</dt>
        <dd>{`${active}`}</dd>
      </dl>
      <Inputs />
    </fieldset>
  )
}

const StyledVideo = styled("video")`
  background-color: #000;
`

export default LocalStream
