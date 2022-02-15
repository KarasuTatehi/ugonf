import Peer from "skyway-js";

const peer = new Peer({
  key: `${process.env.GATSBY_SKYWAY_API_KEY}`,
  debug: 3,
});

export { peer };
