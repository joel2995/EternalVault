import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export const NotFound: React.FC = () => {
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
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6"
            >
              <Search className="w-16 h-16 text-purple-500" />
            </motion.div>
            
            <h1 className="text-3xl font-bold text-white mb-2">Page Not Found</h1>
            <p className="text-gray-400 mb-6">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <Link to="/">
              <Button className="flex items-center gap-2 mx-auto">
                <Home size={20} />
                Return Home
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};