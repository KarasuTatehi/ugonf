import Loadable from "@loadable/component"

const App = Loadable(() => import("../components/loadable/receive"))

export default App
