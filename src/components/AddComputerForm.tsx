'use client';

import { useState, useEffect } from 'react';
import { Computer } from '../types';

interface AddComputerFormProps {
  onAdd: (computer: Computer) => void;
  groups?: { id: string; name: string; prefix: string }[];
}

export default function AddComputerForm({ onAdd, groups }: AddComputerFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    ip: '',
    mac: '',
    groupId: '',
  });

  const [displayName, setDisplayName] = useState('');

  // Atualiza o nome exibido quando o grupo ou nome mudar
  useEffect(() => {
    if (formData.groupId && formData.name) {
      const selectedGroup = groups?.find(g => g.id === formData.groupId);
      if (selectedGroup) {
        setDisplayName(`${selectedGroup.prefix}${formData.name}`);
      }
    } else {
      setDisplayName(formData.name);
    }
  }, [formData.groupId, formData.name, groups]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const computer: Computer = {
      id: Date.now().toString(),
      name: displayName, // Usa o nome com prefixo
      ip: formData.ip,
      mac: formData.mac.toLowerCase().replace(/[^a-f0-9]/g, ''),
      groupId: formData.groupId || undefined,
    };

    onAdd(computer);
    setFormData({ name: '', ip: '', mac: '', groupId: '' });
    setDisplayName('');
  };

  // Handler para mudança de grupo
  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newGroupId = e.target.value;
    setFormData({ ...formData, groupId: newGroupId });
  };

  // Handler para mudança de nome
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setFormData({ ...formData, name: newName });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {groups && groups.length > 0 && (
        <div>
          <label htmlFor="group" className="label">
            Group
          </label>
          <select
            id="group"
            value={formData.groupId}
            onChange={handleGroupChange}
            className="input"
          >
            <option value="">No Group</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name} ({group.prefix})
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="name" className="label">
          Computer Name
        </label>
        <div className="space-y-1">
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleNameChange}
            className="input"
            placeholder="e.g., PC01"
            required
          />
          {displayName !== formData.name && (
            <p className="text-sm text-gray-600">
              Will be saved as: {displayName}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="ip" className="label">
          IP Address
        </label>
        <input
          type="text"
          id="ip"
          value={formData.ip}
          onChange={(e) => setFormData({ ...formData, ip: e.target.value })}
          className="input"
          placeholder="e.g., 192.168.1.100"
          pattern="^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$"
          required
        />
      </div>

      <div>
        <label htmlFor="mac" className="label">
          MAC Address
        </label>
        <input
          type="text"
          id="mac"
          value={formData.mac}
          onChange={(e) => setFormData({ ...formData, mac: e.target.value })}
          className="input"
          placeholder="e.g., 00:11:22:33:44:55"
          pattern="^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$"
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full"
      >
        Add Computer
      </button>
    </form>
  );
}
