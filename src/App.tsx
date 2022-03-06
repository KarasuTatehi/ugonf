import React, { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Helmet } from "react-helmet"
import Home from "./pages/Home"
import Receiver from "./pages/Receiver"
import MediaSender from "./pages/MediaSender"
import DisplaySender from "./pages/DisplaySender"

const App: React.VFC = () => {
  const [baseName, setBaseName] = useState<string>("")
  useEffect(() => {
    switch (process.env.NODE_ENV) {
      case "development":
        setBaseName("")
        break

      case "production":
        setBaseName(process.env.PUBLIC_URL)
        break
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>{`${process.env.REACT_APP_PACKAGE_NAME} ${process.env.REACT_APP_PACKAGE_VERSION}`}</title>
      </Helmet>
      <BrowserRouter basename={baseName}>
        <Routes>
          <Route element={<Home />} index />
          <Route element={<Receiver />} path="/receiver" />
          <Route element={<Receiver />} path="/receiver/:remotePeerId" />
          <Route element={<MediaSender />} path="/sender/media" />
          <Route element={<DisplaySender />} path="/sender/display" />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
