import styled from "@emotion/styled"
import React, { useState, useRef } from "react"
import { peer } from "../../utils/skyway"

type handleChangeType = React.ChangeEventHandler<HTMLInputElement>
type handleCallType = React.MouseEventHandler<HTMLButtonElement>

const App: React.VFC = () => {
  const [peerId, setPeerId] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleChange: handleChangeType = ev => {
    setPeerId(ev.target.value)
  }

  const handleCall: handleCallType = () => {
    if (typeof window !== "undefined") {
      const mediaConnection = peer.call(peerId)
      mediaConnection.on("stream", stream => {
        if (!videoRef.current) return
        videoRef.current.srcObject = stream
      })
    }
  }

  return (
    <>
      <div>
        <Video autoPlay muted playsInline ref={videoRef} />
      </div>
      <div>
        <input onChange={handleChange} type="text" />
        <button onClick={handleCall}>Call</button>
      </div>
    </>
  )
}

const Video = styled("video")`
  background-color: #000;
  width: 640px;
  height: 480px;
`

export default App
