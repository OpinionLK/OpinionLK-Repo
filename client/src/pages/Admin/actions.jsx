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
 } from '@chakra-ui/react'
import React, { useState } from 'react'
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
                                            <Button onClick={openPopup} colorScheme="green" height={'30px'} width={'90px'} borderRadius={'10px'} bg={'green.500'}>Add</Button>
                                            <Button colorScheme="purple" height={'30px'} width={'90px'} borderRadius={'10px'} bg={'purple.500'}>Search</Button>
                                            <Button colorScheme="blue" height={'30px'} width={'90px'} borderRadius={'10px'} bg={'blue.700'}>Lock</Button>
                                            <Button colorScheme="red" height={'30px'} width={'90px'} borderRadius={'10px'} bg={'red.500'}>Delete</Button>
                                        </HStack>
                                        </Grid>
                                    </Flex>
                                    <hr></hr>
                                    <Flex my={'5px'}>
                                    <Grid templateColumns="repeat(2, 1fr)" gap={6} width={'100%'}>
                                        <Heading size={'sm'} alignSelf={'center'}>Clients</Heading>
                                        <HStack gap={'12px'} justifyContent ={'end'}>
                                            <Button colorScheme="purple" height={'30px'} width={'90px'} borderRadius={'10px'} bg={'purple.500'}>Search</Button>
                                            <Button colorScheme="blue" height={'30px'} width={'90px'} borderRadius={'10px'} bg={'blue.700'}>Lock</Button>
                                            <Button colorScheme="red" height={'30px'} width={'90px'} borderRadius={'10px'} bg={'red.500'}>Delete</Button>
                                        </HStack>
                                        </Grid>
                                    </Flex>
                                    <hr></hr>
                                    <Flex my={'5px'}>
                                    <Grid templateColumns="repeat(2, 1fr)" gap={6} width={'100%'}>
                                        <Heading size={'sm'} alignSelf={'center'}>Customers</Heading>
                                        <HStack gap={'12px'} justifyContent ={'end'}>
                                            <Button colorScheme="purple" height={'30px'} width={'90px'} borderRadius={'10px'} bg={'purple.500'}>Search</Button>
                                            <Button colorScheme="blue" height={'30px'} width={'90px'} borderRadius={'10px'} bg={'blue.700'}>Lock</Button>
                                            <Button colorScheme="red" height={'30px'} width={'90px'} borderRadius={'10px'} bg={'red.500'}>Delete</Button>
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
                        height: '500px',
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
                        <Card borderRadius={'20px'} width={'100%'}>
                            <CardHeader>
                                <Heading size={'md'}>Add Community Manager</Heading>
                            </CardHeader>
                            <hr></hr>
                            <CardBody>
                                <Flex mb={'5px'}>
                                    <Grid templateColumns="repeat(2, 1fr)" gap={6} width={'100%'}>
                                        <Heading size={'sm'} alignSelf={'center'}>Community Managers</Heading>
                                        <HStack gap={'12px'}>
                                                
                                        </HStack>
                                    </Grid>
                                </Flex>
                                </CardBody>
                        </Card>
                    </Stack>
                </Flex>
            </Modal>


            </>
    )
}

export default AdminActions