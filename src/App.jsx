import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Landing } from "./Pages/Landing"

import Navbar from "./components/Navbar"
import Dashboard from "./components/Dashboard"
import PeriodTracker from "./Pages/Tracker"

function App() {
  

  return (
    <>
      <Navbar/>
      <h1>Lunaflow</h1>
      <BrowserRouter>
      <Routes>
        <Route element={<Landing/>} path="/"/>
        <Route element={<Dashboard/>}  path="/dashboard" />
        <Route element={<PeriodTracker />} path="/period-tracker"/>
        
      </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
