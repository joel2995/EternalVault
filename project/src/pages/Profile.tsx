import { motion } from 'framer-motion';
import { Key, User, Wallet } from 'lucide-react';
import React, { useState } from 'react';
import { Navbar } from '../components/dashboard/Navbar';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useWallet } from '../contexts/WalletContext';
import { validatePin } from '../utils/validation';

export const Profile: React.FC = () => {
  const { address } = useWallet();
  const [name, setName] = useState('John Doe');
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePin(currentPin)) {
      setError('Invalid current PIN');
      return;
    }
    if (newPin && !validatePin(newPin)) {
      setError('Invalid new PIN');
      return;
    }
    // Update profile logic here
    setIsEditing(false);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
                <Button
                  variant="secondary"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-lg">
                  <Wallet className="text-purple-500" size={24} />
                  <div>
                    <p className="text-sm text-gray-400">Connected Wallet</p>
                    <p className="text-lg font-semibold text-white">{address}</p>
                  </div>
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Display Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white disabled:opacity-50"
                      />
                      <User className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    </div>
                  </div>

                  {isEditing && (
                    <>
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Current PIN
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            value={currentPin}
                            onChange={(e) => setCurrentPin(e.target.value)}
                            maxLength={6}
                            className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                          />
                          <Key className="absolute left-3 top-2.5 text-gray-400" size={20} />
                        </div>
                      </div>

                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          New PIN (optional)
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            value={newPin}
                            onChange={(e) => setNewPin(e.target.value)}
                            maxLength={6}
                            className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                          />
                          <Key className="absolute left-3 top-2.5 text-gray-400" size={20} />
                        </div>
                      </div>

                      {error && (
                        <p className="text-red-400 text-sm">{error}</p>
                      )}

                      <Button type="submit" className="w-full">
                        Save Changes
                      </Button>
                    </>
                  )}
                </form>

                <div className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">Vault Points</p>
                    <p className="text-lg font-semibold text-white">1,234 points</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <span className="text-white font-bold">L2</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};