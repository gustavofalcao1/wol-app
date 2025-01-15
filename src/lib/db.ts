import { promises as fs } from 'fs';
import path from 'path';
import { Computer, ComputerGroup } from '../types';

const dbPath = path.join(process.cwd(), 'src/data/db.json');

interface DB {
  computers: Computer[];
  groups: ComputerGroup[];
}

// Função auxiliar para ler o banco de dados
async function readDb(): Promise<DB> {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Se o arquivo não existir, cria um novo
    const defaultDb: DB = { computers: [], groups: [] };
    await fs.writeFile(dbPath, JSON.stringify(defaultDb, null, 2));
    return defaultDb;
  }
}

// Função auxiliar para salvar no banco de dados
async function writeDb(db: DB): Promise<void> {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
}

// Sincroniza os computadores entre a lista principal e os grupos
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

// Funções para gerenciar computadores
export async function getComputers(): Promise<Computer[]> {
  const db = await readDb();
  return db.computers;
}

export async function addComputer(computer: Computer): Promise<Computer> {
  const db = await readDb();
  db.computers.push(computer);
  await writeDb(await syncComputersWithGroups(db));
  return computer;
}

export async function updateComputer(computer: Computer): Promise<Computer> {
  const db = await readDb();
  const index = db.computers.findIndex(c => c.id === computer.id);
  if (index === -1) throw new Error('Computer not found');
  
  db.computers[index] = computer;
  await writeDb(await syncComputersWithGroups(db));
  return computer;
}

export async function deleteComputer(id: string): Promise<void> {
  const db = await readDb();
  db.computers = db.computers.filter(c => c.id !== id);
  await writeDb(await syncComputersWithGroups(db));
}

// Funções para gerenciar grupos
export async function getGroups(): Promise<ComputerGroup[]> {
  const db = await readDb();
  return db.groups;
}

export async function addGroup(group: ComputerGroup): Promise<ComputerGroup> {
  const db = await readDb();
  // Certifica que o grupo começa com uma lista vazia de computadores
  const newGroup = { ...group, computers: [] };
  db.groups.push(newGroup);
  await writeDb(db);
  return newGroup;
}

export async function updateGroup(group: ComputerGroup): Promise<ComputerGroup> {
  const db = await readDb();
  const index = db.groups.findIndex(g => g.id === group.id);
  if (index === -1) throw new Error('Group not found');
  
  db.groups[index] = group;
  await writeDb(await syncComputersWithGroups(db));
  return group;
}

export async function deleteGroup(id: string): Promise<void> {
  const db = await readDb();
  db.groups = db.groups.filter(g => g.id !== id);
  // Remove o groupId dos computadores que pertenciam a este grupo
  db.computers = db.computers.map(c => 
    c.groupId === id ? { ...c, groupId: undefined } : c
  );
  await writeDb(db);
}

// Função para adicionar um computador a um grupo
export async function addComputerToGroup(computerId: string, groupId: string): Promise<void> {
  const db = await readDb();
  const computerIndex = db.computers.findIndex(c => c.id === computerId);
  if (computerIndex === -1) throw new Error('Computer not found');
  
  const groupExists = db.groups.some(g => g.id === groupId);
  if (!groupExists) throw new Error('Group not found');
  
  db.computers[computerIndex].groupId = groupId;
  await writeDb(await syncComputersWithGroups(db));
}

// Função para remover um computador de um grupo
export async function removeComputerFromGroup(computerId: string): Promise<void> {
  const db = await readDb();
  const computerIndex = db.computers.findIndex(c => c.id === computerId);
  if (computerIndex === -1) throw new Error('Computer not found');
  
  db.computers[computerIndex].groupId = undefined;
  await writeDb(await syncComputersWithGroups(db));
}
