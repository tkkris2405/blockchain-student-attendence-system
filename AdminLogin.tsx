import { useState } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  useToast,
  Text
} from '@chakra-ui/react';
import { connectWallet } from '../utils/web3';

export const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      if (username === 'admin' && password === 'admin123') {
        const { address } = await connectWallet();
        
        toast({
          title: 'Connected to MetaMask',
          description: `Wallet: ${address.slice(0, 6)}...${address.slice(-4)}`,
          status: 'success',
          duration: 3000,
        });
        
        onLogin();
      } else {
        toast({
          title: 'Error',
          description: 'Invalid credentials',
          status: 'error',
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Please connect MetaMask',
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <Box p={6} borderWidth={1} borderRadius="lg" width="100%" maxW="400px">
      <form onSubmit={handleLogin}>
        <VStack spacing={4}>
          <Text fontSize="xl" fontWeight="bold">Admin Login</Text>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" colorScheme="blue" width="full">
            Login with MetaMask
          </Button>
        </VStack>
      </form>
    </Box>
  );
};