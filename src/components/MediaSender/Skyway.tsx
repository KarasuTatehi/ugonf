import styled from "@emotion/styled"
import { useCallback, useContext, useEffect } from "react"
import Peer from "skyway-js"
import { answerOption } from "../../config/skyway"
import { MediaSenderContext } from "../../pages/MediaSender"
import { Row } from "../../styles/layout"

const Skyway: React.VFC = () => {
  const {
    state: { key, localStream, peer, peerId },
    dispatch,
  } = useContext(MediaSenderContext)

  const changeKey: React.ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    dispatch({ type: "setKey", payload: value })
  }

  const changePeerId: React.ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    dispatch({ type: "setPeerId", payload: value })
  }

  const clickPeerSwitch = () => {
    if (peer) {
      peer.destroy()
      dispatch({ type: "setPeer", payload: null })
    } else {
      dispatch({ type: "setPeer", payload: new Peer(peerId, { key: key, debug: 3 }) })

      switch (process.env.NODE_ENV) {
        case "development":
          navigator.clipboard.writeText(`${location.protocol}//${location.host}/receiver/${key}/${peerId}`)
          break

        case "production":
          navigator.clipboard.writeText(`${location.protocol}//${location.host}/ugonf/receiver/${key}/${peerId}`)
          break
      }

      alert(`
        ブラウザソース用リンクをクリップボードにコピーしました
        使用している配信ツールにブラウザソースとして貼り付けてください
        「OK」を押すと映像共有を開始します
      `)
    }
  }

  useEffect(() => {
    if (!peer || !localStream) return
    peer.on("open", (peerId) => {
      dispatch({ type: "setPeerId", payload: peerId })
    })
    peer.on("call", (call) => {
      call.answer(localStream, answerOption)
    })
  }, [dispatch, localStream, peer])

  return (
    <fieldset>
      <legend>SkyWay</legend>
      <Row>
        <div>
          <input
            disabled={peer ? true : false}
            id="js-Skyway__Key"
            onChange={changeKey}
            placeholder="APIキー"
            type="text"
          />
        </div>
        <div>
          <span>映像受信側から提供されたSkyWayのAPIキーを入力してください</span>
        </div>
      </Row>
      <Row>
        <div>
          <input
            disabled={peer ? true : false}
            id="js-Skyway__PeerId"
            onChange={changePeerId}
            placeholder="ニックネーム"
            type="text"
          />
        </div>
        <div>
          <span>ニックネームは毎回同じものにしてください</span>
        </div>
      </Row>
      <Row>
        <div>
          <button onClick={clickPeerSwitch}>{`${peer ? "停止" : "送信"}`}</button>
        </div>
        <div>
          <span>クリック時にブラウザソース用リンクをクリップボードにコピーします</span>
        </div>
      </Row>
    </fieldset>
  )
}

export default Skyway
