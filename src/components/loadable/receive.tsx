import styled from "@emotion/styled"
import React, { useEffect, useRef, useState } from "react"
import Peer from "skyway-js"
import { peerOptions } from "../../utils/skyway"

let localStream: MediaStream

const App: React.VFC = () => {
  const [peer, setPeer] = useState<Peer>(new Peer(peerOptions))
  const [peerId, setPeerId] = useState("")
  const listInit = [
    <option value="null" key={-1}>
      null
    </option>,
  ]
  // const [audioInputList, setAudioInputList] = useState<JSX.Element[]>(listInit);
  // const [audioOutputList, setAudioOutputList] = useState<JSX.Element[]>(listInit);
  const [videoInputList, setVideoInputList] = useState<JSX.Element[]>(listInit)
  // const [audioInputDevice, setAudioInputDevice] = useState("");
  // const [audioOutputDevice, setAudioOutputDevice] = useState("");
  const [videoInputDevice, setVideoInputDevice] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    peer.on("open", setPeerId)
    peer.on("call", conn => {
      conn.answer(localStream, { videoCodec: "VP9" })
    })
  }, [peer])

  const clickGoStreamBtn: React.MouseEventHandler<HTMLButtonElement> = () => {
    peer.destroy()
    setPeer(new Peer(peerId, peerOptions))
  }

  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then(devices => {
        const $audioInputList: JSX.Element[] = []
        const $audioOutputList: JSX.Element[] = []
        const $videoInputList: JSX.Element[] = []

        devices.forEach((device, index) => {
          const { label, deviceId } = device
          const option = (
            <option value={deviceId} key={index}>
              {label}
            </option>
          )

          switch (device.kind) {
            case "audioinput":
              $audioInputList.push(option)
              break

            case "audiooutput":
              $audioOutputList.push(option)
              break

            case "videoinput":
              $videoInputList.push(option)
              break
          }
        })

        // setAudioInputList($audioInputList)
        // setAudioOutputList($audioOutputList)
        setVideoInputList($videoInputList)
      })
      .catch(console.error)
  }, [])

  const changeSelectHandler = (
    ev: React.ChangeEvent<HTMLSelectElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const target = ev.target
    const index = target.selectedIndex
    const value = target.options[index].value
    setState(value)
  }

  // const changeAudioInputDeviceHandler: React.ChangeEventHandler<HTMLSelectElement> = (ev) => {
  //   changeSelectHandler(ev, setAudioInputDevice)
  // }

  // const changeAudioOutputDeviceHandler: React.ChangeEventHandler<HTMLSelectElement> = (ev) => {
  //   changeSelectHandler(ev, setAudioOutputDevice)
  // }

  const changeVideoInputDeviceHandler: React.ChangeEventHandler<
    HTMLSelectElement
  > = ev => {
    changeSelectHandler(ev, setVideoInputDevice)
  }

  useEffect(() => {
    const constraints: MediaStreamConstraints = {
      // audio: {
      //   deviceId: audioInputDevice,
      // },
      audio: false,
      video: {
        deviceId: videoInputDevice,
        frameRate: 30,
        height: 480,
        width: 640,
      },
    }

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(stream => {
        localStream = stream
        if (!videoRef.current) return
        videoRef.current.srcObject = stream
      })
      .catch(console.error)
  }, [videoInputDevice])

  return (
    <>
      <div>
        <Video autoPlay muted playsInline ref={videoRef} />
      </div>
      {/* <div>
        <span>Audio Input (dev): </span>
        <select onChange={changeAudioInputDeviceHandler}>
          {audioInputList}
        </select>
      </div>
      <div>
        <span>Audio Output (dev): </span>
        <select onChange={changeAudioOutputDeviceHandler}>
          {audioOutputList}
        </select>
      </div> */}
      <div>
        <span>Video Input: </span>
        <select onChange={changeVideoInputDeviceHandler}>
          {videoInputList}
        </select>
      </div>
      <div>
        <span>Peer ID: {peerId}</span>
      </div>
      <div>
        <button onClick={clickGoStreamBtn}>GoStream</button>
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
