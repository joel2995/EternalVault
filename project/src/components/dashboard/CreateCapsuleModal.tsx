import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useNavigate } from 'react-router-dom';

interface CreateCapsuleModalProps {
  onClose: () => void;
}

export const CreateCapsuleModal: React.FC<CreateCapsuleModalProps> = ({
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    unlockDate: '',
    isPrivate: 'false', // this is now a string 'true' or 'false'
  });
  const [error, setError] = useState(""); // For displaying errors
  const [isConnected, setIsConnected] = useState(false); // For wallet connection
  const [address, setAddress] = useState(""); // For wallet address
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    // Add logic to check if the wallet is connected
    const checkWalletConnection = async () => {
      try {
        const connected = await window.aptos.account();
        if (connected) {
          setIsConnected(true);
          setAddress(connected.address); // Save the connected wallet address
        }
      } catch (err) {
        setIsConnected(false);
        setAddress(""); // Clear address if not connected
      }
    };
    checkWalletConnection();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error

    if (!isConnected) {
      setError("Please connect your wallet first");
      return;
    }

    if (!formData.name || !formData.description || !formData.unlockDate) {
      setError("All fields are required");
      return;
    }

    // Convert isPrivate to a boolean from string
    const isPrivate = formData.isPrivate === 'true'; 

    try {
      // Prepare the payload for the transaction
      const payload = {
        type: "entry_function_payload",
        function: "3f2addcb58598567aa54ed6b10e38b80ce9471f3d1afcbd821cab64e22bd17fc::eter::create_capsule", // Your contract address and function
        type_arguments: [],
        arguments: [
          formData.name,
          formData.description,
          formData.unlockDate,
          isPrivate, // Pass the boolean directly
          address, // User's wallet address
        ],
      };

      // Send the transaction via Aptos
      const response = await window.aptos.signAndSubmitTransaction(payload);
      console.log("Capsule Creation Response:", response);

      // Handle success response
      alert("Capsule created successfully. Redirecting to your dashboard...");
      navigate("/dashboard"); // Navigate to the dashboard after successful creation

      // Close modal
      onClose();
    } catch (err) {
      console.error("Error during capsule creation:", err);
      setError("An error occurred during capsule creation. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <Card className="w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Create New Capsule</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
              placeholder="Enter capsule name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
              placeholder="Enter capsule description"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Private Capsule
            </label>
            <select
              value={formData.isPrivate}
              onChange={(e) => setFormData({ ...formData, isPrivate: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
              required
            >
              <option value="false">False</option>
              <option value="true">True</option>
            </select>
        </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Unlock Date
            </label>
            <input
              type="date"
              value={formData.unlockDate}
              onChange={(e) => setFormData({ ...formData, unlockDate: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>




          <div className="flex gap-2 pt-4">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Capsule
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};
