import styled from "@emotion/styled"
import React, { useEffect, useRef, useState } from "react"
import Peer from "skyway-js"
import { peerOptions } from "../../utils/skyway"

let localStream: MediaStream

const App: React.VFC = () => {
  const [peer, setPeer] = useState<Peer>()
  const [peerId, setPeerId] = useState("")
  const listInit = [
    <option value="null" key={0}>
      null
    </option>,
  ]
  const [indicator, setIndicator] = useState<"Start" | "Stop">("Start")
  // const [audioInputList, setAudioInputList] = useState<JSX.Element[]>(listInit);
  // const [audioOutputList, setAudioOutputList] = useState<JSX.Element[]>(listInit);
  const [videoInputList, setVideoInputList] = useState<JSX.Element[]>(listInit)
  // const [audioInputDevice, setAudioInputDevice] = useState("");
  // const [audioOutputDevice, setAudioOutputDevice] = useState("");
  const [videoInputDevice, setVideoInputDevice] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!peer) return
    peer.on("open", setPeerId)
    peer.on("call", conn => {
      conn.answer(localStream, { videoCodec: "VP9" })
    })
  }, [peer])

  const clickBtnHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    switch (indicator) {
      case "Start":
        if (peer) {
          setPeer(new Peer(peerId, peerOptions))
        } else {
          setPeer(new Peer(peerOptions))
        }
        setIndicator("Stop")
        break

      case "Stop":
        if (!peer) return
        peer.destroy()
        setIndicator("Start")
        break
    }
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

  type DeviceIdCheck = (str: string) => MediaStreamConstraints

  useEffect(() => {
    const constraints: DeviceIdCheck = (str) => {
      switch (str) {
        case "":
          return {
            audio: false,
            video: false,
          }

        default:
          return {
            // audio: {
            //   deviceId: audioInputDevice,
            // },
            audio: false,
            video: {
              deviceId: str,
              frameRate: 30,
              height: 720,
              width: 1280,
            },
          }
      }
    }

    navigator.mediaDevices
      .getUserMedia(constraints(videoInputDevice))
      .then(stream => {
        localStream = stream
        if (!videoRef.current) return
        videoRef.current.srcObject = stream
      })
      .catch(console.error)
  }, [videoInputDevice])

  const clickTextHandler: React.MouseEventHandler<HTMLInputElement> = ev => {
    navigator.clipboard.writeText(`${location.href}send/?peerId=${peerId}`)
  }

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
        <span>Peer ID: </span>
        <input
          onClick={clickTextHandler}
          readOnly={true}
          type="text"
          value={peerId}
        />
      </div>
      <div>
        <button onClick={clickBtnHandler}>{indicator}</button>
      </div>
    </>
  )
}

const Video = styled("video")`
  background-color: #000;
  width: 1280px;
  height: 720px;
`

export default App
