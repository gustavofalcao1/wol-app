import { z } from 'zod';

export enum DeviceStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
  UNKNOWN = 'unknown'
}

export enum DeviceKind {
  WORKSTATION = 'workstation',
  SERVER = 'server',
  OTHER = 'other'
}

// Schema Zod para validação
export const deviceSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  macAddress: z.string().regex(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/),
  ipAddress: z.string().ip(),
  groupId: z.string().uuid().optional(),
  status: z.nativeEnum(DeviceStatus),
  lastSeen: z.string().datetime(),
  type: z.nativeEnum(DeviceKind),
  metadata: z.record(z.string(), z.any()).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

// Tipo inferido do schema
export type DeviceType = z.infer<typeof deviceSchema>;

// Tipo para criação de dispositivo (sem id e timestamps)
export type CreateDeviceInput = Omit<DeviceType, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'lastSeen'>;

// Tipo para atualização de dispositivo (todos os campos opcionais exceto id)
export type UpdateDeviceInput = Partial<Omit<DeviceType, 'id'>> & { id: string };

export interface DeviceFilters {
  search?: string;
  status?: DeviceStatus[];
  type?: DeviceKind[];
  groupId?: string;
  page?: number;
  limit?: number;
  sortBy?: keyof DeviceType;
  sortOrder?: 'asc' | 'desc';
}

export interface DeviceStats {
  total: number;
  online: number;
  offline: number;
  unknown: number;
  byType: Record<DeviceKind, number>;
  byGroup: Array<{
    groupId: string;
    groupName: string;
    count: number;
  }>;
  lastUpdated: string;
}

export interface WakeOnLanResult {
  deviceId: string;
  success: boolean;
  timestamp: string;
  error?: string;
}
