import { motion } from "framer-motion";
import { User, Wallet } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { AptosClient } from "aptos";

export const Login: React.FC = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const aptosClient = new AptosClient("https://fullnode.devnet.aptoslabs.com");

  // Connect to Petra Wallet
  const connectWallet = async () => {
    setIsConnecting(true);
    setError("");
    try {
      if (!window.aptos) {
        alert("Petra Wallet is not installed. Please install it to proceed.");
        setIsConnecting(false);
        return;
      }

      const account = await window.aptos.connect();
      setAddress(account.address);
      setIsConnected(true);
      console.log("Connected address:", account.address);
    } catch (err) {
      console.error("Wallet connection failed:", err);
      setError("Failed to connect to wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  // Handle form submission for login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isConnected) {
      setError("Please connect your wallet first");
      return;
    }

    if (pin.length !== 6 || isNaN(Number(pin))) {
      setError("PIN must be a 6-digit number");
      return;
    }

    try {
      const payload = {
        type: "entry_function_payload",
        function: "3f2addcb58598567aa54ed6b10e38b80ce9471f3d1afcbd821cab64e22bd17fc::eter::login_user",
        type_arguments: [],
        arguments: [address, Array.from(pin, Number)], // Pass wallet address and pin
      };

      const response = await window.aptos.signAndSubmitTransaction(payload);
      console.log("Login response:", response);

      // Navigate to the dashboard or user home page
      alert("Login successful. Redirecting to your dashboard...");
      navigate("/dashboard");  // Update with actual dashboard path
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Login to Your Vault
        </h2>
        <form onSubmit={handleLogin}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <Button
              type="button"
              onClick={connectWallet}
              disabled={isConnected || isConnecting}
              className="w-full flex items-center justify-center gap-2"
            >
              <motion.div
                animate={isConnecting ? { rotate: 360 } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Wallet className="w-5 h-5" />
              </motion.div>
              {isConnected
                ? `Wallet Connected: ${address?.slice(0, 6)}...${address?.slice(-4)}`
                : isConnecting
                ? "Connecting..."
                : "Connect Wallet"}
            </Button>
            {isConnected && (
              <div className="text-green-400 text-sm text-center">
                Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Security PIN
              </label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                maxLength={6}
                className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                placeholder="Enter 6-digit PIN"
                required
              />
            </div>
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm text-center"
              >
                {error}
              </motion.div>
            )}
            <Button
              type="submit"
              variant="primary"
              className="w-full mt-6"
              disabled={!isConnected}
            >
              Login
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="w-full mt-6"
              onClick={() => navigate("/register")}
            >
              Don't have an account? Register
            </Button>
          </motion.div>
        </form>
      </Card>
    </div>
  );
};
