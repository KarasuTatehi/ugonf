import { setConstraints } from "./setConstraints"

type FunctionType = (type: "display" | "media", device?: ConstrainDOMString) => Promise<MediaStream>

export const setMediaStream: FunctionType = async (type, device) => {
  const constraints = setConstraints(type, device)
  let stream: MediaStream

  switch (type) {
    case "display":
      stream = await navigator.mediaDevices.getDisplayMedia(constraints)
      break

    case "media":
      stream = await navigator.mediaDevices.getUserMedia(constraints)
      break
  }

  return stream
}
