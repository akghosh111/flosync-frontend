import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { Landing } from "./Pages/Landing";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard"
import PeriodTracker from "./Pages/Tracker"
import { useState, useEffect } from "react";
import {supabase} from './supabaseClient';
import Login from "./components/Login";


function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });


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
        <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard session={session} />
              </ProtectedRoute>
            }/>
        <Route element={<PeriodTracker />} path="/period-tracker"/>
        
      </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
