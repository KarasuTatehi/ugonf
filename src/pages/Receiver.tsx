import { createContext, useEffect, useReducer } from "react"
import { useParams } from "react-router-dom"
import Peer from "skyway-js"
import RemoteStream from "../components/Receiver/RemoteStream"
import Skyway from "../components/Receiver/Skyway"

export type ReceiverParams = {
  key: string
  to: string
}

type State = {
  remoteStream?: MediaStream
  params: ReceiverParams
  peer: Peer | null
}

type Action =
  | {
      type: "setRemoteStream"
      payload: MediaStream
    }
  | {
      type: "setParams"
      payload: ReceiverParams
    }
  | {
      type: "setPeer"
      payload: Peer | null
    }

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "setRemoteStream":
      return { ...state, remoteStream: action.payload }

    case "setParams":
      return { ...state, params: action.payload }

    case "setPeer":
      return { ...state, peer: action.payload }
  }
}

const initState: State = {
  params: {
    key: "",
    to: "",
  },
  peer: null,
}

type Ctx = {
  state: State
  dispatch: React.Dispatch<Action>
}

export const ReceiverContext = createContext({} as Ctx)

const Receiver: React.VFC = () => {
  const [state, dispatch] = useReducer(reducer, initState)

  const { key, to } = useParams<ReceiverParams>()
  useEffect(() => {
    if (!key || !to) return
    dispatch({ type: "setParams", payload: { key, to } })
  }, [key, to])

  return (
    <ReceiverContext.Provider value={{ state, dispatch }}>
      <RemoteStream />
      <Skyway />
    </ReceiverContext.Provider>
  )
}

export default Receiver
