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
  HStack,
} from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  TableCaption,
  TableContainer,
  IconButton,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { EditIcon, DeleteIcon, CloseIcon } from '@chakra-ui/icons';
import Modal from 'react-modal';
import axios from 'axios';

const AdminTables = () => {
  const [editedValues, setEditedValues] = useState('');
  const [communityManagers, setCommunityManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null); // State for the selected manager
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchCommunityManagers();
  }, []);

  const handleEditInputChange = (field, value) => {
    // Update the edited values in the state
    setEditedValues(prevValues => ({ ...prevValues, [field]: value }));
  };

  const updateManager = async id => {
    try {
      await axios.put(
        `http://localhost:3002/api/auth/updatemember/${id}`,
        editedValues
      );
      setCommunityManagers(prevcommunityManagers =>
        prevcommunityManagers.map(communityManager => {
          if (communityManager._id === id) {
            return {
              ...communityManager,
              ManagerFirstName:
                editedValues.ManagerFirstName !== undefined
                  ? editedValues.ManagerFirstName
                  : communityManager.ManagerFirstName,
              ManagerLastName:
                editedValues.ManagerLastName !== undefined
                  ? editedValues.ManagerLastName
                  : communityManager.ManagerLastName,
              ManagerDistrict:
                editedValues.ManagerDistrict !== undefined
                  ? editedValues.ManagerDistrict
                  : communityManager.ManagerDistrict,
              ManagerAddLine1:
                editedValues.ManagerAddLine1 !== undefined
                  ? editedValues.ManagerAddLine1
                  : communityManager.ManagerAddLine1,
              ManagerAddLine2:
                editedValues.ManagerAddLine2 !== undefined
                  ? editedValues.ManagerAddLine2
                  : communityManager.ManagerAddLine2,
              ManagerEmail:
                editedValues.ManagerEmail !== undefined
                  ? editedValues.ManagerEmail
                  : communityManager.ManagerEmail,
              ManagerPhone:
                editedValues.ManagerPhone !== undefined
                  ? editedValues.ManagerPhone
                  : communityManager.ManagerPhone,
              ManagerNic:
                editedValues.ManagerNic !== undefined
                  ? editedValues.ManagerNic
                  : communityManager.ManagerNic,
            };
          }
          return communityManager;
        })
      );
      console.log('Manager updated successfully');
      // Close the modal
      setIsOpen(false);
      // Clear the edited values
      setEditedValues('');
      // Clear the selected manager
      setSelectedManager(null);
    } catch (error) {
      console.error('Error updating manager:', error);
      // Handle error here if necessary
    }
  };

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

  const deleteManager = async id => {
    try {
      await axios.delete(`http://localhost:3002/api/auth/deletemember/${id}`);
      console.log('Manager deleted successfully');
      // Update the state to reflect the changes
      setCommunityManagers(prevcommunityManagers =>
        prevcommunityManagers.filter(
          communityManager => communityManager._id !== id
        )
      );
    } catch (error) {
      console.error('Error deleting manager:', error);
      // Handle error here if necessary
    }
  };

  useEffect(() => {
    if (selectedManager) {
      setIsOpen(true);
    }
  }, [selectedManager]);

  const getTotalCommunityManagers = () => {
    return communityManagers.length;
  };

  const comEditPopup = id => {
    const manager = communityManagers.find(manager => manager._id === id);
    setSelectedManager(manager);
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

  const handleSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    console.log(selectedManager._id);
    updateManager(selectedManager._id);
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
            <form onSubmit={handleSubmit} method='POST'>
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
  );
};

export default AdminTables;
