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
  const [communityManagers, setCommunityManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null); // State for the selected manager
  const [isOpen, setIsOpen] = useState(false);

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

  const deleteManager = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/auth/deletemember/${id}`);
      console.log("Manager deleted successfully");
      // Update the state to reflect the changes
      setCommunityManagers((prevcommunityManagers) => prevcommunityManagers.filter((communityManager) => communityManager._id !== id));
    } catch (error) {
      console.error("Error deleting manager:", error);
      // Handle error here if necessary
    }
  };

  const getTotalCommunityManagers = () => {
    return communityManagers.length;
  };

const comEditPopup = (manager) => {
    setSelectedManager(manager); // Set the selected manager when edit button is clicked
    setIsOpen(true);
  };

  const closePopup = () => {
    setSelectedManager(null); // Reset the selected manager when the popup is closed
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
                  <Table variant="simple">
                    <TableCaption>
                      Imperial to metric conversion factors
                    </TableCaption>
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
                  <Table variant="simple">
                    <TableCaption>
                      Imperial to metric conversion factors
                    </TableCaption>
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

        {/* community managers table */}

        <Flex>
          <Stack width={'100%'}>
            <Card borderRadius={'20px'} width={'100%'}>
              <CardHeader>
                <Heading size={'md'}>Community Managers</Heading>
              </CardHeader>
              <hr />
              <CardBody>
                <TableContainer>
                  <Table variant="simple">
                  <TableCaption>Total Community Managers: {getTotalCommunityManagers()}</TableCaption>
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
                                colorScheme="teal"
                                aria-label="Edit"
                                size="md"
                                icon={<EditIcon />}
                                onClick={() => comEditPopup(manager._id)}
                              />
                              <IconButton
                                colorScheme="teal"
                                aria-label="Delete"
                                size="md"
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
          <Heading size={'md'}>Update Details</Heading>
          <IconButton
            colorScheme="teal"
            aria-label="Call Segun"
            size="md"
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
          <VStack spacing={3} align="stretch" width={'100%'} my={'20px'}>
            <FormField label="First Name">
              <Input
                type="text"
                name="firstName"
                value={`${selectedManager.ManagerFirstName || ''}`
                 }
                />
            </FormField>
            <FormField label="Last Name">
              <Input
                type="text"
                name="lastName"
                value={selectedManager.ManagerLastName}
              />
            </FormField>
            <FormField label="Address">
              <Input
                type="text"
                placeholder="Line 1"
                name="addLine1"
                value={selectedManager.ManagerAddLine1}
              />
              <Input
                type="text"
                placeholder="Line 2"
                name="addLine2"
                value={selectedManager.ManagerAddLine2}
              />
            </FormField>
            <FormField label="District">
              <Input type="text" name="district" value={selectedManager.ManagerDistrict} />
            </FormField>
            <FormField label="Email">
              <Input type="email" name="email" value={selectedManager.ManagerEmail} />
            </FormField>
            <FormField label="Phone">
              <Input type="tel" name="phone" value={selectedManager.ManagerPhone} />
            </FormField>
            <FormField label="NIC">
              <Input type="text" name="nic" value={selectedManager.ManagerNic
            } />
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
  );
};

export default AdminTables;
