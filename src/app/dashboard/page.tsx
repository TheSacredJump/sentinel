// app/dashboard/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '~/hooks/useAuth';

export default function Dashboard() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user, logout, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch('http://localhost:3003/api/emails', {
          credentials: 'include'
        });
        const data = await response.json();
        setEmails(data.messages || []);
      } catch (error) {
        console.error('Failed to fetch emails:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchEmails();
    }
  }, [isAuthenticated]);

  if (authLoading || !isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Email Dashboard</h1>
            </div>
            <div className="flex items-center">
              {user?.email && (
                <span className="mr-4 text-gray-700">{user.email}</span>
              )}
              <button
                onClick={logout}
                className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {loading ? (
          <div>Loading emails...</div>
        ) : (
          <div className="bg-white shadow rounded-lg">
            <ul className="divide-y divide-gray-200">
              {emails.map((email) => (
                <li key={email.id} className="p-4">
                  <div className="text-sm font-medium text-gray-900">
                    {email.id}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}