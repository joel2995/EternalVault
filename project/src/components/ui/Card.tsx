import { motion } from 'framer-motion';
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        bg-gray-900/50 backdrop-blur-xl rounded-xl p-6
        border border-gray-800 shadow-xl
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};