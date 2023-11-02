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
              <Th>Survey Type</Th>
              <Th># of Survey</Th>
              <Th># of Response</Th>
              <Th>Progress</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Product Survey</Td>
              <Td> 223</Td>
              <Td>2403</Td>
              <Td><Progress value={85} size='xs' colorScheme='blue' /></Td>
            </Tr>
            <Tr>
            <Td>Marketing Survey</Td>
              <Td>321</Td>
              <Td>768</Td>
              <Td><Progress value={60} size='xs' colorScheme='blue' /></Td>
            </Tr>
            <Tr>
            <Td>Social Survey</Td>
              <Td>75</Td>
              <Td>657</Td>
              <Td><Progress value={20} size='xs' colorScheme='blue' /></Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
            <Td>Research Survey</Td>
              <Td>32</Td>
              <Td>982</Td>
              <Td><Progress value={90} size='xs' colorScheme='blue' /></Td>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
    </>
  );
}

export default TaskSummaryTable;
