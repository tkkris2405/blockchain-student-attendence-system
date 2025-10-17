import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  useToast,
  Grid,
  GridItem,
  Select,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../constants/contract';
import { TimeTable } from './TimeTable';
import { StudentList } from './StudentList';
import { LiveClock } from './LiveClock';

export const AttendanceSystem = () => {
  const [studentName, setStudentName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [studentWallet, setStudentWallet] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const toast = useToast();

  const getCurrentSubject = () => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const hour = now.getHours();
    
    if (day === 0 || day === 6) return ''; // Weekend
    
    if (hour >= 9 && hour < 11) return TIMETABLE[Object.keys(TIMETABLE)[day-1]][0];
    if (hour >= 11 && hour < 13) return TIMETABLE[Object.keys(TIMETABLE)[day-1]][1];
    if (hour >= 14 && hour < 16) return TIMETABLE[Object.keys(TIMETABLE)[day-1]][2];
    
    return '';
  };

  useEffect(() => {
    const subject = getCurrentSubject();
    setSelectedSubject(subject);
  }, []);

  const registerStudent = async (e) => {
    e.preventDefault();
    if (!studentName || !rollNumber || !studentWallet) {
      toast({
        title: 'Error',
        description: 'Please fill all fields',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      
      const tx = await contract.registerStudent(studentName, rollNumber, studentWallet);
      await tx.wait();
      
      setStudents([...students, { name: studentName, rollNumber, walletAddress: studentWallet }]);
      
      toast({
        title: 'Success',
        description: 'Student registered successfully',
        status: 'success',
        duration: 3000,
      });
      
      setStudentName('');
      setRollNumber('');
      setStudentWallet('');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  const markAttendance = async (roll, isPresent) => {
    if (!roll || !selectedSubject) {
      toast({
        title: 'Error',
        description: 'Please select subject and roll number',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      
      const date = new Date().toISOString().split('T')[0];
      const tx = await contract.markAttendance(roll, date, selectedSubject, isPresent);
      await tx.wait();
      
      toast({
        title: 'Success',
        description: `Marked ${isPresent ? 'present' : 'absent'} for ${selectedSubject}`,
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <Box width="100%" maxW="1200px">
      <VStack spacing={8}>
        <LiveClock />
        
        <Grid templateColumns="repeat(2, 1fr)" gap={8} width="100%">
          <GridItem>
            <TimeTable />
          </GridItem>
          <GridItem>
            <StudentList students={students} />
          </GridItem>
        </Grid>

        <Grid templateColumns="repeat(2, 1fr)" gap={8} width="100%">
          {/* Register Student */}
          <GridItem>
            <Box p={6} borderWidth={1} borderRadius="lg">
              <VStack spacing={4}>
                <Input
                  placeholder="Student Name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />
                <Input
                  placeholder="Roll Number"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                />
                <Input
                  placeholder="Student Wallet Address"
                  value={studentWallet}
                  onChange={(e) => setStudentWallet(e.target.value)}
                />
                <Button colorScheme="green" onClick={registerStudent} width="full">
                  Register Student
                </Button>
              </VStack>
            </Box>
          </GridItem>

          {/* Mark Attendance */}
          <GridItem>
            <Box p={6} borderWidth={1} borderRadius="lg">
              <VStack spacing={4}>
                <Select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  placeholder="Select subject"
                >
                  <option value="Math">Math</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="English">English</option>
                  <option value="Computer Science">Computer Science</option>
                </Select>
                <Input
                  placeholder="Roll Number"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                />
                <HStack width="full">
                  <Button
                    colorScheme="green"
                    onClick={() => markAttendance(rollNumber, true)}
                    flex={1}
                  >
                    Present
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => markAttendance(rollNumber, false)}
                    flex={1}
                  >
                    Absent
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </GridItem>
        </Grid>
      </VStack>
    </Box>
  );
};