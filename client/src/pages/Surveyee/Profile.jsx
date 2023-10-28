import React, { useState } from 'react';
import {
    Flex,
    Stack,
    useMediaQuery,
    FormControl,
    FormLabel,
    Text,
    Input,
    Image,
    Box,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from '@chakra-ui/react'
import profileImage from '../../images/profile/Profile Image.png';

function ProfileView() {


    const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const openSecondModal = () => setIsSecondModalOpen(true);
    const closeSecondModal = () => setIsSecondModalOpen(false);

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const [isInputEnabled, setInputEnabled] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    return (
        <Box>
            <Box>
                <Text fontSize='2xl' as='b' mt="2px" textAlign="center" ms="2">User Profile</Text>
            </Box>
            <Box borderRadius="md">
                <Stack width="auto" m="10" p="2" direction="row" spacing={4} >
                    <Flex
                        width={isLargerThanLG ? '100%' : '60%'}

                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Stack spacing={8} bg="#ffffff" shadow="2xl" borderRadius="12" p="2">
                            <Text fontSize='xl' as='b'>Personal Information</Text>
                            <Flex flexDirection="row">
                                <Flex display="flex-col">
                                    <Box textAlign="center" display="flex" justifyContent="center" alignItems="center">
                                        <Box display="flex-col">
                                            <Image
                                                src={selectedImage || profileImage}
                                                alt="Image description"
                                                boxSize={{ base: '100px', md: '150px', lg: '200px' }}
                                                borderRadius="full"
                                            />
                                            <Text mt="2">Jenny Emmersons</Text>
                                        </Box>

                                    </Box>
                                    {
                                        !isInputEnabled ?
                                            <></>
                                            :
                                            <Box display="flex-col" >
                                                <Box>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                    />
                                                </Box>
                                            </Box>
                                    }
                                </Flex>
                                <Flex mx="10" my="2">
                                    <form >
                                        <Flex flexDirection="row" >
                                            <Flex flexDirection="column" marginRight="1rem">
                                                <FormControl id="firstName" mx="5">
                                                    <FormLabel>First Name</FormLabel>
                                                    <Input type="text" readOnly={!isInputEnabled} />
                                                </FormControl>
                                                <FormControl id="lastName" mx="5">
                                                    <FormLabel>Last Name</FormLabel>
                                                    <Input type="text" readOnly={!isInputEnabled} />
                                                </FormControl>
                                                <FormControl id="lastName" mx="5">
                                                    <FormLabel>NIC No.</FormLabel>
                                                    <Input type="text" readOnly={!isInputEnabled} />
                                                </FormControl>
                                                <FormControl id="lastName" mx="5">
                                                    <FormLabel>Address Line 1</FormLabel>
                                                    <Input type="text" readOnly={!isInputEnabled} />
                                                </FormControl>
                                                <FormControl id="lastName" mx="5">
                                                    <FormLabel>Address Line 2</FormLabel>
                                                    <Input type="text" readOnly={!isInputEnabled} />
                                                </FormControl>
                                            </Flex>
                                            <Flex flexDirection="column" marginLeft="1rem">
                                                <FormControl id="lastName" mx="5">
                                                    <FormLabel>City</FormLabel>
                                                    <Input type="text" readOnly={!isInputEnabled} />
                                                </FormControl>
                                                <FormControl id="lastName" mx="5">
                                                    <FormLabel>Province</FormLabel>
                                                    <Input type="text" readOnly={!isInputEnabled} />
                                                </FormControl>
                                                <FormControl id="lastName" mx="5">
                                                    <FormLabel>Birthday</FormLabel>
                                                    <Input type="text" readOnly={!isInputEnabled} />
                                                </FormControl>
                                                <FormControl id="lastName" mx="5">
                                                    <FormLabel>Country</FormLabel>
                                                    <Input type="text" readOnly={!isInputEnabled} />
                                                </FormControl>
                                            </Flex>
                                        </Flex>
                                    </form>
                                </Flex>
                            </Flex>
                        </Stack>
                    </Flex>
                    <Stack display="flex" alignItems="center" justifyContent="center" width="50%">
                        {
                            !isInputEnabled ?

                                <Box>
                                    <Box bg="#fcca03" width="200px" height="50px" display="flex" justifyContent="center" alignItems="center" borderRadius="12" _hover={{ backgroundColor: '#ffffff', cursor: 'pointer', border: "1px", transition: 'background-color 0.3s ease-in-out' }}
                                        onClick={openSecondModal}
                                    >
                                        <Text>Change Password</Text>
                                    </Box>
                                </Box>
                                :
                                <></>
                        }
                        <Box>

                            {
                                !isInputEnabled ? <Box bg="#03a1fc" width="200px" height="50px" display="flex" justifyContent="center" alignItems="center" borderRadius="12" _hover={{ backgroundColor: '#ffffff', cursor: 'pointer', border: "1px", transition: 'background-color 0.3s ease-in-out' }}
                                    onClick={() => setInputEnabled(true)}
                                ><Text>Edit Profile</Text></Box> : <Box bg="#03a1fc" width="200px" height="50px" display="flex" justifyContent="center" alignItems="center" borderRadius="12" _hover={{ backgroundColor: '#ffffff', cursor: 'pointer', border: "1px", transition: 'background-color 0.3s ease-in-out' }}
                                    onClick={() => setInputEnabled(false)}
                                ><Text>Cancel</Text></Box>
                            }


                        </Box>
                        {
                            !isInputEnabled ?

                                <Box>
                                    <Box bg="#fc03ca" width="200px" height="50px" display="flex" justifyContent="center" alignItems="center" borderRadius="12" _hover={{ backgroundColor: '#ffffff', cursor: 'pointer', border: "1px", transition: 'background-color 0.3s ease-in-out' }}
                                        onClick={onOpen}
                                    >
                                        <Text>Support/Help</Text>
                                    </Box>
                                </Box>
                                :
                                <></>
                        }

                        {
                            !isInputEnabled ?
                                <></>
                                :
                                <Box >
                                    <Box bg="#29ba5e" width="200px" height="50px" display="flex" justifyContent="center" alignItems="center" borderRadius="12" _hover={{ backgroundColor: '#ffffff', cursor: 'pointer', border: "1px", transition: 'background-color 0.3s ease-in-out' }}>
                                        <Text>Save Changes</Text>
                                    </Box>
                                </Box>

                        }

                    </Stack>
                </Stack>

            </Box>
            <Box p="4">
                <Flex >
                    <Stack width="50%" bg="#ffffff" shadow="2xl" m="5" mt="0" p="2" pt="0" borderRadius="12">
                        <Box>
                            <Text fontSize='xl' as='b' >Interested Areas</Text>
                        </Box>
                        <Box>
                            <Flex flexDirection="column" mx="5" my="2">
                                <FormControl id="lastName">
                                    <FormLabel>Job Status</FormLabel>
                                    <Input type="text" />
                                </FormControl>
                                <FormControl id="lastName">
                                    <FormLabel>Occupation/Profession</FormLabel>
                                    <Input type="text" readOnly={!isInputEnabled} />
                                </FormControl>
                                <FormControl id="lastName">
                                    <FormLabel>Gender</FormLabel>
                                    <Input type="text" readOnly={!isInputEnabled} />
                                </FormControl>
                                <FormControl id="lastName">
                                    <FormLabel>Marital Status</FormLabel>
                                    <Input type="text" readOnly={!isInputEnabled} />
                                </FormControl>
                                <FormControl id="lastName">
                                    <FormLabel>Hobbies and Interests</FormLabel>
                                    <Input type="text" readOnly={!isInputEnabled} />
                                </FormControl>
                            </Flex>
                        </Box>
                    </Stack>
                    <Stack width="50%" borderRadius="12" bg="#ffffff" shadow="2xl" m="5" mt="0" pt="0" p="2">
                        <Box>
                            <Text fontSize='xl' as='b'>Account Information</Text>
                        </Box>
                        <Box>
                            <Flex flexDirection="column" mx="5" my="2">
                                <FormControl id="lastName">
                                    <FormLabel>Email</FormLabel>
                                    <Input type="text" readOnly />
                                </FormControl>
                                <FormControl id="lastName">
                                    <FormLabel>Date of Account Creation</FormLabel>
                                    <Input type="text" readOnly />
                                </FormControl>
                            </Flex>
                        </Box>
                    </Stack>
                </Flex>
            </Box>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Contact Us for Help</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Concern</FormLabel>
                            <Input noOfLines="3" />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Send
              </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>


            <Modal
                isOpen={isSecondModalOpen} onClose={closeSecondModal}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Change Your Password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Current Password</FormLabel>
                            <Input type="text" />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>New Password</FormLabel>
                            <Input type="password" />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Confirm New Password</FormLabel>
                            <Input type="password" />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Send
              </Button>
                        <Button onClick={closeSecondModal}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default ProfileView;