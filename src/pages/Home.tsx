import React, { useEffect } from "react"
import { Link } from "react-router-dom"

const Home: React.VFC = () => {
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
  }, [])

  return (
    <fieldset>
      <legend>送信ソース</legend>
      <div>
        <Link to="/sender/media">
          <button>カメラ</button>
        </Link>
      </div>
      <div>
        <Link to="/sender/display">
          <button>画面</button>
        </Link>
      </div>
    </fieldset>
  )
}

export default Home
