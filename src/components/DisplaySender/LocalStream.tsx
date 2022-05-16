import styled from "@emotion/styled"
import { useCallback, useContext, useEffect, useRef } from "react"
import { setMediaStream } from "../../functions/setMediaStream"
import { DisplaySenderContext } from "../../pages/DisplaySender"

const LocalStream: React.VFC = () => {
  const {
    state: { localStream },
    dispatch,
  } = useContext(DisplaySenderContext)

  const setLocalStream = useCallback(async () => {
    const stream = await setMediaStream("display")
    dispatch({ type: "setLocalStream", payload: stream })
  }, [])

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !localStream) return
    video.srcObject = localStream
  }, [localStream])

  return (
    <fieldset>
      <div>プレビュー</div>
      <div>
        <StyledVideoOuter style={{ borderColor: `${localStream?.active ? "red" : "gray"}` }}>
          <StyledVideo width={896} height={504} autoPlay muted playsInline ref={videoRef} />
        </StyledVideoOuter>
      </div>
      <div>
        <label htmlFor="js-LocalStream__Input">画面ソース</label>
      </div>
      <div>
        <button id="js-LocalStream__Input" onClick={setLocalStream}>
          選択
        </button>
      </div>
    </fieldset>
  )
}

const StyledVideoOuter = styled("div")`
  display: inline-block;
  border-style: solid;
  border-width: 2px;
`

const StyledVideo = styled("video")`
  background-color: #000;
`

export default LocalStream
