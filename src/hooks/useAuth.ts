'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import type { User } from '@/types/dashboard';

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!storedToken || !storedUser) {
      router.push('/login');
    } else {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    router.push('/login');
  };

  return { token, user, logout };
}
