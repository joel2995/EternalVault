import { motion } from 'framer-motion';
import { Search, SortDesc } from 'lucide-react';
import React, { useState } from 'react';
import { CapsuleCard } from '../components/dashboard/CapsuleCard';
import { Navbar } from '../components/dashboard/Navbar';
import { Button } from '../components/ui/Button';
import { Capsule } from '../types';

const mockPublicCapsules: Capsule[] = [
  {
    id: '1',
    name: 'Community Time Capsule 2024',
    description: 'A collection of community memories and achievements.',
    createdAt: new Date('2024-03-01'),
    unlockDate: new Date('2025-01-01'),
    isPrivate: false,
    owner: '0x123',
    views: 156,
  },
  // Add more mock capsules...
];

export const PublicCapsules: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'views'>('date');

  const filteredCapsules = mockPublicCapsules.filter(
    capsule => 
      capsule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      capsule.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold text-white">Public Capsules</h2>
          
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-initial">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search capsules..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            
            <Button
              variant="secondary"
              onClick={() => setSortBy(sortBy === 'date' ? 'views' : 'date')}
              className="flex items-center gap-2"
            >
              <SortDesc size={20} />
              Sort by {sortBy === 'date' ? 'Views' : 'Date'}
            </Button>
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCapsules.map((capsule) => (
            <CapsuleCard
              key={capsule.id}
              capsule={capsule}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onShare={handleShare}
            />
          ))}
        </motion.div>
      </main>
    </div>
  );
};