import { motion } from 'framer-motion';
import React from 'react';
import { useParams } from 'react-router-dom';
import { CapsuleDetails } from '../components/capsule/CapsuleDetails';
import { Navbar } from '../components/dashboard/Navbar';
import { Capsule } from '../types';

export const ViewCapsule: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock data - replace with actual data fetching
  const capsule: Capsule = {
    id: id || '',
    name: 'Family Memories 2024',
    description: 'A collection of our favorite family moments from 2024.',
    createdAt: new Date('2024-03-01'),
    unlockDate: new Date('2025-01-01'),
    isPrivate: true,
    owner: '0x123',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <CapsuleDetails capsule={capsule} />
        </motion.div>
      </main>
    </div>
  );
};