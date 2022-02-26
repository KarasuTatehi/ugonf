import styled from "@emotion/styled"
import React, { useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import Peer from "skyway-js"
import { callOption, peerConstructor } from "../utils/skyway"

type ReceiverParams = {
  remotePeerId: string
}
const Receiver: React.VFC = () => {
  const peerRef = useRef<Peer>()
  const params = useParams<ReceiverParams>()
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    if (!params.remotePeerId) return
    peerRef.current = new Peer(peerConstructor)
    setTimeout(() => {
      if (!peerRef.current) return
      const call = peerRef.current.call(
        `${params.remotePeerId}`,
        undefined,
        callOption
      )
      call.on("stream", (stream) => {
        if (!remoteVideoRef.current) return
        remoteVideoRef.current.srcObject = stream
      })
    }, 3000)
  }, [params.remotePeerId])

  return (
    <>
      <Video autoPlay muted playsInline ref={remoteVideoRef} />
    </>
  )
}

const Video = styled("video")`
  display: block;
  background-color: #0f0;
  width: 100vw;
  height: 100vh;
`

export default Receiver
