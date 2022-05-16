import React, { useReducer, createContext } from "react"
import Peer from "skyway-js"
import LocalStream from "../components/MediaSender/LocalStream"
import Skyway from "../components/MediaSender/Skyway"

type State = {
  devices: MediaDeviceInfo[]
  key: string
  localStream?: MediaStream
  peer: Peer | null
  peerId: string
}

type Action =
  | {
      type: "setDevices"
      payload: MediaDeviceInfo[]
    }
  | {
      type: "setKey"
      payload: string
    }
  | {
      type: "setLocalStream"
      payload: MediaStream
    }
  | {
      type: "setPeer"
      payload: Peer | null
    }
  | {
      type: "setPeerId"
      payload: string
    }

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "setDevices":
      return { ...state, devices: action.payload }

    case "setKey":
      return { ...state, key: action.payload }

    case "setLocalStream":
      return { ...state, localStream: action.payload }

    case "setPeer":
      return { ...state, peer: action.payload }

    case "setPeerId":
      return { ...state, peerId: action.payload }
  }
}

const initState: State = {
  devices: [],
  key: "",
  peer: null,
  peerId: "",
}

type Ctx = {
  state: State
  dispatch: React.Dispatch<Action>
}

export const MediaSenderContext = createContext<Ctx>({} as Ctx)

const MediaSender: React.VFC = () => {
  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <MediaSenderContext.Provider value={{ state, dispatch }}>
      <LocalStream />
      <Skyway />
    </MediaSenderContext.Provider>
  )
}

export default MediaSender
