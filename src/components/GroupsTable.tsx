'use client';

import { useState } from 'react';
import { ComputerGroup } from '../types';
import EditGroupForm from './EditGroupForm';

interface GroupsTableProps {
  groups: ComputerGroup[];
  onWake: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (group: ComputerGroup) => void;
}

export default function GroupsTable({
  groups,
  onWake,
  onDelete,
  onUpdate,
}: GroupsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.prefix.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveEdit = (updatedGroup: ComputerGroup) => {
    onUpdate(updatedGroup);
    setEditingGroupId(null);
  };

  if (editingGroupId) {
    const editingGroup = groups.find(group => group.id === editingGroupId);
    if (!editingGroup) return null;

    return (
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Group</h2>
        <EditGroupForm
          group={editingGroup}
          onSave={handleSaveEdit}
          onCancel={() => setEditingGroupId(null)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search groups..."
          className="input max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Prefix</th>
              <th className="p-4 text-left">Computers</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredGroups.map((group) => (
              <tr key={group.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{group.name}</td>
                <td className="p-4">
                  <code className="px-2 py-1 rounded bg-gray-100">{group.prefix}</code>
                </td>
                <td className="p-4">{group.computerIds?.length}</td>
                <td className="p-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => onWake(group.id)}
                      className="btn btn-success text-sm"
                      disabled={group.computerIds?.length === 0}
                    >
                      Wake Group
                    </button>
                    <button
                      onClick={() => setEditingGroupId(group.id)}
                      className="btn bg-blue-500 hover:bg-blue-600 text-sm text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(group.id)}
                      className="btn bg-red-500 hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredGroups.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No groups found
        </div>
      )}
    </div>
  );
}
