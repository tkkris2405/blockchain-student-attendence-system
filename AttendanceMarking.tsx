import { useState, useEffect } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useToast,
  Select,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import { format } from 'date-fns';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../constants/contract';

interface Student {
  name: string;
  rollNumber: string;
}

export const AttendanceMarking = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const toast = useToast();

  const markAttendance = async (rollNumber: string, isPresent: boolean) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      
      const currentDate = format(new Date(), 'yyyy-MM-dd');
      const tx = await contract.markAttendance(
        rollNumber,
        currentDate,
        selectedSubject,
        isPresent
      );
      await tx.wait();
      
      toast({
        title: 'Success',
        description: `Attendance marked as ${isPresent ? 'present' : 'absent'}`,
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to mark attendance',
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <Box p={4}>
      <Select
        placeholder="Select subject"
        mb={4}
        value={selectedSubject}
        onChange={(e) => setSelectedSubject(e.target.value)}
      >
        <option value="Math">Math</option>
        <option value="Physics">Physics</option>
        <option value="Chemistry">Chemistry</option>
        <option value="English">English</option>
        <option value="Computer Science">Computer Science</option>
      </Select>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Roll Number</Th>
            <Th>Name</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students.map((student) => (
            <Tr key={student.rollNumber}>
              <Td>{student.rollNumber}</Td>
              <Td>{student.name}</Td>
              <Td>
                <Button
                  colorScheme="green"
                  size="sm"
                  mr={2}
                  onClick={() => markAttendance(student.rollNumber, true)}
                >
                  Present
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => markAttendance(student.rollNumber, false)}
                >
                  Absent
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};