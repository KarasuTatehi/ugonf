import { useContext } from "react"
import { MediaSenderContext } from "../../pages/MediaSender"
import AudioInput from "./AudioInput"
import VideoInput from "./VideoInput"

const Inputs: React.VFC = () => {
  const { dispatch } = useContext(MediaSenderContext)

  const changeInput: React.ChangeEventHandler<HTMLSelectElement> = ({ target: { name, options, selectedIndex } }) => {
    switch (name) {
      case "audioinput":
        return dispatch({ type: "setAudioDevice", payload: options[selectedIndex].value })

      case "videoinput":
        return dispatch({ type: "setVideoDevice", payload: options[selectedIndex].value })
    }
  }

  return (
    <fieldset>
      <legend>Input</legend>
      <AudioInput onChange={changeInput} />
      <VideoInput onChange={changeInput} />
    </fieldset>
  )
}

export default Inputs
