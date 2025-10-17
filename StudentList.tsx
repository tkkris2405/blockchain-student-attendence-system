import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';

export const StudentList = ({ students }) => {
  return (
    <Box p={4} borderWidth={1} borderRadius="lg" width="100%">
      <Text fontSize="xl" fontWeight="bold" mb={4}>Registered Students</Text>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Roll Number</Th>
            <Th>Name</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students.map((student) => (
            <Tr key={student.rollNumber}>
              <Td>{student.rollNumber}</Td>
              <Td>{student.name}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};