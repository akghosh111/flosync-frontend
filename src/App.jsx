import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Landing } from "./Pages/Landing"

import Navbar from "./components/Navbar"
import Dashboard from "./components/Dashboard"

function App() {
  

  return (
    <>
      <Navbar/>
      <h1>Lunaflow</h1>
      <BrowserRouter>
      <Routes>
        <Route element={<Landing/>} path="/"/>
        <Route element={<Dashboard/>}  path="/dashboard" />
      </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
