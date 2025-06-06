import { z } from 'zod';

// Schema Zod para validação
export const groupSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  devices: z.array(z.string().uuid()),
  metadata: z.record(z.string(), z.any()).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  createdBy: z.string().uuid(),
  parent: z.string().uuid().optional(),
});

// Tipo inferido do schema
export type GroupType = z.infer<typeof groupSchema>;

// Tipo para criação de grupo (sem id e timestamps)
export type CreateGroupInput = Omit<GroupType, 'id' | 'createdAt' | 'updatedAt'>;

// Tipo para atualização de grupo (todos os campos opcionais exceto id)
export type UpdateGroupInput = Partial<Omit<GroupType, 'id'>> & { id: string };

export interface GroupFilters {
  search?: string;
  hasDevices?: boolean;
  parent?: string;
  createdBy?: string;
  page?: number;
  limit?: number;
  sortBy?: keyof GroupType;
  sortOrder?: 'asc' | 'desc';
}

export interface GroupStats {
  total: number;
  totalDevices: number;
  averageDevicesPerGroup: number;
  byParent: Array<{
    parentId: string | null;
    parentName: string | null;
    count: number;
  }>;
  byCreator: Array<{
    userId: string;
    userName: string;
    count: number;
  }>;
  lastUpdated: string;
}

export interface GroupHierarchy extends Omit<GroupType, 'parent'> {
  children: GroupHierarchy[];
  level: number;
  path: string[];
}
