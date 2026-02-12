'use client';

import { useState } from 'react';
import { FiMessageCircle } from 'react-icons/fi';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Message, User } from '@/types/dashboard';

const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Server maintenance scheduled for tonight',
    sender: {
      id: '2',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin'
    },
    receiver: '1',
    timestamp: '2025-01-15T10:00:00Z',
    read: false
  },
  {
    id: '2',
    content: 'New computer added to network',
    sender: {
      id: '3',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user'
    },
    receiver: '1',
    timestamp: '2025-01-15T09:30:00Z',
    read: true
  }
];

export default function MessagesPage() {
  const [messages] = useState(mockMessages);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          New Message
        </button>
      </div>

      <div className="grid gap-4">
        {messages.map((message) => (
          <Card key={message.id} className={!message.read ? 'bg-blue-50' : undefined}>
            <div className="flex items-start space-x-4">
              <Avatar src={message.sender.avatar} alt={message.sender.name} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    {message.sender.name}
                  </p>
                  <span className="text-xs text-gray-500">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {message.content}
                </p>
              </div>
              {!message.read && (
                <span className="inline-flex items-center justify-center w-2 h-2 bg-blue-600 rounded-full" />
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
