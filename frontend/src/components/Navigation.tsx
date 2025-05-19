'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    const handleStorage = () => setToken(localStorage.getItem('token'));
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-indigo-600 hover:text-indigo-800 transition duration-300">
                Auth App
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {token ? (
              <>
                <Link
                  href="/profile"
                  className="bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-100 transition duration-300 px-4 py-2 rounded-md text-sm font-medium shadow-sm"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="ml-4 bg-white text-red-500 border border-red-500 hover:bg-red-50 transition duration-300 px-4 py-2 rounded-md text-sm font-medium shadow-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-100 transition duration-300 px-4 py-2 rounded-md text-sm font-medium shadow-sm"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="ml-4 bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300 px-4 py-2 rounded-md text-sm font-medium shadow-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}