import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UpdateCapsuleForm } from '../components/capsule/UpdateCapsuleForm';
import { Navbar } from '../components/dashboard/Navbar';
import { Card } from '../components/ui/Card';
import { Capsule } from '../types';

export const UpdateCapsule: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();


  
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

  const handleUpdate = (data: Partial<Capsule>) => {
    // Implement update logic here
    console.log('Updating capsule:', data);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Update Capsule</h2>
              <UpdateCapsuleForm
                capsule={capsule}
                onSubmit={handleUpdate}
                onCancel={() => navigate('/dashboard')}
              />
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};