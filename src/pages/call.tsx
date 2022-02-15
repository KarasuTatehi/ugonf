import Loadable from "@loadable/component"

const App = Loadable(() => import("../components/loadable-call"))

export default App
