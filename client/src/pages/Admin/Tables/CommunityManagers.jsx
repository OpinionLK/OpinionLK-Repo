import {
    Box,
    Card,
    CardBody,
    CardHeader,
    TableContainer,
    Input,
    Button,
    VStack,
    FormControl,
    FormLabel,
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
    IconButton,
    HStack,
    Heading,
} from '@chakra-ui/react';
import Modal from 'react-modal';
import { EditIcon, DeleteIcon, CloseIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CommunityManagers = () => {

  //Fetch Community Managers Data
    useEffect(() => {
        fetchCommunityManagers();
      }, []);
    const fetchCommunityManagers = async () => {
        try {
          const response = await axios.get(
            'http://localhost:3002/api/auth/getmembers'
          );
          const data = response.data;
          setCommunityManagers(data);
        } catch (error) {
          console.error('Error fetching community managers:', error);
        }
      };

    //Get Total Community Managers
    const getTotalCommunityManagers = () => {
        return communityManagers.length;
    };
    

    //Edit Community Managers
    const [isOpen, setIsOpen] = useState(false);
    const [selectedManager, setSelectedManager] = useState(null);
    const [editedValues, setEditedValues] = useState({});
    const openPopup = () => {
        setIsOpen(true);
    };
    const closePopup = () => {
        setIsOpen(false);
    };
    const handleEditInputChange = (key, value) => {
        setEditedValues({ ...editedValues, [key]: value });
    };
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:3002/api/auth/updatemember/${selectedManager._id}`,
                editedValues
            );
            const data = response.data;
            console.log('Updated data:', data);
            fetchCommunityManagers();
            closePopup();
        } catch (error) {
            console.error('Error updating community manager:', error);
        }
    };

    const comEditPopup = id => {
        const manager = communityManagers.find(manager => manager._id === id);
        setSelectedManager(manager);
        openPopup();
    };

    //Delete Community Managers
    const deleteManager = async id => {
        try {
            const response = await axios.delete(
                `http://localhost:3002/api/auth/deletemember/${id}`
            );
            const data = response.data;
            console.log('Deleted data:', data);
            fetchCommunityManagers();
        } catch (error) {
            console.error('Error deleting community manager:', error);
        }
    };

    //Custom Form Field Component
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

  const [communityManagers, setCommunityManagers] = useState([]);

    return (
        <>
        <Box>
        <Grid templateColumns="repeat(1, 1fr)">
        <Flex>
            <Stack width={'100%'}>
                <Card borderRadius={'20px'} width={'100%'}>
                <CardHeader>
                    <Heading color={'purple.900'} size={'md'}>Community Managers</Heading>
                </CardHeader>
                <hr />
                <CardBody>
                    <TableContainer>
                    <Table variant="simple">
                        <TableCaption>
                        Total Community Managers: {getTotalCommunityManagers()}
                        </TableCaption>
                        <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Address</Th>
                            <Th>District</Th>
                            <Th>Email</Th>
                            <Th>Phone</Th>
                            <Th>NIC</Th>
                            <Th>Actions</Th>
                        </Tr>
                        </Thead>
                        <Tbody fontSize={'sm'}>
                        {communityManagers.map(manager => (
                            <Tr key={manager._id}>
                            <Td>
                                {manager.ManagerFirstName} {manager.ManagerLastName}
                            </Td>
                            <Td>
                                {manager.ManagerAddLine1},{manager.ManagerAddLine2}
                            </Td>
                            <Td>{manager.ManagerDistrict}</Td>
                            <Td>{manager.ManagerEmail}</Td>
                            <Td>{manager.ManagerPhone}</Td>
                            <Td>{manager.ManagerNic}</Td>
                            <Td>
                                <HStack gap={'12px'}>
                                <IconButton
                                    // colorScheme="teal"
                                    bg={'purple.500'}
                                    color={'#fff'}
                                    _hover={{ bg: 'purple.400' }}
                                    aria-label="Edit"
                                    size="sm"
                                    icon={<EditIcon />}
                                    onClick={() => comEditPopup(manager._id)}
                                />
                                <IconButton
                                    // colorScheme="teal"
                                    bg={'purple.500'}
                                    color={'#fff'}
                                    _hover={{ bg: 'purple.400' }}
                                    aria-label="Delete"
                                    size="sm"
                                    icon={<DeleteIcon />}
                                    onClick={() => deleteManager(manager._id)}
                                />
                                </HStack>
                            </Td>
                            </Tr>
                        ))}
                        </Tbody>
                    </Table>
                    </TableContainer>
                </CardBody>
                </Card>
            </Stack>
            </Flex>
        </Grid>
        </Box>

        {/* COM MANAGERS EDIT POPUP */}

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
            <form onSubmit={handleSubmit} method='POST'>
              <HStack justifyContent={'space-between'} mb={'20px'}>
                <Heading size={'md'}>Update Details</Heading>
                <IconButton
                  colorScheme="purple"
                  borderRadius={'10px'}
                  // bg={'gray.200'}
                  color={'#fff'}
                  aria-label="Call Segun"
                  size="sm"
                  icon={<CloseIcon />}
                  onClick={closePopup}
                />
              </HStack>
              <hr></hr>
              <Flex
                mb={'5px'}
                flexDirection={'column'}
                justifyContent={'flex-start'}
                alignItems={'flex-end'}
              >
                {selectedManager && ( // Check if selectedManager is not null
                  <VStack
                    spacing={3}
                    align="stretch"
                    width={'100%'}
                    my={'20px'}
                  >
                    <FormField label="First Name">
                      <Input
                        type="text"
                        name="ManagerFirstName"
                        value={
                          editedValues.ManagerFirstName !== undefined
                            ? editedValues.ManagerFirstName
                            : selectedManager.ManagerFirstName
                        }
                        onChange={e =>
                          handleEditInputChange(
                            'ManagerFirstName',
                            e.target.value
                          )
                        }
                      />
                    </FormField>
                    <FormField label="Last Name">
                      <Input
                        type="text"
                        name="ManagerLastName"
                        value={
                          editedValues.ManagerLastName !== undefined
                            ? editedValues.ManagerLastName
                            : selectedManager.ManagerLastName
                        }
                        onChange={e =>
                          handleEditInputChange(
                            'ManagerLastName',
                            e.target.value
                          )
                        }
                      />
                    </FormField>
                    <FormField label="Address">
                      <Input
                        type="text"
                        placeholder="Line 1"
                        name="ManagerAddLine1"
                        value={
                          editedValues.ManagerAddLine1 !== undefined
                            ? editedValues.ManagerAddLine1
                            : selectedManager.ManagerAddLine1
                        }
                        onChange={e =>
                          handleEditInputChange(
                            'ManagerAddLine1',
                            e.target.value
                          )
                        }
                      />
                      <Input
                        type="text"
                        placeholder="Line 2"
                        name="ManagerAddLine2"
                        value={
                          editedValues.ManagerAddLine2 !== undefined
                            ? editedValues.ManagerAddLine2
                            : selectedManager.ManagerAddLine2
                        }
                        onChange={e =>
                          handleEditInputChange(
                            'ManagerAddLine2',
                            e.target.value
                          )
                        }
                      />
                    </FormField>
                    <FormField label="District">
                      <Input
                        type="text"
                        name="ManagerDistrict"
                        value={
                          editedValues.ManagerDistrict !== undefined
                            ? editedValues.ManagerDistrict
                            : selectedManager.ManagerDistrict
                        }
                        onChange={e =>
                          handleEditInputChange(
                            'ManagerDistrict',
                            e.target.value
                          )
                        }
                      />
                    </FormField>
                    <FormField label="Email">
                      <Input
                        type="email"
                        name="ManagerEmail"
                        value={
                          editedValues.ManagerEmail !== undefined
                            ? editedValues.ManagerEmail
                            : selectedManager.ManagerEmail
                        }
                        onChange={e =>
                          handleEditInputChange('ManagerEmail', e.target.value)
                        }
                      />
                    </FormField>
                    <FormField label="Phone">
                      <Input
                        type="tel"
                        name="ManagerPhone"
                        value={
                          editedValues.ManagerPhone !== undefined
                            ? editedValues.ManagerPhone
                            : selectedManager.ManagerPhone
                        }
                        onChange={e =>
                          handleEditInputChange('ManagerPhone', e.target.value)
                        }
                      />
                    </FormField>
                    <FormField label="NIC">
                      <Input
                        type="text"
                        name="ManagerNic"
                        value={
                          editedValues.ManagerNic !== undefined
                            ? editedValues.ManagerNic
                            : selectedManager.ManagerNic
                        }
                        onChange={e =>
                          handleEditInputChange('ManagerNic', e.target.value)
                        }
                      />
                    </FormField>
                  </VStack>
                )}

                {/*submit button*/}
                <Button
                  name="submit"
                  align={'right'}
                  width={'100px'}
                  colorScheme="green"
                  type="submit"
                >
                  Update
                </Button>
              </Flex>
            </form>
          </Stack>
        </Flex>
      </Modal>
    </>
    )
}

export default CommunityManagers