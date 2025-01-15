'use client';

import { useState, useEffect } from 'react';
import { Computer } from '../types';

interface EditComputerFormProps {
  computer: Computer;
  groups?: { id: string; name: string; prefix: string }[];
  onSave: (computer: Computer) => void;
  onCancel: () => void;
}

export default function EditComputerForm({
  computer,
  groups,
  onSave,
  onCancel
}: EditComputerFormProps) {
  const [formData, setFormData] = useState({
    name: computer.name,
    ip: computer.ip,
    mac: computer.mac,
    groupId: computer.groupId || '',
  });

  const [displayName, setDisplayName] = useState(computer.name);

  // Atualiza o nome exibido quando o grupo ou nome mudar
  useEffect(() => {
    if (formData.groupId && formData.name) {
      const selectedGroup = groups?.find(g => g.id === formData.groupId);
      if (selectedGroup) {
        // Remove o prefixo antigo se existir
        const oldGroup = groups?.find(g => g.id === computer.groupId);
        let nameWithoutPrefix = formData.name;
        if (oldGroup && formData.name.startsWith(oldGroup.prefix)) {
          nameWithoutPrefix = formData.name.slice(oldGroup.prefix.length);
        }
        setDisplayName(`${selectedGroup.prefix}${nameWithoutPrefix}`);
      }
    } else {
      setDisplayName(formData.name);
    }
  }, [formData.groupId, formData.name, groups, computer.groupId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedComputer: Computer = {
      ...computer,
      name: displayName,
      ip: formData.ip,
      mac: formData.mac.toLowerCase().replace(/[^a-f0-9]/g, ''),
      groupId: formData.groupId || undefined,
    };

    onSave(updatedComputer);
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
            onChange={(e) => setFormData({ ...formData, groupId: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

      <div className="flex gap-2">
        <button
          type="submit"
          className="btn btn-primary flex-1"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn bg-gray-100 text-gray-700 flex-1"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
