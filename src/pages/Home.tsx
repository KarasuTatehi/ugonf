import React, { useEffect } from "react"
import { Link } from "react-router-dom"

const Home: React.VFC = () => {
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
  }, [])

  return <Link to="/sender">Let's Sending</Link>
}

export default Home
