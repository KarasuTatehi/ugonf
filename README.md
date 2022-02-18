# ugonf

**ugonf**（ユゴンフ）は、[WebRTC](https://webrtc.org/)を利用したP2P方式のカメラ映像共有アプリです。

市販のWebカメラはもちろん、[VTube Studio](https://store.steampowered.com/app/1325860/VTube_Studio/)、[Animaze](https://store.steampowered.com/app/1364390/Animaze_by_FaceRig/)、[OBS Studio](https://obsproject.com/)、[Streamlabs OBS](https://streamlabs.com/)などで提供されている仮想カメラにも対応しています。

## 使い方

### 映像送信側

1. 「[https://karasutatehi.github.io/ugonf/](https://karasutatehi.github.io/ugonf/)」にアクセスします
2. ブラウザがカメラの使用許諾を求めてくるので、承諾します
3. 一度ページを更新します
4. 「Video Input」で映像を共有するカメラを選択します
5. 「Go Stream」をクリックしてカメラ映像の送信を開始します
6. 「Peer ID」を[映像受信側](#映像受信側)に伝えてください
7. 映像を共有するカメラを変更したい場合は「Video Input」から選択し、「Go Stream」をクリックしてPeerを更新します

### 映像受信側

1. 「[https://karasutatehi.github.io/ugonf/send/?peerId=](https://karasutatehi.github.io/ugonf/send/?peerId=)」の末尾に、[映像送信側](#映像送信側)の「Peer ID」を追加してアクセスします
2. [映像送信側](#映像送信側)がカメラを変更した場合、ページを更新する必要があります
3. [OBS Studio](https://obsproject.com/)や[Streamlabs OBS](https://streamlabs.com/)のブラウザソースとして、配信ソフトウェアに直接取り込むことができます

## クレジット

- 開発者
  - [KarasuTatehi](https://github.com/KarasuTatehi) - [Discord](https://discord.com/invite/AQWkzRCF5W) / [Twitch](https://www.twitch.tv/karasutatehi) / [Twitter](https://twitter.com/KarasuTatehi) / [YouTube](https://www.youtube.com/channel/UCN5Hd3p1cKdvWmoifnVK9oA) / [公式HP](https://virtual-circle-aurora.github.io/talents/karasu-tatehi)
  - YØT from 81NO - [Twitter](https://twitter.com/SandR_YOT)
  - [AmenoAtsuta](https://github.com/AmenoAtsuta) - [Twitter](https://twitter.com/AmenoAtsuta) / [YouTube](https://www.youtube.com/channel/UCcNBKvsZBMPMJTwNaraELHg)
- 発注
  - 喫茶ユゴス - [Twitter](https://twitter.com/cafeyuggoth) / [YouTube](https://www.youtube.com/channel/UC778fxfe9aXazW0AXLyOIpg) / [公式HP](https://w.atwiki.jp/cafe-yuggoth/)
    - 宮古ミーゴ - [Twitter](https://twitter.com/Cutoluruhu_migo) / [YouTube](https://www.youtube.com/channel/UCCwedbOIXxubr7_d2-7bM3g)

## ライセンス

ソースコードは、[クリエイティブ・コモンズ 表示-継承 4.0 国際ライセンス](https://creativecommons.org/licenses/by-sa/4.0/deed.ja)の下で利用可能です。

[![CC BY-SA 4.0](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-sa/4.0/deed.ja)

[Creative Commons](https://creativecommons.org/)公式文書をご確認ください。
- 日本語 - [概要](https://creativecommons.org/licenses/by-sa/4.0/deed.ja) / [利用許諾条項](https://creativecommons.org/licenses/by-sa/4.0/legalcode.ja)
- English - [Deed](https://creativecommons.org/licenses/by-sa/4.0/deed) / [Legal code](https://creativecommons.org/licenses/by-sa/4.0/legalcode)
