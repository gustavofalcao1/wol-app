'use client';

import { useState } from 'react';
import { ComputerGroup } from '../types';

interface AddGroupFormProps {
  onSubmit: (group: Omit<ComputerGroup, 'id' | 'computers'>) => void;
  onCancel: () => void;
}

export default function AddGroupForm({ onSubmit, onCancel }: AddGroupFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    prefix: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="label">
          Group Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="input"
          placeholder="e.g., Development Team"
          required
        />
      </div>

      <div>
        <label htmlFor="prefix" className="label">
          Prefix
        </label>
        <input
          type="text"
          id="prefix"
          value={formData.prefix}
          onChange={(e) => setFormData({ ...formData, prefix: e.target.value })}
          className="input"
          placeholder="e.g., DEV-"
          required
        />
        <p className="text-sm text-gray-500 mt-1">
          This prefix will be added to all computers in this group
        </p>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="btn btn-primary flex-1"
        >
          Add Group
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
