'use client';

import { useState, useMemo } from 'react';
import { Computer, ComputerGroup } from '../types';
import EditComputerForm from './EditComputerForm';

interface ComputersTableProps {
  computers: Computer[];
  groups: ComputerGroup[];
  onWake: (mac: string, ip?: string) => void;
  onDelete: (id: string) => void;
  onWakeSelected: (computers: Computer[]) => void;
  onUpdate: (computer: Computer) => void;
}

export default function ComputersTable({
  computers,
  groups,
  onWake,
  onDelete,
  onWakeSelected,
  onUpdate,
}: ComputersTableProps) {
  const [selectedComputers, setSelectedComputers] = useState<Set<string>>(new Set());
  const [sortField, setSortField] = useState<keyof Computer>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterGroup, setFilterGroup] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingComputer, setEditingComputer] = useState<Computer | null>(null);

  // Filtra e ordena os computadores
  const filteredAndSortedComputers = useMemo(() => {
    let result = [...computers];

    // Aplicar filtro de grupo
    if (filterGroup) {
      result = result.filter(c => c.groupId === filterGroup);
    }

    // Aplicar termo de busca
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(search) ||
        c.ip.toLowerCase().includes(search) ||
        c.mac.toLowerCase().includes(search)
      );
    }

    // Ordenar
    result.sort((a, b) => {
      const aValue = a[sortField]?.toString() || '';
      const bValue = b[sortField]?.toString() || '';
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

    return result;
  }, [computers, sortField, sortDirection, filterGroup, searchTerm]);

  // Toggle seleção de um computador
  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedComputers);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedComputers(newSelected);
  };

  // Toggle seleção de todos os computadores
  const toggleSelectAll = () => {
    if (selectedComputers.size === filteredAndSortedComputers.length) {
      setSelectedComputers(new Set());
    } else {
      setSelectedComputers(new Set(filteredAndSortedComputers.map(c => c.id)));
    }
  };

  // Alterna a direção da ordenação
  const toggleSort = (field: keyof Computer) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSaveEdit = (updatedComputer: Computer) => {
    onUpdate(updatedComputer);
    setEditingComputer(null);
  };

  if (editingComputer) {
    return (
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Computer</h2>
        <EditComputerForm
          computer={editingComputer}
          groups={groups}
          onSave={handleSaveEdit}
          onCancel={() => setEditingComputer(null)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Search computers..."
            className="input max-w-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="input max-w-xs"
            value={filterGroup}
            onChange={(e) => setFilterGroup(e.target.value)}
          >
            <option value="">All Groups</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>
        
        {selectedComputers.size > 0 && (
          <button
            className="btn btn-primary"
            onClick={() => onWakeSelected(
              filteredAndSortedComputers.filter(c => selectedComputers.has(c.id))
            )}
          >
            Wake Selected ({selectedComputers.size})
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">
                <input
                  type="checkbox"
                  checked={selectedComputers.size === filteredAndSortedComputers.length}
                  onChange={toggleSelectAll}
                  className="ml-[-16px] rounded border-gray-300"
                />
              </th>
              <th 
                className="p-4 text-left cursor-pointer hover:bg-gray-100"
                onClick={() => toggleSort('name')}
              >
                Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="p-4 text-left cursor-pointer hover:bg-gray-100"
                onClick={() => toggleSort('ip')}
              >
                IP {sortField === 'ip' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="p-4 text-left cursor-pointer hover:bg-gray-100"
                onClick={() => toggleSort('mac')}
              >
                MAC {sortField === 'mac' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th className="p-4 text-left">Group</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedComputers.map((computer) => {
              const group = groups.find(g => g.id === computer.groupId);
              return (
                <tr key={computer.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedComputers.has(computer.id)}
                      onChange={() => toggleSelect(computer.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="p-4">{computer.name}</td>
                  <td className="p-4">{computer.ip}</td>
                  <td className="p-4">{computer.mac}</td>
                  <td className="p-4">
                    {group && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {group.name}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => onWake(computer.mac, computer.ip)}
                        className="btn btn-primary text-sm"
                      >
                        Wake Up
                      </button>
                      <button
                        onClick={() => setEditingComputer(computer)}
                        className="btn bg-blue-500 hover:bg-blue-600 text-sm text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(computer.id)}
                        className="btn bg-red-500 hover:bg-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredAndSortedComputers.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No computers found
        </div>
      )}
    </div>
  );
}
