'use client';

import { FiUsers, FiCheckSquare, FiBell, FiAlertCircle } from 'react-icons/fi';
import { DashboardStats as DashboardStatsType } from '@/types/dashboard';
import { Card } from './ui/Card';

interface DashboardStatsProps {
  stats: DashboardStatsType;
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const items = [
    {
      icon: FiUsers,
      value: stats.totalComputers,
      label: 'Computers',
      variant: 'default'
    },
    {
      icon: FiCheckSquare,
      value: stats.onlineComputers,
      label: 'Online',
      variant: 'primary'
    },
    {
      icon: FiBell,
      value: stats.notifications,
      label: 'Notifications',
      variant: 'default'
    },
    {
      icon: FiAlertCircle,
      value: stats.issues,
      label: 'Issues',
      variant: 'default'
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      {items.map((item, index) => (
        <Card key={index} variant={item.variant as 'default' | 'primary'}>
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${
              item.variant === 'primary' ? 'bg-blue-500' : 'bg-gray-100'
            }`}>
              <item.icon className={`w-6 h-6 ${
                item.variant === 'primary' ? 'text-white' : 'text-gray-600'
              }`} />
            </div>
            <div className="ml-4">
              <div className="text-3xl font-semibold">{item.value}</div>
              <div className={`text-sm ${
                item.variant === 'primary' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {item.label}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
