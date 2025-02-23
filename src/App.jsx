
import { Landing } from "./Pages/Landing";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import PeriodTracker from "./Pages/Tracker";
import { useState, useEffect } from "react";
import {supabase} from './supabaseClient';
import Login from "./components/Login";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Chat } from "./components/Chat";
import MoodLogger from "./components/MoodLogger";
import Chatbot from "./components/Chatbot";



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
      <BrowserRouter>
      <Navbar/>
      <h1>Lunaflow</h1>
      <Routes>
        <Route element={<Landing/>} path="/"/>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard session={session} />
              </ProtectedRoute>
        }/>
        
        <Route
            path="/period-tracker"
            element={
              <ProtectedRoute>
                <PeriodTracker />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/chat" element={<Chat/>}/> */}
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/mood-log" 
            element={
              <ProtectedRoute>
              <MoodLogger supabase={supabase} />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/chatbot" 
            element={
              <ProtectedRoute>
              <Chatbot supabase={supabase} />
              </ProtectedRoute>
            }
          />
            
        
      </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
