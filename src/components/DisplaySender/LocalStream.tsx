import styled from "@emotion/styled"
import { useCallback, useContext, useEffect, useRef } from "react"
import { displayConstraints } from "../../config/local-stream"
import { DisplaySenderContext } from "../../pages/DisplaySender"

const LocalStream: React.VFC = () => {
  const {
    state: { localStream },
    dispatch,
  } = useContext(DisplaySenderContext)

  const setLocalStream = useCallback(async () => {
    try {
      dispatch({
        type: "setLocalStream",
        payload: await navigator.mediaDevices.getDisplayMedia(displayConstraints),
      })
    } catch {
      dispatch({
        type: "setLocalStream",
        payload: new MediaStream(),
      })
    }
  }, [dispatch])

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
