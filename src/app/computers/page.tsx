'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ComputerList from '@/components/ComputerList';

export default function ComputersPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Computers</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          + Add Computer
        </button>
      </div>

      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-4 border-b">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search computers..."
              className="flex-1 px-4 py-2 border rounded-md"
            />
            <select className="px-4 py-2 border rounded-md">
              <option value="">All Groups</option>
            </select>
          </div>
        </div>

        <ComputerList />
      </div>
    </div>
  );
}
