import { Computer, ComputerGroup } from '@/types/db';

interface DB {
  computers: Computer[];
  groups: ComputerGroup[];
}

/**
 * Initial database state
 */
export const defaultDb: DB = {
  computers: [
    {
      id: '1',
      name: 'Desktop Principal',
      mac: '00:11:22:33:44:55',
      ip: '192.168.1.100',
      description: 'PC da sala principal',
      groupId: '1'
    },
    {
      id: '2',
      name: 'Notebook Desenvolvimento',
      mac: 'AA:BB:CC:DD:EE:FF',
      ip: '192.168.1.101',
      description: 'Notebook para desenvolvimento',
      groupId: '1'
    }
  ],
  groups: [
    {
      id: '1',
      name: 'Desenvolvimento',
      description: 'Computadores de desenvolvimento',
      computerIds: ['1', '2']
    },
    {
      id: '2',
      name: 'Servidores',
      description: 'Servidores de produção',
      computerIds: []
    }
  ]
};

// Database instance
let db: DB = { ...defaultDb };

/**
 * Reset database to default state
 */
export function resetDb(): void {
  db = { ...defaultDb };
}

/**
 * Get all computers
 */
export async function getComputers(): Promise<Computer[]> {
  // Simulate random status
  return [...db.computers].map(c => ({
    ...c,
    status: Math.random() > 0.5 ? 'online' : 'offline'
  }));
}

/**
 * Get all groups
 */
export async function getGroups(): Promise<ComputerGroup[]> {
  return [...db.groups];
}

/**
 * Add a new computer
 */
export async function addComputer(computer: Computer): Promise<Computer> {
  db.computers.push({ ...computer });
  return computer;
}

/**
 * Update an existing computer
 */
export async function updateComputer(computer: Computer): Promise<Computer> {
  const index = db.computers.findIndex(c => c.id === computer.id);
  if (index !== -1) {
    db.computers[index] = { ...computer };
  }
  return computer;
}

/**
 * Delete a computer
 */
export async function deleteComputer(id: string): Promise<void> {
  db.computers = db.computers.filter(c => c.id !== id);
  // Remove from groups
  db.groups.forEach(group => {
    group.computerIds = group.computerIds.filter(cid => cid !== id);
  });
}

/**
 * Add a new group
 */
export async function addGroup(group: ComputerGroup): Promise<ComputerGroup> {
  db.groups.push({ ...group });
  return group;
}

/**
 * Update an existing group
 */
export async function updateGroup(group: ComputerGroup): Promise<ComputerGroup> {
  const index = db.groups.findIndex(g => g.id === group.id);
  if (index !== -1) {
    db.groups[index] = { ...group };
  }
  return group;
}

/**
 * Delete a group
 */
export async function deleteGroup(id: string): Promise<void> {
  db.groups = db.groups.filter(g => g.id !== id);
  // Remove group reference from computers
  db.computers = db.computers.map(c => 
    c.groupId === id ? { ...c, groupId: undefined } : c
  );
}

/**
 * Add computer to group
 */
export async function addComputerToGroup(computerId: string, groupId: string): Promise<void> {
  const computer = db.computers.find(c => c.id === computerId);
  const group = db.groups.find(g => g.id === groupId);

  if (computer && group) {
    computer.groupId = groupId;
    if (!group.computerIds.includes(computerId)) {
      group.computerIds.push(computerId);
    }
  }
}

/**
 * Remove computer from group
 */
export async function removeComputerFromGroup(computerId: string): Promise<void> {
  const computer = db.computers.find(c => c.id === computerId);
  if (computer?.groupId) {
    const group = db.groups.find(g => g.id === computer.groupId);
    if (group) {
      group.computerIds = group.computerIds.filter(id => id !== computerId);
    }
    computer.groupId = undefined;
  }
}
