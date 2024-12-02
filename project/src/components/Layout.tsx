import { motion } from 'framer-motion';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <motion.div
        className="fixed inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #4F46E5 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
};