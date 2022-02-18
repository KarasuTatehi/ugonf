import styled from "@emotion/styled"
import React, { useEffect, useRef, useState } from "react"
import { peer } from "../../utils/skyway"

let localStream: MediaStream

const App: React.VFC = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [peerId, setPeerId] = useState("")

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          frameRate: 30,
          height: 480,
          width: 640,
        },
      })
      .then(stream => {
        localStream = stream
        if (!videoRef.current) return
        videoRef.current.srcObject = stream
      })
      .catch(console.error)

    peer.on("open", setPeerId)

    peer.on("call", conn => {
      conn.answer(localStream, { videoCodec: "VP9" })
    })
  }, [])

  return (
    <>
      <div>
        <Video autoPlay muted playsInline ref={videoRef} />
      </div>
      <div>PeerID: {peerId}</div>
    </>
  )
}

const Video = styled("video")`
  background-color: #000;
  width: 640px;
  height: 480px;
`

export default App
