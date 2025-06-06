'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiGrid, FiUsers, FiSettings, FiBell, FiMessageSquare, FiCheckSquare } from 'react-icons/fi';
import { useAuth } from '@/hooks/useAuth';
import { Avatar } from './ui/Avatar';

interface NavItem {
  href: string;
  icon: typeof FiGrid;
  label: string;
}

const mainNavItems: NavItem[] = [
  { href: '/', icon: FiGrid, label: 'Dashboard' },
  { href: '/messages', icon: FiMessageSquare, label: 'Messages' },
  { href: '/tasks', icon: FiCheckSquare, label: 'My Tasks' },
  { href: '/computers', icon: FiUsers, label: 'Computers' },
];

const settingsNavItems: NavItem[] = [
  { href: '/settings', icon: FiSettings, label: 'Main Settings' },
  { href: '/notifications', icon: FiBell, label: 'Notifications' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const isActive = (path: string) => {
    return pathname === path ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-gray-900';
  };

  const NavLink = ({ item }: { item: NavItem }) => (
    <Link 
      href={item.href}
      className={`flex items-center space-x-3 px-3 py-2 rounded-md ${isActive(item.href)}`}
    >
      <item.icon className="w-5 h-5" />
      <span>{item.label}</span>
    </Link>
  );

  return (
    <aside className="w-64 min-h-screen bg-white border-r">
      {/* User Profile */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <Avatar src={user?.avatar} alt={user?.name || 'User'} />
          <div>
            <div className="font-medium text-sm">{user?.name || 'User'}</div>
            <div className="text-xs text-gray-500">{user?.email}</div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="p-4 space-y-1">
        {mainNavItems.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}

        {/* Settings Section */}
        <div className="pt-4 mt-4 border-t">
          <div className="px-3 mb-2 text-xs font-medium text-gray-500 uppercase">Settings</div>
          {settingsNavItems.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </div>
      </nav>
    </aside>
  );
}
