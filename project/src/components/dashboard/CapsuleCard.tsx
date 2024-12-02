import { motion } from 'framer-motion';
import { Clock, Edit, Lock, Share, Trash } from 'lucide-react';
import React from 'react';
import { Capsule } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface CapsuleCardProps {
  capsule: Capsule;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onShare: (id: string) => void;
}

export const CapsuleCard: React.FC<CapsuleCardProps> = ({
  capsule,
  onEdit,
  onDelete,
  onShare,
}) => {
  const timeLeft = new Date(capsule.unlockDate).getTime() - new Date().getTime();
  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

  return (
    <Card className="relative overflow-hidden group">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-4"
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-white">{capsule.name}</h3>
          <div className="flex items-center gap-2">
            {capsule.isPrivate && <Lock size={16} className="text-purple-500" />}
          </div>
        </div>
        
        <p className="text-gray-400 mb-4 line-clamp-2">{capsule.description}</p>
        
        <div className="flex items-center gap-2 text-gray-300 mb-4">
          <Clock size={16} />
          <span>{daysLeft} days until unlock</span>
        </div>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="secondary" onClick={() => onEdit(capsule.id)}>
            <Edit size={16} />
          </Button>
          <Button variant="secondary" onClick={() => onShare(capsule.id)}>
            <Share size={16} />
          </Button>
          <Button variant="secondary" onClick={() => onDelete(capsule.id)}>
            <Trash size={16} />
          </Button>
        </div>
      </motion.div>
    </Card>
  );
};