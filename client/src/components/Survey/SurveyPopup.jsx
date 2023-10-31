import React from 'react'
import { 
    Alert,
    AlertIcon,
    Text,
    Button,
    ButtonGroup,
    IconButton,
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
} from '@chakra-ui/react'
import { useClipboard } from "@chakra-ui/react";
import { LinkIcon } from '@chakra-ui/icons'

// import { NavLink } from "react-router-dom";
import sampleCard from '../../images/sample-card.png'
// eslint-disable-next-line
export default function SurveyPopup({type, surveyName, surveyDescription, surveyImage, surveyID, surveyTags, surveyPoints}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const textToCopy = `http://localhost:3000/surveyAnonymous/${surveyID}`; // Replace with your text
    const { onCopy, hasCopied } = useClipboard(textToCopy);

    if(!surveyImage){
        surveyImage = "default_bg"
    }

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
                                {surveyName}
                            </Text>
                            {type === 'client' && (
                                <Text fontSize='xs' mb='4'>
                                    Filled by 200 users
                                </Text>
                            )}
                            {type === 'surveyee' && (
                                <Text fontSize='xs' mb='4'>
                                    {surveyPoints} points
                                </Text>
                            )}
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
                                // src={sampleCard}
                                src={`https://ik.imagekit.io/7i3fql4kv7/survey_headers/${surveyImage}`} 
                                alt={surveyName}
                            />
                        </Box> 
                    </Flex>
                    
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text mb='4'>
                        {surveyDescription}
                    </Text>
                    {type === 'client' && (
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
                    )}
                    {type === 'surveyee' && (
                        <Wrap>
                            <Flex bg='#F4F7FE' p={4} color='#1B2559' borderRadius={15} mr='1'>
                                <Text fontWeight='bold' pr='8'>End date: </Text>
                                <Text>27/10/23</Text>
                            </Flex>
                            <Flex bg='#F4F7FE' p={4} color='#1B2559' borderRadius={15} mr='1'>
                                <Text fontWeight='bold' pr='8'>No. of questions: </Text>
                                <Text>25</Text>
                            </Flex>
                        </Wrap>
                    )}
                    
                </ModalBody>
                <ModalFooter>
                    <ButtonGroup spacing={4}>
                    <Alert status="success" width='150px' visibility={hasCopied ? 'visible' : 'hidden'}>
                        <AlertIcon />
                        copied
                    </Alert>
                        <IconButton
                            isRound={true}
                            variant='outline'
                            colorScheme='purple'
                            aria-label='Done'
                            fontSize='20px'
                            borderColor='#11047A'
                            icon={<LinkIcon />}
                            onClick={onCopy}
                        >
                            {hasCopied ? "Copied" : "Copy"}
                        </IconButton>
                        
                        <Button 
                            variant='solid' 
                            colorScheme='blue' 
                            borderRadius={'full'} 
                            fontSize={12} 
                            fontWeight={'light'} 
                            bg='#11047A' 
                            minwidth='102px'
                            onClick={()=>{window.location.href = 'http://localhost:3000/portal/survey/' + surveyID + '/fill'}}
                        >
                            Take Survey
                        </Button>
                    </ButtonGroup>                  
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
    
}