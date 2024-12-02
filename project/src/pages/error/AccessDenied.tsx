import { motion } from 'framer-motion';
import { Lock, LogIn } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export const AccessDenied: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card>
          <div className="p-6 text-center">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="inline-block mb-6"
            >
              <Lock className="w-16 h-16 text-red-500" />
            </motion.div>
            
            <h1 className="text-3xl font-bold text-white mb-2">Access Denied</h1>
            <p className="text-gray-400 mb-6">
              Please connect your wallet to access this content.
            </p>
            
            <Link to="/login">
              <Button className="flex items-center gap-2 mx-auto">
                <LogIn size={20} />
                Connect Wallet
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};