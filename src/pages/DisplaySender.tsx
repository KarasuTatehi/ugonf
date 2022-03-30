import { createContext, useReducer } from "react"
import Peer from "skyway-js"
import LocalStream from "../components/DisplaySender/LocalStream"
import Skyway from "../components/DisplaySender/Skyway"

type State = {
  key: string
  localStream: MediaStream
  peer: Peer | null
  peerId: string
  url: string
}

type Action =
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
  | {
      type: "setUrl"
      payload: string
    }

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "setKey":
      return { ...state, key: action.payload }

    case "setLocalStream":
      return { ...state, localStream: action.payload }

    case "setPeer":
      return { ...state, peer: action.payload }

    case "setPeerId":
      return { ...state, peerId: action.payload }

    case "setUrl":
      return { ...state, url: action.payload }
  }
}

const initState: State = {
  key: "",
  localStream: new MediaStream(),
  peer: null,
  peerId: "",
  url: "",
}

type Ctx = {
  state: State
  dispatch: React.Dispatch<Action>
}

export const DisplaySenderContext = createContext<Ctx>({} as Ctx)

const DisplaySender: React.VFC = () => {
  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <DisplaySenderContext.Provider value={{ state, dispatch }}>
      <LocalStream />
      <Skyway />
    </DisplaySenderContext.Provider>
  )
}

export default DisplaySender
