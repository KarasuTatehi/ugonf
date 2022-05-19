import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { Row } from "../styles/layout"

const Home: React.VFC = () => {
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
  }, [])

  return (
    <fieldset>
      <legend>送信ソース</legend>
      <Row>
        <div>
          <Link to="/sender/media">
            <button>カメラ</button>
          </Link>
        </div>
        <div>
          <span>WebカメラやVtubeStudioなどの（仮想）カメラ</span>
        </div>
      </Row>
      <Row>
        <div>
          <Link to="/sender/display">
            <button>画面</button>
          </Link>
        </div>
        <div>
          <span>モニター映像、ウィンドウ、ブラウザタブなど</span>
        </div>
      </Row>
    </fieldset>
  )
}

export default Home
