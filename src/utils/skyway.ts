import { CallOption, PeerConstructorOption } from "skyway-js"

export const peerConstructor: PeerConstructorOption = {
  key: `${process.env.REACT_APP_SKYWAY_API_KEY}`,
  debug: 3,
}

export const callOption: CallOption = {
  audioCodec: "opus",
  videoCodec: "VP9",
}
