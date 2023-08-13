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
import React, { useState } from 'react';
import {PhoneIcon, CloseIcon, } from "@chakra-ui/icons";
import Modal from 'react-modal';


const AdminActions = () => {

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
                                        <Heading size={'sm'} alignSelf={'center'}>Community Managers</Heading>
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
                                        <Heading size={'sm'} alignSelf={'center'}>Clients</Heading>
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
                                        <Heading size={'sm'} alignSelf={'center'}>Customers</Heading>
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
                            <Flex justifyContent={'flex-end'} width={'100%'} gap={'10px'}>
                                <Button name='cancel' align={'right'} width={'100px'} colorScheme="red" type='submit' onClick={closePopup}>Cancel</Button>
                                <Button name='submit' align={'right'} width={'100px'} colorScheme="green" type='submit'>Add</Button> 
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