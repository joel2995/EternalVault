import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ShareCapsuleForm } from '../components/capsule/ShareCapsuleForm';
import { Navbar } from '../components/dashboard/Navbar';
import { AptosClient, AptosAccount, FaucetClient } from 'aptos';

const aptosClient = new AptosClient('https://fullnode.devnet.aptoslabs.com/v1');

export const ShareCapsule: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // Handle capsule sharing logic
  const handleShareUpdate = async (isPrivate: boolean, sharedAddresses: string[]) => {
    setLoading(true);

    try {
      // Ensure the user is connected with their Aptos account
      const account = new AptosAccount();

      // Create the payload for capsule sharing based on privacy and addresses
      const payload = {
        type: 'entry_function_payload',
        function: '3f2addcb58598567aa54ed6b10e38b80ce9471f3d1afcbd821cab64e22bd17fc::eter.share_capsule',
        type_arguments: [],
        arguments: [
          id, // Capsule ID
          isPrivate, // Is private or public
          sharedAddresses, // List of addresses for private sharing
        ],
      };

      // Generate and sign the transaction
      const txnRequest = await aptosClient.generateTransaction(account.address(), payload);
      const signedTxn = await account.signTransaction(txnRequest);

      // Submit the transaction to the blockchain
      const txnHash = await aptosClient.submitTransaction(signedTxn);
      await aptosClient.waitForTransaction(txnHash); // Wait for transaction confirmation

      console.log('Capsule share settings updated successfully', txnHash);
      navigate('/dashboard'); // Redirect to the dashboard after successful sharing
    } catch (error) {
      console.error('Error during capsule sharing update:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ShareCapsuleForm
            capsuleId={id || ''}
            isPrivate={true} // Initially, we are setting it to true for private by default
            onShareUpdate={handleShareUpdate}
          />
        </motion.div>
      </main>
    </div>
  );
};
