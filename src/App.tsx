import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Receiver from "./pages/Receiver"
import Sender from "./pages/Sender"

const App: React.VFC = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route element={<Home />} index />
        <Route element={<Receiver />} path="/receiver" />
        <Route element={<Receiver />} path="/receiver/:remotePeerId" />
        <Route element={<Sender />} path="/sender" />
      </Routes>
    </BrowserRouter>
  )
}

export default App
