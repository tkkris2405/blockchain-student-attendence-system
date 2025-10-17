import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../constants/contract';

export const StudentRegistration = () => {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const toast = useToast();

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      
      const tx = await contract.registerStudent(name, rollNumber);
      await tx.wait();
      
      toast({
        title: 'Success',
        description: 'Student registered successfully',
        status: 'success',
        duration: 5000,
      });
      
      setName('');
      setRollNumber('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to register student',
        status: 'error',
        duration: 5000,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
      <form onSubmit={handleRegistration}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Student Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          
          <FormControl isRequired>
            <FormLabel>Roll Number</FormLabel>
            <Input
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
            />
          </FormControl>
          
          <Button type="submit" colorScheme="green" width="full">
            Register Student
          </Button>
        </VStack>
      </form>
    </Box>
  );
};