import React, { useEffect } from "react"
import { Link } from "react-router-dom"

const Home: React.VFC = () => {
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
  }, [])

  return (
    <>
      <span>Sending Type: </span>
      <Link to="/sender/media">
        <button>Media</button>
      </Link>
      <Link to="/sender/display">
        <button>Display</button>
      </Link>
    </>
  )
}

export default Home
