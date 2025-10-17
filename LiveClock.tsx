import { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';

export const LiveClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box p={4} bg="blue.50" borderRadius="lg" width="100%">
      <Text fontSize="xl" fontWeight="bold">
        {time.toLocaleDateString()} {time.toLocaleTimeString()}
      </Text>
    </Box>
  );
};