import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!email.trim()) {
      setMessage("Please enter a valid email.");
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Check your email for the login link!");
      setTimeout(() => navigate("/dashboard"), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-6 pt-24 bg-rose-50 dark:bg-gray-900 rounded-lg shadow-lg max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-rose-700 dark:text-white">Welcome to Lunaflow</h1>
      <p className="text-rose-600 dark:text-gray-300 text-center">Sign in with your email to continue</p>
      
      <div className="w-full flex flex-col gap-4">
        <div className="relative w-full">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 pl-10 border border-rose-300 dark:border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-800 dark:text-white"
          />
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-400 dark:text-gray-400" size={20} />
        </div>
      
        <button
          onClick={handleSignIn}
          className="w-full bg-rose-500 text-white px-4 py-3 rounded-lg hover:bg-rose-600 transition-all"
        >
          Send Magic Link
        </button>
      </div>
      
      {message && <p className="mt-4 text-rose-700 dark:text-green-400 text-center">{message}</p>}
    </div>
  );
}