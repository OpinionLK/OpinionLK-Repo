import React from 'react'

// import './style.css'

import { 
    Text,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Flex,
    Box,
    Image,
    HStack,
    Tag,
    TagLabel,
    Wrap, 
    WrapItem,
} from '@chakra-ui/react'

// import { NavLink } from "react-router-dom";
import sampleCard from '../../images/sample-card.png'

export default function SurveyPopup() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button variant='solid' colorScheme='blue' borderRadius={'full'} fontSize={12} fontWeight={'light'} bg='#11047A' onClick={onOpen}>Survey Details</Button>
            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset='scale'
                size='xl'
                // w={100}
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>
                    <Flex>
                        <Box>
                            <Text fontSize='2xl' fontWeight='bold'color='#1B2559'>
                                Modern Art in Society
                            </Text>
                            <Text fontSize='xs' mb='4'>
                                Filled by 200 users
                            </Text>
                            <HStack spacing={2}>
                                <Tag size='sm' key='sm' variant='outline' colorScheme='purple'>
                                <TagLabel>art</TagLabel>
                                </Tag>
                                <Tag size='sm' key='sm' variant='outline' colorScheme='purple'>
                                <TagLabel>modern</TagLabel>
                                </Tag>
                                <Tag size='sm' key='sm' variant='outline' colorScheme='purple'>
                                <TagLabel>youth</TagLabel>
                                </Tag>
                            </HStack>
                        </Box>
                        <Box
                            position="relative"
                            // width="800px"
                            height="150px"
                            overflow="hidden"
                            borderRadius='lg'
                        >
                            <Image
                            src={sampleCard}
                            alt='Green double couch with wooden legs'
                            />
                        </Box> 
                    </Flex>
                    
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Wrap>
                        <Flex bg='#F4F7FE' p={5} color='#1B2559' borderRadius={15} mr='1'>
                            <Text fontWeight='bold' pr='8'>Type: </Text>
                            <Text>Time-based</Text>
                        </Flex>
                        <Flex bg='#F4F7FE' p={4} color='#1B2559' borderRadius={15} mr='1'>
                            <Text fontWeight='bold' pr='8'>Duration: </Text>
                            <Text>7 days</Text>
                        </Flex>
                        <Flex bg='#F4F7FE' p={4} color='#1B2559' borderRadius={15} mr='1'>
                            <Text fontWeight='bold' pr='8'>Start date: </Text>
                            <Text>21/10/23</Text>
                        </Flex>
                        <Flex bg='#F4F7FE' p={4} color='#1B2559' borderRadius={15} mr='1'>
                            <Text fontWeight='bold' pr='8'>End date: </Text>
                            <Text>27/10/23</Text>
                        </Flex>
                        <Flex bg='#F4F7FE' p={4} color='#1B2559' borderRadius={15} mr='1'>
                            <Text fontWeight='bold' pr='8'>No. of questions: </Text>
                            <Text>25</Text>
                        </Flex>
                        <Flex bg='#F4F7FE' p={4} color='#1B2559' borderRadius={15} mr='1'>
                            <Text fontWeight='bold' pr='8'>Pricing: </Text>
                            <Text>6000 LKR</Text>
                        </Flex>
                    </Wrap>
                </ModalBody>
                <ModalFooter>
                    <Button variant='solid' colorScheme='blue' borderRadius={'full'} fontSize={12} fontWeight={'light'} bg='#11047A' onClick={onClose}>
                        View Survey
                    </Button>                    
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
    
}