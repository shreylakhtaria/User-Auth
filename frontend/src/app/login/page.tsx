'use client';

import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [error, setError] = useState<string>('');
  const [login, { loading }] = useMutation(LOGIN);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!form.email || !form.password) {
      setError('Please fill in all fields');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    try {
      const { data } = await login({
        variables: {
          email: form.email,
          password: form.password
        }
      });
      
      if (data?.login) {
        localStorage.setItem('token', data.login);
        router.push('/profile');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      const errorMessage = err.graphQLErrors?.[0]?.message || 
                          err.networkError?.result?.errors?.[0]?.message ||
                          err.message ||
                          'Invalid email or password';
      setError(errorMessage);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-6 md:p-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="backdrop-blur-sm bg-white/70 p-8 md:p-12 rounded-2xl shadow-xl border border-white/30 transition-all duration-500 hover:shadow-2xl w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-800 mb-4 text-center">Sign in to your account</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                {error && (
                    <div className="text-red-500 text-center bg-red-50 p-3 rounded-md">
                        {error}
                    </div>
                )}
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
                        onClick={() => router.push('/signup')}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                    >
                        Sign Up
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </div>
            </form>
        </div>
    </main>
  );
}