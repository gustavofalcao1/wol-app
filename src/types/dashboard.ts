export interface DashboardStats {
  totalComputers: number;
  onlineComputers: number;
  notifications: number;
  issues: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
}

export interface Computer {
  id: string;
  name: string;
  macAddress: string;
  ipAddress: string;
  status: 'online' | 'offline';
  lastSeen: string;
  group?: string;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  computers: string[]; // Array of computer IDs
}

export interface Task {
  id: string;
  title: string;
  status: 'pending' | 'completed';
  dueDate?: string;
  assignedTo: string; // User ID
}

export interface Message {
  id: string;
  content: string;
  sender: string; // User ID
  receiver: string; // User ID
  timestamp: string;
  read: boolean;
}

export interface Notification {
  id: string;
  type: 'alert' | 'info' | 'success' | 'error';
  message: string;
  timestamp: string;
  read: boolean;
  relatedId?: string; // ID of related entity (computer, task, etc)
}
