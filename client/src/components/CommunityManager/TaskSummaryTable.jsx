import { CheckIcon, DeleteIcon, NotAllowedIcon } from '@chakra-ui/icons';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Progress,
  Box,
} from '@chakra-ui/react';

function TaskSummaryTable() {
  return (
    <>
      <Box
        direction={{ base: 'column', sm: 'row' }}
        overflow="hidden"
        variant="elevated"
        p={[2, 2]}
        borderRadius="20"
        align="center"
        boxShadow="0px 4px 6px rgba(0, 0, 0, 0.3)"
      >
        <Table variant="striped" colorScheme="blackAlpha">
      
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Status</Th>
              <Th>Date</Th>
              <Th>Progress</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>New Survey</Td>
              <Td> <CheckIcon color={"#ffffff"} bg={"#1ce007"} borderRadius={20} /> Approved</Td>
              <Td> 21 Apr 2023</Td>
              <Td><Progress value={40} size='xs' colorScheme='blue' /></Td>
            </Tr>
            <Tr>
            <Td>New Survey</Td>
              <Td> <NotAllowedIcon color={"#ffffff"} bg={"#f02711"} borderRadius={15}/> Disable</Td>
              <Td> 21 Apr 2023</Td>
              <Td><Progress value={60} size='xs' colorScheme='blue' /></Td>
            </Tr>
            <Tr>
            <Td>New Survey</Td>
              <Td> <DeleteIcon color={"#ffffff"} bg={"#d8f500"} borderRadius={15}/> Error</Td>
              <Td> 21 Apr 2023</Td>
              <Td><Progress value={20} size='xs' colorScheme='blue' /></Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
            <Td>New Survey</Td>
              <Td> <CheckIcon color={"#ffffff"} bg={"#1ce007"} borderRadius={20} /> Approved</Td>
              <Td> 21 Apr 2023</Td>
              <Td><Progress value={90} size='xs' colorScheme='blue' /></Td>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
    </>
  );
}

export default TaskSummaryTable;
