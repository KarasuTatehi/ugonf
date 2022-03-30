import { createContext, useEffect, useReducer } from "react"
import { useParams } from "react-router-dom"
import Peer from "skyway-js"
import RemoteStream from "../components/Receiver/RemoteStream"
import Skyway from "../components/Receiver/Skyway"

type State = {
  key: string
  peer: Peer | null
  remoteStream: MediaStream | null
  to: string
}

type Action =
  | {
      type: "setKey"
      payload: string
    }
  | {
      type: "setPeer"
      payload: Peer | null
    }
  | {
      type: "setRemoteStream"
      payload: MediaStream
    }
  | {
      type: "setTo"
      payload: string
    }

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "setKey":
      return { ...state, key: action.payload }

    case "setPeer":
      return { ...state, peer: action.payload }

    case "setRemoteStream":
      return { ...state, remoteStream: action.payload }

    case "setTo":
      return { ...state, to: action.payload }
  }
}

const initState: State = {
  key: "",
  peer: null,
  remoteStream: null,
  to: "",
}

type Ctx = {
  state: State
  dispatch: React.Dispatch<Action>
}

export const ReceiverContext = createContext<Ctx>({} as Ctx)

export type ReceiverParams = {
  key: string
  to: string
}

const Receiver: React.VFC = () => {
  const [state, dispatch] = useReducer(reducer, initState)

  const { key, to } = useParams<ReceiverParams>()

  useEffect(() => {
    dispatch({ type: "setKey", payload: `${key}` })
    dispatch({ type: "setTo", payload: `${to}` })
  }, [key, to])

  return (
    <ReceiverContext.Provider value={{ state, dispatch }}>
      <RemoteStream />
      <Skyway />
    </ReceiverContext.Provider>
  )
}

export default Receiver
