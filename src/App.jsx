import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Landing } from "./Pages/Landing"

import Navbar from "./components/Navbar"

function App() {
  

  return (
    <>
      <Navbar/>
      <h1>Lunaflow</h1>
      <BrowserRouter>
      <Routes>
        <Route element={<Landing/>} path="/"/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
