import Loadable from "@loadable/component"

const App = Loadable(() => import("../components/loadable/send"))

export default App
