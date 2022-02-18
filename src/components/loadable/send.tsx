import styled from "@emotion/styled"
import { useLocation } from "@reach/router"
import queryString from "query-string"
import React, { useState, useRef, useEffect } from "react"
import { peer } from "../../utils/skyway"

const App: React.VFC = () => {
  const [peerId, setPeerId] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const search = useLocation().search
  const query = queryString.parse(search)

  useEffect(() => {
    setTimeout(() => {
      if (typeof query["peerId"] !== "string") return
      const mediaConnection = peer.call(query["peerId"])
      mediaConnection.on("stream", stream => {
        if (!videoRef.current) return
        videoRef.current.srcObject = stream
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
