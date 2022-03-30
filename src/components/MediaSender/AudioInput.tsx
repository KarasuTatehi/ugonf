import { useContext } from "react"
import { MediaSenderContext } from "../../pages/MediaSender"

type Props = {
  onChange: React.ChangeEventHandler<HTMLSelectElement>
}

const AudioInput: React.VFC<Props> = ({ onChange }) => {
  const {
    state: { devices },
  } = useContext(MediaSenderContext)

  return (
    <>
      <dt>
        <label htmlFor="js-LocalStream__AudioInput">Video</label>
      </dt>
      <dd>
        <select id="js-LocalStream__AudioInput" name="audioinput" onChange={onChange}>
          <option value="">--------------------------------------------------</option>
          {devices
            .filter(({ kind }) => kind === "audioinput")
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

export default AudioInput
