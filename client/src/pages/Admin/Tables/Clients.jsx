import {
    Box,
    Card,
    CardBody,
    CardHeader,
    HStack,
    TableContainer,
} from '@chakra-ui/react'
import {
    Grid,
    Flex,
    Stack,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Heading,
    Input,
    IconButton,
} from '@chakra-ui/react';
// import Modal from 'react-modal';
import { EditIcon, DeleteIcon, CloseIcon , ViewIcon} from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ClientManager = () => {

    const [filterText, setFilterText] = useState('');
    const [Clients, setClients] = useState([]);
    
    const fetchClients = async () => {
        try {
            const res = await axios.get('http://localhost:3002/api/admin/allClients');
            const data = res.data;
            setClients(data.clients);
            console.log('Clients: ',data);
        }
        catch (err) {
            console.error('Error fetching Clients:', err);
        }
    }

    useEffect(() => {
        fetchClients();
    }, []);

    const getTotalClients = () => {
        return Clients.length;
    }

  const md = 'md';

    return (
        <>
        <Box>
        <Grid templateColumns="repeat(1, 1fr)">
            <Flex>
            <Stack width={'100%'}>
                <Card borderRadius={'20px'} width={'100%'}>
                <CardHeader  display={'flex'} flexDirection={'row'}>
                    <Heading color={'purple.900'}  size={md}>Clients</Heading>
                    <Box>
                      <Input
                        type='search'
                        placeholder = 'Search by Name or Email...'
                        fontSize={'14px'}
                        width={'250px'}
                        ml={'20px'}
                        px={2}
                        py={1}
                        height={'30px'}
                        borderRadius={'8px'}
                        onChange={(e) => setFilterText(e.target.value)}
                        value ={filterText}/>
                    </Box>
                    <Box 
                      colorScheme={'purple'} 
                      ml={'auto'} 
                      size={'sm'}
                      bg={'purple.400'}
                      fontSize={'14px'}
                      fontWeight={'bold'}
                      color={'whiteAlpha.900'}
                      borderRadius={5}
                      p={2}
                    >
                      Total Clients: {getTotalClients()}
                    </Box>
                </CardHeader>
                <hr></hr>
                <CardBody>
                    <TableContainer>
                    <Table variant="striped" colorScheme='gray' size={'sm'} >
                        <TableCaption>
                            Total Users: {getTotalClients()}
                        </TableCaption>
                        <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Points</Th>
                            <Th>Date Joined</Th>
                            <Th>Actions</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                            {Clients.map((Client) => (
                                <Tr key={Client._id}>
                                    <Td>{Client.firstName} {Client.lastName}</Td>
                                    <Td>{Client.email}</Td>
                                    <Td>{Client.points}</Td>
                                    <Td>{Client.createdAt}</Td>
                                    <Td>
                                        <HStack>
                                        <IconButton                                                 colorScheme="purple"
                                            aria-label="Edit"
                                            icon={<ViewIcon />}
                                            size={'sm'}
                                        />
                                        <IconButton                                                 colorScheme="red"
                                            aria-label="Delete"
                                            icon={<DeleteIcon />}
                                            size={'sm'}
                                        />
                                        </HStack>
                                    </Td>
                                </Tr>
                            ))
                            }
                        </Tbody>
                    </Table>
                    </TableContainer>
                </CardBody>
                </Card>
            </Stack>
            </Flex>
        </Grid>
        </Box>
    </>
    )
}

export default ClientManager