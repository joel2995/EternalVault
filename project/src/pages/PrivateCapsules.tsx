import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import React, { useState } from 'react';
import { CapsuleCard } from '../components/dashboard/CapsuleCard';
import { Navbar } from '../components/dashboard/Navbar';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Capsule, Group } from '../types';

const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Time Travelers',
    description: 'A community of time capsule enthusiasts',
    memberCount: 128,
    price: 0.1,
    capsuleCount: 45,
  },
  
];

const mockPrivateCapsules: Capsule[] = [
  {
    id: '1',
    name: 'Group Memories 2024',
    description: 'Shared memories within our group.',
    createdAt: new Date('2024-03-01'),
    unlockDate: new Date('2025-01-01'),
    isPrivate: true,
    owner: '0x123',
    groupId: '1',
  },
  // Add more mock capsules...
];

export const PrivateCapsules: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'groups' | 'shared'>('groups');

  const handleJoinGroup = (groupId: string) => {
    console.log('Join group:', groupId);
  };

  const handleEdit = (id: string) => {
    console.log('Edit capsule:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete capsule:', id);
  };

  const handleShare = (id: string) => {
    console.log('Share capsule:', id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Private Capsules</h2>
          
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'groups' ? 'primary' : 'secondary'}
              onClick={() => setActiveTab('groups')}
            >
              Groups
            </Button>
            <Button
              variant={activeTab === 'shared' ? 'primary' : 'secondary'}
              onClick={() => setActiveTab('shared')}
            >
              Shared With Me
            </Button>
          </div>
        </div>

        {activeTab === 'groups' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockGroups.map((group) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="relative overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Users className="text-purple-500" size={24} />
                      <h3 className="text-xl font-semibold text-white">{group.name}</h3>
                    </div>
                    
                    <p className="text-gray-400 mb-4">{group.description}</p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-400">Members</p>
                        <p className="text-lg font-semibold text-white">{group.memberCount}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-400">Capsules</p>
                        <p className="text-lg font-semibold text-white">{group.capsuleCount}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-400">Price</p>
                        <p className="text-lg font-semibold text-white">{group.price} ETH</p>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => handleJoinGroup(group.id)}
                      className="w-full"
                    >
                      Join Group
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {mockPrivateCapsules.map((capsule) => (
              <CapsuleCard
                key={capsule.id}
                capsule={capsule}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onShare={handleShare}
              />
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
};