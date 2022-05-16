import styled from "@emotion/styled"
import { useContext, useEffect, useRef } from "react"
import { setMediaStream } from "../../functions/setMediaStream"
import { MediaSenderContext } from "../../pages/MediaSender"

const LocalStream: React.VFC = () => {
  const {
    state: { devices, localStream },
    dispatch,
  } = useContext(MediaSenderContext)

  useEffect(() => {
    ;(async () => {
      const devices = await navigator.mediaDevices.enumerateDevices()
      dispatch({ type: "setDevices", payload: devices })
    })()
  }, [dispatch])

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
        <label htmlFor="js-LocalStream__VideoInput">カメラソース</label>
      </div>
      <div>
        <select
          id="js-LocalStream__VideoInput"
          name="videoinput"
          onChange={async ({ target: { options, selectedIndex } }) => {
            let stream: MediaStream
            if (selectedIndex === 0) {
              stream = new MediaStream()
            } else {
              const deviceId = options[selectedIndex].value
              stream = await setMediaStream("media", deviceId)
            }
            dispatch({ type: "setLocalStream", payload: stream })
          }}
        >
          <option value="null">---------------------------------------------</option>
          {devices
            .filter(({ kind }) => kind === "videoinput")
            .map(({ deviceId, label }, i) => (
              <option key={i} value={deviceId}>
                {label}
              </option>
            ))}
        </select>
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
