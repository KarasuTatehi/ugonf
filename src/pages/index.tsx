import styled from "@emotion/styled";
import React, { useState, useRef, useEffect } from "react";
import { MediaConnection } from "skyway-js";
import peer from "../utils/skyway";

let localStream: MediaStream;

const Home: React.VFC = () => {
  const myRef = useRef<HTMLVideoElement>(null);
  const theirRef = useRef<HTMLVideoElement>(null);
  const [peerId, setPeerId] = useState<string>("");
  const [theirId, setTheirId] = useState<string>("");
  // const [localStream, setLocalStream] = useState(new MediaStream());
  // const [remoteStream, setRemoteStream] = useState(new MediaStream());

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: {
          frameRate: 30,
          height: 480,
          width: 640,
        },
      })
      .then((stream) => {
        // setLocalStream(stream);
        localStream = stream;
        if (!myRef.current) return;
        myRef.current.srcObject = stream;
      })
      .catch(console.error);

    peer.on("open", setPeerId);
  }, []);

  const handleCall = () => {
    const mediaConnection = peer.call(theirId, localStream);
    setEventListener(mediaConnection);
  };

  const setEventListener = (mediaConnection: MediaConnection) => {
    mediaConnection.on("stream", (stream: MediaStream) => {
      if (!theirRef.current) return;
      theirRef.current.srcObject = stream;
    });
  };

  peer.on("call", (mediaConnection) => {
    mediaConnection.answer(localStream);
    setEventListener(mediaConnection);
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setTheirId(event.target.value);
  };

  return (
    <>
      <Video
        autoPlay
        muted
        playsInline
        ref={myRef}
      />
      <Video
        autoPlay
        muted
        playsInline
        ref={theirRef}
      />
      <div>
        PeerId: {peerId}
      </div>
      <div>
        <input onChange={handleChange} type="text" />
        <button onClick={handleCall}>Send</button>
      </div>
    </>
  );
}

export default Home;

const Video = styled("video")`
  background-color: #000;
  width: 640px;
  height: 480px;
`;
