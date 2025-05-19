'use client';

import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
 

const ME = gql`
  query Me($token: String!) {
    me(token: $token) {
      _id
      username
      email
    }
  }
`;

export default function Profile() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (!t) {
      router.push('/login');
    } else {
      setToken(t);
    }
  }, [router]);

  const { data, loading, error } = useQuery(ME, {
    variables: { token },
    skip: !token,
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-6 md:p-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="backdrop-blur-sm bg-white/70 p-8 md:p-12 rounded-2xl shadow-xl border border-white/30 transition-all duration-500 hover:shadow-2xl w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-800 mb-4 text-center">Profile Information</h2>
            <dl className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                    <dt className="text-sm font-medium text-gray-700">Username</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{data?.me?.username}</dd>
                </div>
                <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                    <dt className="text-sm font-medium text-gray-700">Email</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{data?.me?.email}</dd>
                </div>
            </dl>
        </div>
    </main>
  );
}