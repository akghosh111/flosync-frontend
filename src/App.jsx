import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Landing } from "./Pages/Landing"

import Navbar from "./components/Navbar"
import Dashboard from "./components/Dashboard"
import PeriodTracker from "./Pages/Tracker"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Landing } from "./Pages/Landing";
import {supabase} from './supabaseClient';
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (loading) return <div>Loading...</div>;
    return session ? children : <Navigate to="/login" />;
  };
  

  return (
    <>
      <Navbar/>
      <h1>Lunaflow</h1>
      <BrowserRouter>
      <Routes>
        <Route element={<Landing/>} path="/"/>
        <Route path="/login" element={<Login />} />
        <Route element={<Dashboard/>}  path="/dashboard" />
        <Route element={<PeriodTracker />} path="/period-tracker"/>
        
      </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
