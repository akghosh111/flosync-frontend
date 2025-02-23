import React, { useState, useEffect } from "react";
import { LogIn, LogOut, Menu, X } from "lucide-react";

import Login from "./Login";
import { supabase } from "../supabaseClient";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

 

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const { data: { session } } = await supabase.auth.getSession();
  //     setIsAuthenticated(!!session);
  //   };
  //   checkAuth();
  // }, []);
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });
  
    return () => subscription.unsubscribe();
  }, []);
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 w-full bg-rose-100 dark:bg-gray-900 backdrop-blur-lg z-50 border-b border-rose-300 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            
            <span className="text-3xl font-bold text-rose-700 dark:text-white logo">
              lunaflow
            </span>

            
            <div className="hidden md:flex items-center gap-6 text-rose-800 dark:text-gray-200">
              <a href="#home" className="hover:text-rose-500 transition-colors">Home</a>
              <a href="#features" className="hover:text-rose-500 transition-colors">Features</a>
              <a href="#community" className="hover:text-rose-500 transition-colors">Community</a>
              {isAuthenticated && (
                <a href="/dashboard" className="hover:text-rose-500 transition-colors">Dashboard</a>
              )}

              
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-all"
                >
                  Logout <LogOut size={20} />
                </button>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-all"
                >
                  Login <LogIn size={20} />
                </button>
              )}
            </div>

            
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-rose-800 dark:text-white rounded-lg transition-all"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 bg-rose-50 dark:bg-gray-800 rounded-lg shadow-md p-4">
              <a onClick={handleLinkClick} href="#home" className="block px-4 py-2 rounded-lg hover:bg-rose-200 transition-all">Home</a>
              <a onClick={handleLinkClick} href="#features" className="block px-4 py-2 rounded-lg hover:bg-rose-200 transition-all">Features</a>
              <a onClick={handleLinkClick} href="#community" className="block px-4 py-2 rounded-lg hover:bg-rose-200 transition-all">Community</a>
              {isAuthenticated && (
                <a onClick={handleLinkClick} href="/dashboard" className="block px-4 py-2 rounded-lg hover:bg-rose-200 transition-all">Dashboard</a>
              )}

            
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="w-full mt-2 px-4 py-2 flex items-center gap-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all"
                >
                  Logout <LogOut size={20} />
                </button>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="w-full mt-2 px-4 py-2 flex items-center gap-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-all"
                >
                  Login <LogIn size={20} />
                </button>
              )}
            </div>
          )}
        </div>
      </nav>

      
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 relative max-w-md w-full shadow-xl">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
            >
              <X size={24} />
            </button>
            <Login onSuccess={() => {
              setIsAuthenticated(true);
              setShowLogin(false);
            }} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
