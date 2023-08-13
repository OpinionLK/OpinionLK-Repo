import {
  Flex,Heading,Stack,Text,Card,CardHeader,CardBody,Grid,Progress,HStack,
} from '@chakra-ui/react';
import {
  Table,Thead,Tbody, Tfoot,Tr,Th,Td,FormControl,FormLabel,Input,Button,VStack,TableCaption,TableContainer,IconButton,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { EditIcon, DeleteIcon, CloseIcon } from '@chakra-ui/icons';
import Modal from 'react-modal';
import axios from 'axios';

const AdminTables = () => {

    const [isOpen, setIsOpen] = useState(false);
    const comEditPopup = () => {
        console.log('Open popup');
        console.log('Is open:', isOpen);
        setIsOpen(true);
      };
      const closePopup = () => {
        setIsOpen(false);
      };

  const FormField = ({ label, children }) => {
    return (
      <FormControl display="flex" alignItems="center">
        <FormLabel marginRight="1rem" width="120px">
          {label}
        </FormLabel>
        <Flex flexDirection="column" width="100%" gap="10px">
          {children}
        </Flex>
      </FormControl>
    );
  };

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
                                <Heading size={md}>Community Managers</Heading>
                            </CardHeader>
                            <hr></hr>
                            <CardBody>
                            <TableContainer>
                                <Table variant='simple'>
                                    <TableCaption>Total Community Managers</TableCaption>
                                    <Thead>
                                    <Tr>
                                        <Th>Name</Th>
                                        <Th>Address</Th>
                                        <Th>District</Th>
                                        <Th>Email</Th>
                                        <Th>Phone</Th>
                                        <Th>NIC</Th>
                                        <Td>Actions</Td>
                                    </Tr>
                                    </Thead>
                                    <Tbody>
                                    <Tr>
                                        <Td>Example</Td>
                                        <Td>Example</Td>
                                        <Td>Example</Td>
                                        <Td>Example</Td>
                                        <Td>Example</Td>
                                        <Td>Example</Td>
                                        <Td>
                                            <HStack gap={'12px'}>
                                            <IconButton
                                                colorScheme='teal'
                                                aria-label='Call Segun'
                                                size='md'
                                                icon={<EditIcon />}
                                                onClick={comEditPopup}
                                                />
                                            <IconButton
                                                colorScheme='teal'
                                                aria-label='Call Segun'
                                                size='md'
                                                icon={<DeleteIcon />}
                                                // onClick={}
                                                />
                                            </HStack>
                                        </Td>

                                    </Tr>
                                    </Tbody>
                                </Table>
                                </TableContainer>
                            </CardBody>
                        </Card>
                    </Stack>
                </Flex>
            </Grid>

      {/* Com Manager Edit Popup */}

          <Modal
                isOpen={isOpen}
                onRequestClose={closePopup}
                contentLabel="My dialog"
                ariaHideApp={false}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    },
                    content: {
                        width: '500px',
                        height: 'max-content',
                        margin: 'auto',
                        borderRadius: '10px',
                        padding: '20px',
                        backgroundColor: '#F8FAFC',
                        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
                    },
                }}
            >
                <Flex>
                    <Stack width={'100%'}>
                        <form>
                            <HStack justifyContent={'space-between'} mb={'20px'}>
                            <Heading size={'md'}>Add Community Manager</Heading>
                            <IconButton
                                colorScheme='teal'
                                aria-label='Call Segun'
                                size='md'
                                icon={<CloseIcon />}
                                onClick={closePopup}
                                />
                                </HStack>
                            <hr></hr>
                            <Flex mb={'5px'} flexDirection={'column'} justifyContent={'flex-start'} alignItems={'flex-end'}>
                            <VStack spacing={3} align="stretch" width={'100%'} my={'20px'}>
                                <FormField label="First Name">
                                    <Input type="text" name='firstName'/>
                                </FormField>
                                <FormField label="Last Name">
                                    <Input type="text" name='lastName'/>
                                </FormField>
                                <FormField label="Address" >
                                    <Input type="text" placeholder='Line 1' name='addLine1'/>
                                    <Input type="text" placeholder='Line 2' name='addLine2'/>
                                </FormField>
                                <FormField label="District">
                                    <Input type="text" name='district'/>
                                </FormField>
                                <FormField label="Email">
                                    <Input type="email" name='email'/>
                                </FormField>
                                <FormField label="Phone">
                                    <Input type="tel" name='phone'/>
                                </FormField>
                                <FormField label="NIC">
                                    <Input type="text" name='nic'/>
                                </FormField>
                            </VStack>
                            {/*submit button*/}
                            <Button name='submit' align={'right'} width={'100px'} colorScheme="green" type='submit'>Update</Button> 
                            </Flex>
                        </form>
                    </Stack>
                </Flex>
            </Modal>
        </>
    )
}
