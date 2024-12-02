import { motion } from 'framer-motion';
import { LogOut, User } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../../contexts/WalletContext';
import { shortenAddress } from '../../utils/validation';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const { address, disconnect } = useWallet();
  const navigate = useNavigate();

  const handleLogout = () => {
    disconnect();
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Eternal Vault
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-300">
              <User size={20} />
              <span>{shortenAddress(address || '')}</span>
            </div>
            <Button variant="secondary" onClick={handleLogout}>
              <LogOut size={20} />
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};