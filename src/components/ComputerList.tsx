'use client';

import { Computer } from '@/types/dashboard';
import { useState, useEffect } from 'react';

interface ComputerListProps {
  searchTerm?: string;
  groupId?: string;
}

export default function ComputerList({ searchTerm, groupId }: ComputerListProps) {
  const [computers, setComputers] = useState<Computer[]>([]);
  const [selectedComputers, setSelectedComputers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchComputers();
  }, [searchTerm, groupId]);

  const fetchComputers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (groupId) params.append('groupId', groupId);

      const response = await fetch(`/api/computers?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch computers');
      
      const data = await response.json();
      setComputers(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedComputers(computers.map(c => c.id));
    } else {
      setSelectedComputers([]);
    }
  };

  const handleSelectComputer = (id: string) => {
    setSelectedComputers(prev => {
      if (prev.includes(id)) {
        return prev.filter(cid => cid !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleWakeUp = async (id: string) => {
    try {
      const response = await fetch(`/api/computers/${id}/wake`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to wake up computer');
      }
      // Atualiza a lista após acordar o computador
      fetchComputers();
    } catch (error) {
      console.error('Failed to wake up computer:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">{error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedComputers.length === computers.length}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Name ↑
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              IP
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              MAC
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Group
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Status
            </th>
            <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {computers.map((computer) => (
            <tr key={computer.id}>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                <input
                  type="checkbox"
                  checked={selectedComputers.includes(computer.id)}
                  onChange={() => handleSelectComputer(computer.id)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                {computer.name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                {computer.ip}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                {computer.mac}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                {computer.groupId && (
                  <span className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800">
                    Desenvolvimento
                  </span>
                )}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                  computer.status === 'online' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {computer.status}
                </span>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-right space-x-2">
                <button
                  onClick={() => handleWakeUp(computer.id)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700"
                  disabled={computer.status === 'online'}
                >
                  Wake Up
                </button>
                <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700">
                  Edit
                </button>
                <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
