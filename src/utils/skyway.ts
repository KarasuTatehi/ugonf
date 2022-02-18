type LogLevel = 0 | 1 | 2 | 3

interface PeerOptions {
  key: string
  debug: LogLevel
}

const peerOptions: PeerOptions = {
  key: `${process.env.GATSBY_SKYWAY_API_KEY}`,
  debug: 3,
}

export { peerOptions }
