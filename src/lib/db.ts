import { promises as fs } from 'fs';
import path from 'path';
import { Computer, ComputerGroup } from '../types';

const dbPath = path.join(process.cwd(), 'src/data/db.json');

interface DB {
  computers: Computer[];
  groups: ComputerGroup[];
}

/**
 * Helper function to read the database
 */
async function readDb(): Promise<DB> {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, create a new one
    const defaultDb: DB = { computers: [], groups: [] };
    await fs.writeFile(dbPath, JSON.stringify(defaultDb, null, 2));
    return defaultDb;
  }
}

/**
 * Helper function to write to the database
 */
async function writeDb(db: DB): Promise<void> {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
}

/**
 * Synchronize computers between main list and groups
 */
async function syncComputersWithGroups(db: DB): Promise<DB> {
  // Atualiza os grupos com os computadores correspondentes
  const updatedGroups = db.groups.map(group => ({
    ...group,
    computers: db.computers.filter(c => c.groupId === group.id)
  }));

  return {
    ...db,
    groups: updatedGroups
  };
}

// Computer management functions
export const dbOperations = {
  /**
   * Get all computers from the database
   */
  async getComputers(): Promise<Computer[]> {
    const db = await readDb();
    return db.computers;
  },

  /**
   * Add a new computer to the database
   */
  async addComputer(computer: Computer): Promise<Computer> {
    const db = await readDb();
    db.computers.push(computer);
    await writeDb(await syncComputersWithGroups(db));
    return computer;
  },

  /**
   * Update an existing computer in the database
   */
  async updateComputer(computer: Computer): Promise<Computer> {
    const db = await readDb();
    const index = db.computers.findIndex(c => c.id === computer.id);
    if (index !== -1) {
      db.computers[index] = computer;
      await writeDb(await syncComputersWithGroups(db));
    }
    return computer;
  },

  /**
   * Delete a computer from the database
   */
  async deleteComputer(id: string): Promise<void> {
    const db = await readDb();
    db.computers = db.computers.filter(c => c.id !== id);
    await writeDb(await syncComputersWithGroups(db));
  },

  // Group management functions
  /**
   * Get all groups from the database
   */
  async getGroups(): Promise<ComputerGroup[]> {
    const db = await readDb();
    return db.groups;
  },

  /**
   * Add a new group to the database
   */
  async addGroup(group: ComputerGroup): Promise<ComputerGroup> {
    const db = await readDb();
    // Certifica que o grupo começa com uma lista vazia de computadores
    const newGroup = { ...group, computers: [] };
    db.groups.push(newGroup);
    await writeDb(db);
    return newGroup;
  },

  /**
   * Update an existing group in the database
   */
  async updateGroup(group: ComputerGroup): Promise<ComputerGroup> {
    const db = await readDb();
    const index = db.groups.findIndex(g => g.id === group.id);
    if (index !== -1) {
      db.groups[index] = group;
      await writeDb(await syncComputersWithGroups(db));
    }
    return group;
  },

  /**
   * Delete a group from the database
   */
  async deleteGroup(id: string): Promise<void> {
    const db = await readDb();
    db.groups = db.groups.filter(g => g.id !== id);
    // Remove o groupId dos computadores que pertenciam a este grupo
    db.computers = db.computers.map(c => 
      c.groupId === id ? { ...c, groupId: undefined } : c
    );
    await writeDb(db);
  },

  /**
   * Add a computer to a group
   */
  async addComputerToGroup(computerId: string, groupId: string): Promise<void> {
    const db = await readDb();
    const computerIndex = db.computers.findIndex(c => c.id === computerId);
    if (computerIndex === -1) throw new Error('Computer not found');
    
    const groupExists = db.groups.some(g => g.id === groupId);
    if (!groupExists) throw new Error('Group not found');
    
    db.computers[computerIndex].groupId = groupId;
    await writeDb(await syncComputersWithGroups(db));
  },

  /**
   * Remove a computer from its group
   */
  async removeComputerFromGroup(computerId: string): Promise<void> {
    const db = await readDb();
    const computerIndex = db.computers.findIndex(c => c.id === computerId);
    if (computerIndex === -1) throw new Error('Computer not found');
    
    db.computers[computerIndex].groupId = undefined;
    await writeDb(await syncComputersWithGroups(db));
  }
};
