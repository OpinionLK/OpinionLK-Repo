import {
    Flex,
    Stack,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Heading,
} from '@chakra-ui/react';

import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'


const CouponRequests = () => {

    return (
        <>
          <Flex>
            <Stack width={'100%'}>
              <Card borderRadius={'20px'} width={'100%'}>
                <CardHeader>
                  <Heading size={'md'}>Coupon Requests</Heading>
                </CardHeader>
                <hr></hr>
                <CardBody>

                  <Flex mb={'5px'} display={'flex'} flexDirection={'column'} gap={2}> 
                    <TableContainer>
                        <Table variant='simple'>
                            <TableCaption>Imperial to metric conversion factors</TableCaption>
                            <Thead>
                            <Tr>
                                <Th>To convert</Th>
                                <Th>into</Th>
                                <Th isNumeric>multiply by</Th>
                            </Tr>
                            </Thead>
                            <Tbody>
                            <Tr>
                                <Td>inches</Td>
                                <Td>millimetres (mm)</Td>
                                <Td isNumeric>25.4</Td>
                            </Tr>
                            <Tr>
                                <Td>feet</Td>
                                <Td>centimetres (cm)</Td>
                                <Td isNumeric>30.48</Td>
                            </Tr>
                            <Tr>
                                <Td>yards</Td>
                                <Td>metres (m)</Td>
                                <Td isNumeric>0.91444</Td>
                            </Tr>
                            </Tbody>
                            <Tfoot>
                            <Tr>
                                <Th>To convert</Th>
                                <Th>into</Th>
                                <Th isNumeric>multiply by</Th>
                            </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>

                  </Flex>

                </CardBody>
                <CardFooter>

                </CardFooter>
              </Card>
            </Stack>
          </Flex>
        </>
    );
};

export default CouponRequests;