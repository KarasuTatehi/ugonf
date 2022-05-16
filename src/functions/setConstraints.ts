import { mediaStreamConstraints } from "../config/localStream"

type FunctionType = (type: "display" | "media", deviceId?: ConstrainDOMString) => MediaStreamConstraints

export const setConstraints: FunctionType = (type, deviceId) => {
  const { audio, video } = mediaStreamConstraints
  let constraints: MediaStreamConstraints

  switch (type) {
    case "display":
      constraints = { audio, video }
      break

    case "media":
      constraints = { audio, video: { ...video, deviceId } }
      break
  }

  return constraints
}
