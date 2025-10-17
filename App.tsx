import { useState } from 'react';
import { ChakraProvider, Box, VStack } from '@chakra-ui/react';
import { AdminLogin } from './components/AdminLogin';
import { AttendanceSystem } from './components/AttendanceSystem';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ChakraProvider>
      <Box p={4}>
        <VStack spacing={8}>
          {!isLoggedIn ? (
            <AdminLogin onLogin={() => setIsLoggedIn(true)} />
          ) : (
            <AttendanceSystem />
          )}
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;