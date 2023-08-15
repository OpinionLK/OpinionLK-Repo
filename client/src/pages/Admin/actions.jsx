import { 
    Flex, 
    Heading, 
    Stack,
    Text,
    Card,
    CardHeader,
    CardBody,
    Grid,
    HStack,
    Button,
    IconButton,
    FormLabel,
    FormControl,
    Input,
    VStack,
    FormField,
 } from '@chakra-ui/react';

import React, { useEffect, useState } from "react";
import {PhoneIcon, CloseIcon, } from "@chakra-ui/icons";
import Modal from 'react-modal';
import axios from "axios";

const AdminActions = () => {    
    useEffect(() => {
        axios.get("http://localhost:3002/api/auth/getmembers").then((response) => {
            console.log(response.data);
        });
    }, []);

    const handleSubmit = async (event) => {
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
        if (ManagerPhone.length === 10) {
            alert('Phone number should contain 10 numbers');
            return;
        }

        const ManagerNic = event.target.elements.ManagerNic.value;
        const numericNicRegex = /^[0-9]{9}(v|V)?$/;
        if (!numericNicRegex.test(ManagerNic) || (ManagerNic.length !== 10 && ManagerNic.length !== 12)) {
            alert('NIC should be 9 characters long with all numeric characters, and it can optionally contain the letter "v"');
            return;
          }
        
        
        try {
            await axios.post("http://localhost:3002/api/auth/savemember", {
                ManagerFirstName,
                ManagerLastName,
                ManagerDistrict,
                ManagerAddLine1,
                ManagerAddLine2,
                ManagerEmail,
                ManagerPhone,
                ManagerNic
            });
             console.log('User created successfully');

        } catch (error) {
            console.error("Error adding manager:", error);
            // Handle error here if necessary
        }
    };

    const [isOpen, setIsOpen] = useState(false);
    const openPopup = () => {
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

    return (
        <>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <Flex>
                    <Stack width={'100%'}>
                        <Card borderRadius={'20px'} width={'100%'}>
                            <CardHeader>
                                <Heading size={'md'}>User Management</Heading>
                            </CardHeader>
                            <hr></hr>
                            <CardBody>
                                    <Flex mb={'5px'}>
                                    <Grid templateColumns="repeat(2, 1fr)" gap={6} width={'100%'}>
                                        <Heading size={'sm'} fontWeight={'medium'} alignSelf={'center'}>Community Managers</Heading>
                                        <HStack gap={'12px'}>
                                            <Button onClick={openPopup} colorScheme="green" height={'30px'} width={'90px'} borderRadius={'5px'} bg={'green.500'}>Add</Button>
                                            <Button colorScheme="purple" height={'30px'} width={'90px'} borderRadius={'5px'} bg={'purple.500'}>Search</Button>
                                            <Button colorScheme="blue" height={'30px'} width={'90px'} borderRadius={'5px'} bg={'blue.700'}>Lock</Button>
                                            <Button colorScheme="red" height={'30px'} width={'90px'} borderRadius={'5px'} bg={'red.500'}>Delete</Button>
                                        </HStack>
                                        </Grid>
                                    </Flex>
                                    <hr></hr>
                                    <Flex my={'5px'}>
                                    <Grid templateColumns="repeat(2, 1fr)" gap={6} width={'100%'}>
                                        <Heading size={'sm'} fontWeight={'medium'} alignSelf={'center'}>Clients</Heading>
                                        <HStack gap={'12px'} justifyContent ={'end'}>
                                            <Button colorScheme="purple" height={'30px'} width={'90px'} borderRadius={'5px'} bg={'purple.500'}>Search</Button>
                                            <Button colorScheme="blue" height={'30px'} width={'90px'} borderRadius={'5px'} bg={'blue.700'}>Lock</Button>
                                            <Button colorScheme="red" height={'30px'} width={'90px'} borderRadius={'5px'} bg={'red.500'}>Delete</Button>
                                        </HStack>
                                        </Grid>
                                    </Flex>
                                    <hr></hr>
                                    <Flex my={'5px'}>
                                    <Grid templateColumns="repeat(2, 1fr)" gap={6} width={'100%'}>
                                        <Heading size={'sm'} fontWeight={'medium'} alignSelf={'center'}>Customers</Heading>
                                        <HStack gap={'12px'} justifyContent ={'end'}>
                                            <Button colorScheme="purple" height={'30px'} width={'90px'} borderRadius={'5px'} bg={'purple.500'}>Search</Button>
                                            <Button colorScheme="blue" height={'30px'} width={'90px'} borderRadius={'5px'} bg={'blue.700'}>Lock</Button>
                                            <Button colorScheme="red" height={'30px'} width={'90px'} borderRadius={'5px'} bg={'red.500'}>Delete</Button>
                                        </HStack>
                                        </Grid>
                                    </Flex>
                            </CardBody>
                        </Card>
                    </Stack>
                </Flex>
            </Grid>

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
                                colorScheme='gray'
                                aria-label='Call Segun'
                                size='md'
                                icon={<CloseIcon color={'#4318FF'}/>}
                                onClick={closePopup}
                                />
                                </HStack>
                            <hr></hr>
                            <Flex mb={'5px'} flexDirection={'column'} justifyContent={'flex-start'} alignItems={'flex-end'}>
                            <VStack spacing={3} align="stretch" width={'100%'} my={'20px'}>
                                <FormField label="First Name" >

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
                                <FormField label="Address" >
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
                                <Button name='submit' align={'right'} width={'100px'} colorScheme="green" type='Submit'>Add</Button> 
                                <Button name='cancel' align={'right'} width={'100px'} colorScheme="red" type='cancel' onClick={closePopup}>Cancel</Button>

                            </Flex>
                            </Flex>
                        </form>
                    </Stack>
                </Flex>
            </Modal>


            </>
    )
}

export default AdminActions