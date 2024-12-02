import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Capsule } from '../../types';
import { Button } from '../ui/Button';

interface UpdateCapsuleFormProps {
  capsule: Capsule;
  onSubmit: (data: Partial<Capsule>) => void;
  onCancel: () => void;
}

export const UpdateCapsuleForm: React.FC<UpdateCapsuleFormProps> = ({
  capsule,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: capsule.name,
    description: capsule.description,
    unlockDate: new Date(capsule.unlockDate).toISOString().split('T')[0],
    isPrivate: capsule.isPrivate,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      unlockDate: new Date(formData.unlockDate),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
          placeholder="Enter capsule name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
          placeholder="Enter capsule description"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Unlock Date
        </label>
        <input
          type="date"
          value={formData.unlockDate}
          onChange={(e) => setFormData({ ...formData, unlockDate: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
          min={new Date().toISOString().split('T')[0]}
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isPrivate"
          checked={formData.isPrivate}
          onChange={(e) => setFormData({ ...formData, isPrivate: e.target.checked })}
          className="rounded bg-gray-800 border-gray-700 text-purple-600"
        />
        <label htmlFor="isPrivate" className="text-sm font-medium text-gray-300">
          Make this capsule private
        </label>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Update Capsule
        </Button>
      </div>
    </form>
  );
};