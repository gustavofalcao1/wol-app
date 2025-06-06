'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Computer, ComputerGroup, WakeOnLanStatus } from '../types';
import AddComputerForm from '../components/AddComputerForm';
import AddGroupForm from '../components/AddGroupForm';
import ComputersTable from '../components/ComputersTable';
import GroupsTable from '../components/GroupsTable';
import StatusMessage from '../components/StatusMessage';

type Tab = 'computers' | 'groups';

export default function Home() {
  const { token, logout } = useAuth();
  const router = useRouter();
  const [computers, setComputers] = useState<Computer[]>([]);
  const [groups, setGroups] = useState<ComputerGroup[]>([]);
  const [status, setStatus] = useState<WakeOnLanStatus | null>(null);
  const [showAddComputer, setShowAddComputer] = useState(false);
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('computers');

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    fetchData();
  }, [token, router]);

  // Função para buscar dados
  const fetchData = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      const [computersResponse, groupsResponse] = await Promise.all([
        fetch('/api/computers', { headers }),
        fetch('/api/groups', { headers })
      ]);

      if (!computersResponse.ok || !groupsResponse.ok) {
        if (computersResponse.status === 401 || groupsResponse.status === 401) {
          logout();
          return;
        }
        throw new Error('Failed to fetch data');
      }

      const computersData = await computersResponse.json();
      const groupsData = await groupsResponse.json();

      setComputers(computersData);
      setGroups(groupsData);
      setError(null);
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      setIsLoading(false);
    }
  };

  // Snapshot para atualização automática
  useEffect(() => {
    const interval = setInterval(fetchData, 5000); // Atualiza a cada 5 segundos
    return () => clearInterval(interval);
  }, [token]);

  // Efeito para limpar mensagens de status após 5 segundos
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const wakeComputer = async (mac: string, ip?: string) => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      const response = await fetch('/api/wake', {
        method: 'POST',
        headers,
        body: JSON.stringify({ mac, ip }),
      });
      const result = await response.json();
      setStatus(result);
    } catch (error: any) {
      setStatus({
        success: false,
        message: error.message,
        target: mac,
      });
    }
  };

  const addComputerToGroup = async (computerId: string, groupId: string) => {
    let group: ComputerGroup | undefined;
    try {
      group = groups.find(g => g.id === groupId);
      if (!group) throw new Error('Group not found');

      const updatedGroup = {
        ...group,
        computerIds: [...group.computerIds, computerId]
      };

      const headers = {
        'Authorization': `Bearer ${token}`
      };

      const response = await fetch('/api/groups', {
        method: 'PUT',
        headers,
        body: JSON.stringify(updatedGroup),
      });

      if (!response.ok) throw new Error('Failed to update group');

      setGroups(groups.map(g => g.id === groupId ? updatedGroup : g));
      setComputers(computers.map(c => c.id === computerId ? { ...c, groupId } : c));

      setStatus({
        success: true,
        message: `Added computer to ${group.name}`,
        target: group.name,
      });
    } catch (error: any) {
      console.error('Failed to add computer to group:', error);
      setStatus({
        success: false,
        message: 'Failed to add computer to group',
        target: group ? group.name : 'unknown',
      });
    }
  };

  const wakeGroup = async (groupId: string) => {
    const group = groups.find(g => g.id === groupId);
    if (!group) return;

    const groupComputers = computers.filter(c => group.computerIds.includes(c.id));
    
    for (const computer of groupComputers) {
      await wakeComputer(computer.mac, computer.ip);
    }

    setStatus({
      success: true,
      message: `Waking up all computers in ${group.name}`,
      target: group.name,
    });
  };

  const wakeSelectedComputers = async (selectedComputers: Computer[]) => {
    for (const computer of selectedComputers) {
      await wakeComputer(computer.mac, computer.ip);
    }
  };

  const addComputer = async (computer: Computer) => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      const response = await fetch('/api/computers', {
        method: 'POST',
        headers,
        body: JSON.stringify(computer),
      });
      
      const newComputer = await response.json();
      setComputers([...computers, newComputer]);
      setShowAddComputer(false);

      if (computer.groupId) {
        await addComputerToGroup(newComputer.id, computer.groupId);
      }
      
      setStatus({
        success: true,
        message: 'Computer added successfully',
        target: computer.name,
      });
    } catch (error: any) {
      console.error('Failed to add computer:', error);
      setStatus({
        success: false,
        message: 'Failed to add computer',
        target: computer.name,
      });
    }
  };

  const addGroup = async (group: Omit<ComputerGroup, 'id'>) => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      const newGroup: ComputerGroup = {
        ...group,
        id: Date.now().toString(),
        computerIds: [], // Inicializa com array vazio
      };

      const response = await fetch('/api/groups', {
        method: 'POST',
        headers,
        body: JSON.stringify(newGroup),
      });

      if (!response.ok) throw new Error('Failed to add group');

      setGroups([...groups, newGroup]);
      setShowAddGroup(false);
      
      setStatus({
        success: true,
        message: 'Group added successfully',
        target: group.name,
      });
    } catch (error: any) {
      console.error('Failed to add group:', error);
      setStatus({
        success: false,
        message: 'Failed to add group',
        target: group.name,
      });
    }
  };

  const deleteComputer = async (id: string) => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      await fetch('/api/computers', {
        method: 'DELETE',
        headers,
        body: JSON.stringify({ id }),
      });
      
      setComputers(computers.filter(c => c.id !== id));
      setStatus({
        success: true,
        message: 'Computer deleted successfully',
        target: id,
      });
    } catch (error: any) {
      console.error('Failed to delete computer:', error);
      setStatus({
        success: false,
        message: 'Failed to delete computer',
        target: id,
      });
    }
  };

  const deleteGroup = async (id: string) => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      await fetch('/api/groups', {
        method: 'DELETE',
        headers,
        body: JSON.stringify({ id }),
      });
      
      setGroups(groups.filter(g => g.id !== id));
      setComputers(computers.map(c => 
        c.groupId === id ? { ...c, groupId: undefined } : c
      ));
      setStatus({
        success: true,
        message: 'Group deleted successfully',
        target: id,
      });
    } catch (error: any) {
      console.error('Failed to delete group:', error);
      setStatus({
        success: false,
        message: 'Failed to delete group',
        target: id,
      });
    }
  };

  const updateComputer = async (computer: Computer) => {
    try {
      // Primeiro, encontra o grupo antigo e o novo
      const oldGroup = groups.find(g => g.computerIds.includes(computer.id));
      const newGroup = groups.find(g => g.id === computer.groupId);

      // Atualiza o computador
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      const response = await fetch('/api/computers', {
        method: 'PUT',
        headers,
        body: JSON.stringify(computer),
      });
      
      if (!response.ok) throw new Error('Failed to update computer');
      
      const updatedComputer = await response.json();
      setComputers(computers.map(c => c.id === computer.id ? updatedComputer : c));
      
      // Remove o computador do grupo antigo se existir
      if (oldGroup && oldGroup.id !== computer.groupId) {
        const updatedOldGroup = {
          ...oldGroup,
          computerIds: oldGroup.computerIds.filter(id => id !== computer.id)
        };
        await fetch('/api/groups', {
          method: 'PUT',
          headers,
          body: JSON.stringify(updatedOldGroup),
        });
        setGroups(groups.map(g => g.id === oldGroup.id ? updatedOldGroup : g));
      }

      // Adiciona o computador ao novo grupo se existir
      if (newGroup && (!oldGroup || oldGroup.id !== newGroup.id)) {
        const updatedNewGroup = {
          ...newGroup,
          computerIds: [...newGroup.computerIds, computer.id]
        };
        await fetch('/api/groups', {
          method: 'PUT',
          headers,
          body: JSON.stringify(updatedNewGroup),
        });
        setGroups(groups.map(g => g.id === newGroup.id ? updatedNewGroup : g));
      }

      setStatus({
        success: true,
        message: 'Computer updated successfully',
        target: computer.name,
      });
    } catch (error: any) {
      console.error('Failed to update computer:', error);
      setStatus({
        success: false,
        message: 'Failed to update computer',
        target: computer.name,
      });
    }
  };

  const updateGroup = async (group: ComputerGroup) => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      const response = await fetch('/api/groups', {
        method: 'PUT',
        headers,
        body: JSON.stringify(group),
      });
      
      const updatedGroup = await response.json();
      setGroups(groups.map(g => g.id === group.id ? updatedGroup : g));
      
      setStatus({
        success: true,
        message: 'Group updated successfully',
        target: group.name,
      });
    } catch (error: any) {
      console.error('Failed to update group:', error);
      setStatus({
        success: false,
        message: 'Failed to update group',
        target: group.name,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-test-red h-20 w-20"></div>
      <main className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Wake-on-LAN Dashboard</h1>
          <button
            onClick={logout}
            className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {status && (
          <div 
            className={`p-4 rounded-lg ${
              status.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}
          >
            {status.message}
          </div>
        )}

        <div className="border-b border-gray-200">
          <nav className="flex gap-4">
            <button
              onClick={() => setActiveTab('computers')}
              className={`px-4 py-2 font-medium border-b-2 -mb-px ${
                activeTab === 'computers'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Computers
            </button>
            <button
              onClick={() => setActiveTab('groups')}
              className={`px-4 py-2 font-medium border-b-2 -mb-px ${
                activeTab === 'groups'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Groups
            </button>
          </nav>
        </div>

        <div className="flex justify-end">
          {activeTab === 'computers' && !showAddGroup && (
            <button
              onClick={() => setShowAddComputer(!showAddComputer)}
              className={`btn ${showAddComputer ? 'bg-gray-100 text-gray-700' : 'btn-primary'}`}
            >
              {showAddComputer ? '× Cancel' : '+ Add Computer'}
            </button>
          )}
          {activeTab === 'groups' && !showAddComputer && (
            <button
              onClick={() => setShowAddGroup(!showAddGroup)}
              className={`btn ${showAddGroup ? 'bg-gray-100 text-gray-700' : 'btn-success'}`}
            >
              {showAddGroup ? '× Cancel' : '+ Add Group'}
            </button>
          )}
        </div>

        {showAddComputer && (
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Add New Computer</h2>
            <AddComputerForm onAdd={addComputer} groups={groups} />
          </div>
        )}

        {showAddGroup && (
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Create New Group</h2>
            <AddGroupForm
              onSubmit={addGroup}
              onCancel={() => setShowAddGroup(false)}
            />
          </div>
        )}

        {activeTab === 'computers' && (
          <ComputersTable
            computers={computers}
            groups={groups}
            onWake={wakeComputer}
            onDelete={deleteComputer}
            onWakeSelected={wakeSelectedComputers}
            onUpdate={updateComputer}
            onAddToGroup={addComputerToGroup}
          />
        )}

        {activeTab === 'groups' && (
          <GroupsTable
            groups={groups}
            onWake={wakeGroup}
            onDelete={deleteGroup}
            onUpdate={updateGroup}
          />
        )}
      </main>
    </div>
  );
}
