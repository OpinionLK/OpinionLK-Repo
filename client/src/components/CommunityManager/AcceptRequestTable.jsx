import { CheckIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  CheckCircleIcon,
} from '@chakra-ui/react';



function AcceptRequestTable() {
  return (
    <>
      <Table variant="simple" colorScheme="purple">
        <Thead>
          <Tr textColor={'#899dad'}>
            <Th>Name</Th>
            <Th>Organization</Th>
            <Th>Error Catergory</Th>
            <Th>Date</Th>
            <Th>Status </Th>
          </Tr>
        </Thead>
        <Tbody textColor={'#6874f2'}>
          <Tr>
            <Td>Nipuna Dakshina</Td>
            <Td>Bug zero</Td>
            <Td>Verification issue</Td>
            <Td>2023-08-09</Td>
            <Td>
              Approved <CheckIcon color={"#ffffff"} bg={"#1ce007"} borderRadius={20}/>
            </Td>
          </Tr>
          <Tr>
            <Td>Kive Amaraweera</Td>
            <Td>sysco Lab</Td>
            <Td>Invalid Data</Td>
            <Td>2023-08-10</Td>
            <Td>
              Approved <CheckIcon color={"#ffffff"} bg={"#1ce007"} borderRadius={20} />
            </Td>
          </Tr>
          <Tr>
            <Td>Nisura Indidrashapa</Td>
            <Td>WSO 2</Td>
            <Td>Location Issue</Td>
            <Td>2023-08-09</Td>
            <Td>
              Rejected <DeleteIcon  color={"#ffffff"} bg={"#f02711"} borderRadius={15} />
            </Td>
          </Tr>
          <Tr>
            <Td>Rashmi Abegunawardhitha</Td>
            <Td>Vertusa</Td>
            <Td>Verification issue</Td>
            <Td>2023-08-09</Td>
            <Td>
              Approved <CheckIcon color={"#ffffff"} bg={"#1ce007"} borderRadius={20} />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
}

export default AcceptRequestTable;
