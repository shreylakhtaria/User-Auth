'use client';

import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SIGNUP = gql`
  mutation Signup($data: CreateUserInput!) {
    signup(data: $data) {
      _id
      username
      email
    }
  }
`;

interface SignupForm {
  username: string;
  email: string;
  password: string;
}

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState<SignupForm>({ username: '', email: '', password: '' });
  const [error, setError] = useState<string>('');
  const [signup, { loading }] = useMutation(SIGNUP);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (form.username.length < 3) {
      setError('Username must be at least 3 characters long');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(form.username)) {
      setError('Username can only contain letters, numbers, and underscores');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    try {
      const { data } = await signup({
        variables: {
          data: {
            username: form.username,
            email: form.email,
            password: form.password
          }
        }
      });
      
      if (data?.signup) {
        router.push('/login');
      }
    } catch (err: any ) {
      console.error('Signup error:', err);
      // Extract the error message from the GraphQL error
      const errorMessage = err.graphQLErrors?.[0]?.message || 
                          err.networkError?.result?.errors?.[0]?.message ||
                          err.message ||
                          'An error occurred during signup';
      setError(errorMessage);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-6 md:p-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="backdrop-blur-sm bg-white/70 p-8 md:p-12 rounded-2xl shadow-xl border border-white/30 transition-all duration-500 hover:shadow-2xl w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-800 mb-4 text-center">Create your account</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-center bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
              placeholder="Enter username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
              placeholder="Enter email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
              placeholder="Enter password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
