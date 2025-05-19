'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-6 md:p-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="z-10 max-w-5xl w-full items-center justify-center text-center">
        <div className="backdrop-blur-sm bg-white/70 p-8 md:p-12 rounded-2xl shadow-xl border border-white/30 transition-all duration-500 hover:shadow-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
            Welcome to User Auth App
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 text-gray-700 font-light">
            {isAuthenticated 
              ? "You're logged in! Check out your profile and manage your account settings."
              : "Please sign in to access your personalized dashboard and account features."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link
                href="/profile"
                className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-white font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                View Profile
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-white font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Login
                  
                </Link>
                <Link
                  href="/signup"
                  className="rounded-lg bg-white px-8 py-4 text-indigo-600 border border-indigo-600 font-medium hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
        
        <div className="mt-8 text-gray-500">
          <p className="mt-2 text-sm">© {new Date().getFullYear()} User Auth App</p>
        </div>
      </div>
    </main>
  );
}
