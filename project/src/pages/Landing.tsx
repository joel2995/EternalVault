import { motion } from 'framer-motion';
import { Box, Hexagon } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="inline-block mb-8"
        >
          <Hexagon size={64} className="text-blue-500" />
        </motion.div>
        
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Eternal Vault
        </h1>
        
        <p className="text-xl text-gray-300 mb-12">
          Secure your digital legacy with blockchain-powered time capsules
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link to="/login">
            <Button variant="primary">
              <Box className="inline-block mr-2" /> Login
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="secondary">Register</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};