import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import { CapsuleCard } from '../components/dashboard/CapsuleCard';
import { CreateCapsuleModal } from '../components/dashboard/CreateCapsuleModal';
import { Navbar } from '../components/dashboard/Navbar';
import { Button } from '../components/ui/Button';
import { useWallet } from '../contexts/WalletContext';
import { Capsule } from '../types';

const mockCapsules: Capsule[] = [
  {
    id: '1',
    name: 'Family Memories 2024',
    description: 'A collection of our favorite family moments from 2024.',
    createdAt: new Date('2024-03-01'),
    unlockDate: new Date('2025-01-01'),
    isPrivate: true,
    owner: '0x123',
  },
  {
    id: '2',
    name: 'Project Alpha Launch',
    description: 'Commemorating the successful launch of Project Alpha.',
    createdAt: new Date('2024-02-15'),
    unlockDate: new Date('2024-12-31'),
    isPrivate: false,
    owner: '0x123',
  },
];

export const Dashboard: React.FC = () => {
  const { address } = useWallet();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [capsules, setCapsules] = useState<Capsule[]>(mockCapsules);

  const handleCreateCapsule = (data: {
    name: string;
    description: string;
    unlockDate: string;
    isPrivate: boolean;
  }) => {
    const newCapsule: Capsule = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      createdAt: new Date(),
      unlockDate: new Date(data.unlockDate),
      owner: address || '',
    };
    setCapsules([newCapsule, ...capsules]);
    setShowCreateModal(false);
  };

  const handleEdit = (id: string) => {
    // Implement edit functionality
    console.log('Edit capsule:', id);
  };

  const handleDelete = (id: string) => {
    setCapsules(capsules.filter(capsule => capsule.id !== id));
  };

  const handleShare = (id: string) => {
    // Implement share functionality
    console.log('Share capsule:', id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Your Time Capsules</h2>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="mr-2" /> Create New Capsule
          </Button>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {capsules.map((capsule) => (
            <CapsuleCard
              key={capsule.id}
              capsule={capsule}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onShare={handleShare}
            />
          ))}
        </motion.div>

        <AnimatePresence>
          {showCreateModal && (
            <CreateCapsuleModal
              onClose={() => setShowCreateModal(false)}
              onSubmit={handleCreateCapsule}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};