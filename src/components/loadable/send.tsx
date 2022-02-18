import styled from "@emotion/styled"
import { useLocation } from "@reach/router"
import queryString from "query-string"
import React, { useRef, useEffect } from "react"
import Peer from "skyway-js"
import { peerOptions } from "../../utils/skyway"

const App: React.VFC = () => {
  const peer = new Peer(peerOptions)
  const search = useLocation().search
  const query = queryString.parse(search)
  const peerId = query["peerId"]
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setTimeout(() => {
      if (typeof peerId !== "string") return
      if (!peerId) return

      const mediaConnection = peer.call(peerId)

      mediaConnection.on("stream", stream => {
        if (!videoRef.current) return
        videoRef.current.srcObject = stream
      })

      mediaConnection.on("close", () => {
        peer.destroy()
      })
    }, 3000)
  }, [])

  return (
    <>
      <div>
        <Video autoPlay muted playsInline ref={videoRef} />
      </div>
    </>
  )
}

const Video = styled("video")`
  background-color: #0f0;
  width: 100vw;
  height: 100vh;
`

export default App
