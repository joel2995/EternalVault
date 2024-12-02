import { motion } from 'framer-motion';
import { Copy, Share2, Users } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface ShareCapsuleFormProps {
  capsuleId: string;
  isPrivate: boolean;
  onShareUpdate: (isPrivate: boolean, sharedAddresses: string[]) => void;
}

export const ShareCapsuleForm: React.FC<ShareCapsuleFormProps> = ({
  capsuleId,
  isPrivate,
  onShareUpdate,
}) => {
  const [newAddress, setNewAddress] = useState('');
  const [sharedAddresses, setSharedAddresses] = useState<string[]>([]);
  const [currentPrivate, setCurrentPrivate] = useState(isPrivate);

  const handleAddAddress = () => {
    if (newAddress && !sharedAddresses.includes(newAddress)) {
      setSharedAddresses([...sharedAddresses, newAddress]);
      setNewAddress('');
    }
  };

  const handleRemoveAddress = (address: string) => {
    setSharedAddresses(sharedAddresses.filter(a => a !== address));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onShareUpdate(currentPrivate, sharedAddresses);
  };

  const shareUrl = `https://eternalvault.app/capsule/${capsuleId}`;

  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Share Capsule</h2>
          <Share2 className="text-purple-500" size={24} />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPrivate"
              checked={currentPrivate}
              onChange={(e) => setCurrentPrivate(e.target.checked)}
              className="rounded bg-gray-800 border-gray-700 text-purple-600"
            />
            <label htmlFor="isPrivate" className="text-sm font-medium text-gray-300">
              Keep this capsule private
            </label>
          </div>

          {currentPrivate && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="Enter wallet address"
                  className="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                />
                <Button type="button" onClick={handleAddAddress}>
                  <Users size={20} className="mr-2" /> Add
                </Button>
              </div>

              {sharedAddresses.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-300">Shared with:</p>
                  {sharedAddresses.map((address) => (
                    <div
                      key={address}
                      className="flex items-center justify-between bg-gray-800/30 rounded-lg p-3"
                    >
                      <span className="text-gray-300">{address}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAddress(address)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {!currentPrivate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              <p className="text-sm font-medium text-gray-300">Public Share Link:</p>
              <div className="flex items-center gap-2 bg-gray-800/30 rounded-lg p-3">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 bg-transparent text-gray-300"
                />
                <Button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(shareUrl)}
                >
                  <Copy size={20} />
                </Button>
              </div>
            </motion.div>
          )}
        </div>

        <Button type="submit" className="w-full">
          Update Sharing Settings
        </Button>
      </form>
    </Card>
  );
};