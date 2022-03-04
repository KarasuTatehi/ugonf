import React, { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Helmet } from "react-helmet"
import Home from "./pages/Home"
import Receiver from "./pages/Receiver"
import Sender from "./pages/Sender"

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
          <Route element={<Sender />} path="/sender" />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
