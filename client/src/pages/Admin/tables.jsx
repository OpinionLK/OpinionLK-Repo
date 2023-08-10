import { 
    Flex, 
    Heading, 
    Stack,
    Text,
    Card,
    CardHeader,
    CardBody,
    Grid,
    Progress,
 } from '@chakra-ui/react'
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
import React from 'react'

const AdminTables = () => {

    const md = 'md';
    return (
        <>
            <Grid templateColumns="repeat(1, 1fr)" gap={6} mt={'-10px'}>
                <Flex>
                    <Stack width={'100%'}>
                        <Card borderRadius={'20px'} width={'100%'}>
                            <CardHeader>
                                <Heading size={md}>User Management</Heading>
                            </CardHeader>
                            <hr></hr>   
                            <CardBody>
                            <TableContainer>
                                <Table variant='simple'>
                                    <TableCaption>Imperial to metric conversion factors</TableCaption>
                                    <Thead>
                                    <Tr>
                                        <Th>Survey</Th>
                                        <Th>Per Survey</Th>
                                        <Th>Demography</Th>
                                        <Th>Organization</Th>
                                        <Th>Package</Th>
                                        <Th>Type</Th>
                                        <Th>Start Date</Th>
                                        <Th>End Date</Th>
                                        <Th>Progress</Th>
                                    </Tr>
                                    </Thead>
                                    <Tbody>
                                    <Tr>
                                        <Td>inches</Td>
                                        <Th>Per Survey</Th>
                                        <Th>Demography</Th>
                                        <Th>Organization</Th>
                                        <Th>Package</Th>
                                        <Th>Type</Th>
                                        <Th>Start Date</Th>
                                        <Th>End Date</Th>
                                        <Th>Progress</Th>
                                    </Tr>
                                    </Tbody>
                                </Table>
                                </TableContainer>
                            </CardBody>
                        </Card>
                    </Stack>
                </Flex>
            </Grid>
        
            <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={'20px'}>
                <Flex>
                    <Stack width={'100%'}>
                        <Card borderRadius={'20px'} width={'100%'}>
                            <CardHeader>
                                <Heading size={md}>User Management</Heading>
                            </CardHeader>
                            <hr></hr>
                            <CardBody>
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
                            </CardBody>
                        </Card>
                    </Stack>
                </Flex>
                <Flex>
                    <Stack width={'100%'}>
                        <Card borderRadius={'20px'} width={'100%'}>
                            <CardHeader>
                                <Heading size={md}>Survey Management</Heading>
                            </CardHeader>
                            <hr></hr>
                            <CardBody>
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
                            </CardBody>
                        </Card>
                    </Stack>
                </Flex>
            </Grid>
        </>
    )
}

export default AdminTables