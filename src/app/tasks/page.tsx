'use client';

import { useState } from 'react';
import { FiCheckCircle, FiClock } from 'react-icons/fi';
import { Card } from '@/components/ui/Card';
import { Task } from '@/types/dashboard';

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Review computer updates',
    status: 'pending',
    dueDate: '2025-01-20',
    assignedTo: '1'
  },
  {
    id: '2',
    title: 'Check network connectivity',
    status: 'completed',
    dueDate: '2025-01-15',
    assignedTo: '1'
  },
  {
    id: '3',
    title: 'Update firmware on servers',
    status: 'pending',
    dueDate: '2025-01-25',
    assignedTo: '1'
  }
];

export default function TasksPage() {
  const [tasks] = useState<Task[]>(mockTasks);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          New Task
        </button>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <Card key={task.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {task.status === 'completed' ? (
                  <FiCheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <FiClock className="w-6 h-6 text-yellow-500" />
                )}
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-gray-500">
                    Due {new Date(task.dueDate!).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  task.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
