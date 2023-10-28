import React from "react";
import { useState } from "react";

import {
    Flex,
    Stack,
    Heading,
    Button,
    IconButton,
    HStack,
    Input,
    FormControl,
    FormLabel,
    VStack,
    Box,
    } from '@chakra-ui/react';
    import Modal from 'react-modal';
    import axios from 'axios';


const AddComManager = () => {
// eslint-disable-next-line
    const [isSuccess, setIsSuccess] = useState(false);
    
    const CloseIcon = () => (
        <svg
            width="24"
            viewBox="0 0 18 18"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
        >
            <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 7.58579L14.2929 2.29289L15.7071 3.70711L10.4142 9L15.7071 14.2929L14.2929 15.7071L9 10.4142L3.70711 15.7071L2.29289 14.2929L7.58579 9L2.29289 3.70711L3.70711 2.29289L9 7.58579Z"
            />
        </svg>
    );

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

        const [isOpen, setIsOpen] = useState(false);
        const openPopup = () => {
          setIsOpen(true);
        };

        const closePopup = () => {
            setIsOpen(false);
            }
        
            const handleSubmit = async event => {
                event.preventDefault();
            
                const ManagerFirstName = event.target.elements.ManagerFirstName.value;
                if (ManagerFirstName.length < 3) {
                  alert('First name should be at least 3 characters long');
                  return;
                }
            
                const ManagerLastName = event.target.elements.ManagerLastName.value;
                if (ManagerLastName.length < 3) {
                  alert('Last name should be at least 3 characters long');
                  return;
                }
            
                const ManagerDistrict = event.target.elements.ManagerDistrict.value;
                if (ManagerDistrict.length < 3) {
                  alert('District name should be at least 3 characters long');
                  return;
                }
            
                const ManagerAddLine1 = event.target.elements.ManagerAddLine1.value;
                if (ManagerAddLine1.length < 3) {
                  alert('Address line 1 should be at least 3 characters long');
                  return;
                }
            
                const ManagerAddLine2 = event.target.elements.ManagerAddLine2.value;
                if (ManagerAddLine2.length < 3) {
                  alert('Address line 2 should be at least 3 characters long');
                  return;
                }
            
            
                const ManagerEmail = event.target.elements.ManagerEmail.value;
                if (ManagerEmail.length < 3 && ManagerEmail.includes('@')) {
                  alert('Email should be at least 3 characters long and should contain @');
                  return;
                }
            
                const ManagerPhone = event.target.elements.ManagerPhone.value;
                if (!ManagerPhone.length === 10) {
                  alert('Phone number should contain 10 numbers');
                  return;
                }
            
                const ManagerNic = event.target.elements.ManagerNic.value;
                const nicValidation = /^[0-9]{9}(v|V)?$/;
                const nicValidation12 = /^[0-9]{12}$/;
            
                if (!nicValidation.test(ManagerNic) && !nicValidation12.test(ManagerNic)) {
                  alert('Please enter a valid NIC');
                  return;
                }
            
                if (ManagerNic.length !== 10 && ManagerNic.length !== 12) {
                  alert('Please enter a valid NIC');
                  return;
                }
            
                try {
                  await axios.post('http://localhost:3002/api/auth/savemember', {
                    ManagerFirstName,
                    ManagerLastName,
                    ManagerDistrict,
                    ManagerAddLine1,
                    ManagerAddLine2,
                    ManagerEmail,
                    ManagerPhone,
                    ManagerNic,
                  });
                  console.log('User created successfully');
                  setIsSuccess(true);
                  closePopup(true);
                } catch (error) {
                  console.error('Error adding manager:', error);
                  // Handle error here if necessary
                }
              };

      return (
        <>
        <Box display={'flex'} flexDirection={'row'} w={'100%'} justifyContent={'space-between'}>
            <Box>
            <Heading size={'sm'} fontWeight={'medium'}>Community Managers</Heading>
            </Box>
            <Box>
            <HStack gap={'12px'} justifyItems={'flex-end'}>
                <Button
                    onClick={openPopup}
                    colorScheme="green"
                    height={'30px'}
                    width={'90px'}
                    borderRadius={'5px'}
                    bg={'green.500'}
                >
                    Add
                </Button>
                <Button
                    colorScheme="purple"
                    height={'30px'}
                    width={'90px'}
                    borderRadius={'5px'}
                    bg={'purple.500'}
                >
                    View
                </Button>
                </HStack>
            </Box>
        </Box>

        <Modal
          isOpen={isOpen}
          // onRequestClose={closePopup}
          contentLabel="Com Manager add Modal"
          ariaHideApp={false}
          style={{
            overlay: {
              zIndex: '1000',
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
              <form onSubmit={handleSubmit}>
                <HStack justifyContent={'space-between'} mb={'20px'}>
                  <Heading size={'md'}>Add Community Manager</Heading>
                  <IconButton
                    colorScheme="gray"
                    aria-label="Call Segun"
                    size="md"
                    icon={<CloseIcon color={'#4318FF'} />}
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
                  <VStack spacing={3} align="stretch" width={'100%'} my={'20px'}>
                    <FormField label="First Name">
                      <Input
                        type="text"
                        placeholder="ManagerFirstName"
                        name="ManagerFirstName"
                        required
                      />
                    </FormField>
                    <FormField label="Last Name">
                      <Input
                        type="text"
                        placeholder="ManagerLastName"
                        name="ManagerLastName"
                        required
                      />
                    </FormField>
                    <FormField label="Address">
                      <Input
                        type="text"
                        placeholder="ManagerAddLine1"
                        name="ManagerAddLine1"
                        required
                      />
                      <Input
                        type="text"
                        placeholder="ManagerAddLine2"
                        name="ManagerAddLine2"
                        required
                      />
                    </FormField>
                    <FormField label="District">
                      <Input
                        type="text"
                        placeholder="ManagerDistrict"
                        name="ManagerDistrict"
                        required
                      />
                    </FormField>
                    <FormField label="Email">
                      <Input
                        type="email"
                        placeholder="Manager Email"
                        name="ManagerEmail"
                        required
                      />
                    </FormField>
                    <FormField label="Phone">
                      <Input
                        type="number"
                        placeholder="Manager Phone"
                        name="ManagerPhone"
                        required
                      />
                    </FormField>
                    <FormField label="NIC">
                      <Input
                        type="text"
                        placeholder="Manager NIC"
                        name="ManagerNic"
                        required
                      />
                    </FormField>
                  </VStack>
                  {/*submit button*/}
                  <Flex justifyContent={'flex-end'} width={'100%'} gap={'10px'}>
                    <Button
                      name="submit"
                      align={'right'}
                      width={'100px'}
                      colorScheme="green"
                      type="Submit"
                    >
                      Add
                    </Button>
                    <Button
                      name="cancel"
                      align={'right'}
                      width={'100px'}
                      colorScheme="red"
                      type="cancel"
                      onClick={closePopup}
                    >
                      Cancel
                    </Button>
                  </Flex>
                </Flex>
              </form>
            </Stack>
          </Flex>
        </Modal>
        </>
      );
        
}

export default AddComManager;