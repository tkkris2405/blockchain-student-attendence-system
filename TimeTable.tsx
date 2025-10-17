import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';

const TIMETABLE = {
  Monday: ['Math', 'Physics', 'Chemistry'],
  Tuesday: ['English', 'Computer Science', 'Math'],
  Wednesday: ['Physics', 'English', 'Computer Science'],
  Thursday: ['Chemistry', 'Math', 'Physics'],
  Friday: ['Computer Science', 'Chemistry', 'English']
};

export const TimeTable = () => {
  return (
    <Box p={4} borderWidth={1} borderRadius="lg" width="100%">
      <Text fontSize="xl" fontWeight="bold" mb={4}>Weekly Timetable</Text>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Day</Th>
            <Th>9:00 AM</Th>
            <Th>11:00 AM</Th>
            <Th>2:00 PM</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.entries(TIMETABLE).map(([day, subjects]) => (
            <Tr key={day}>
              <Td fontWeight="bold">{day}</Td>
              {subjects.map((subject, i) => (
                <Td key={i}>{subject}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};