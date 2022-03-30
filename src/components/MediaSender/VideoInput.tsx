import { useContext } from "react"
import { MediaSenderContext } from "../../pages/MediaSender"

type Props = {
  onChange: React.ChangeEventHandler<HTMLSelectElement>
}

const VideoInput: React.VFC<Props> = ({ onChange }) => {
  const {
    state: { devices },
  } = useContext(MediaSenderContext)

  return (
    <>
      <dt>
        <label htmlFor="js-LocalStream__VideoInput">Video</label>
      </dt>
      <dd>
        <select id="js-LocalStream__VideoInput" name="videoinput" onChange={onChange}>
          <option value="">--------------------------------------------------</option>
          {devices
            .filter(({ kind }) => kind === "videoinput")
            .map(({ deviceId, label }, i) => (
              <option key={i} value={deviceId}>
                {label}
              </option>
            ))}
        </select>
      </dd>
    </>
  )
}

export default VideoInput
