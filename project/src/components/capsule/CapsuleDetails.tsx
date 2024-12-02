import { motion } from 'framer-motion';
import { Clock, Lock, Share, User } from 'lucide-react';
import React from 'react';
import { Capsule } from '../../types';
import { shortenAddress } from '../../utils/validation';
import { Card } from '../ui/Card';

interface CapsuleDetailsProps {
  capsule: Capsule;
}

export const CapsuleDetails: React.FC<CapsuleDetailsProps> = ({ capsule }) => {
  const timeLeft = new Date(capsule.unlockDate).getTime() - new Date().getTime();
  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

  return (
    <Card className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">{capsule.name}</h1>
          {capsule.isPrivate && (
            <Lock className="text-purple-500" size={24} />
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-gray-300">{capsule.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 bg-gray-800/30 rounded-lg p-4">
              <Clock className="text-blue-400" size={20} />
              <div>
                <p className="text-sm text-gray-400">Time Until Unlock</p>
                <p className="text-lg font-semibold text-white">{daysLeft} days</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-gray-800/30 rounded-lg p-4">
              <User className="text-blue-400" size={20} />
              <div>
                <p className="text-sm text-gray-400">Created By</p>
                <p className="text-lg font-semibold text-white">
                  {shortenAddress(capsule.owner)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-800/30 rounded-lg p-4">
            <Share className="text-blue-400" size={20} />
            <div>
              <p className="text-sm text-gray-400">Visibility</p>
              <p className="text-lg font-semibold text-white">
                {capsule.isPrivate ? 'Private Capsule' : 'Public Capsule'}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </Card>
  );
};