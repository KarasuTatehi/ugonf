import { AnswerOption, CallOption } from "skyway-js"

export const answerOption: AnswerOption = {
  audioCodec: "opus",
  audioReceiveEnabled: false,
  videoCodec: "VP9",
  videoReceiveEnabled: false,
}

export const callOption: CallOption = {
  audioReceiveEnabled: true,
  videoReceiveEnabled: true,
}
