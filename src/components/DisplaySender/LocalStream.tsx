import styled from "@emotion/styled"
import { useCallback, useContext, useEffect, useRef } from "react"
import { displayConstraints } from "../../config/local-stream"
import { DisplaySenderContext } from "../../pages/DisplaySender"

const LocalStream: React.VFC = () => {
  const {
    state: { localStream },
    dispatch,
  } = useContext(DisplaySenderContext)

  const setLocalStream = useCallback(() => {
    navigator.mediaDevices.getDisplayMedia(displayConstraints).then((stream) => {
      dispatch({ type: "setLocalStream", payload: stream })
    })
  }, [dispatch])

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
        <dt>
          <label htmlFor="js-LocalStream__Input">Input</label>
        </dt>
        <dd>
          <button id="js-LocalStream__Input" onClick={setLocalStream}>
            Select
          </button>
        </dd>
      </dl>
    </fieldset>
  )
}

const StyledVideo = styled("video")`
  background-color: #000;
`

export default LocalStream
