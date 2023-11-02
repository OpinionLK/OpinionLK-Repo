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
    Spacer, 
} from '@chakra-ui/react'
import { useClipboard } from "@chakra-ui/react";
import { LinkIcon } from '@chakra-ui/icons'

// import { NavLink } from "react-router-dom";
// eslint-disable-next-line
import sampleCard from '../../images/sample-card.png'
// eslint-disable-next-line
export default function SurveyPopup({type, surveyName, surveyDescription, surveyImage, surveyID, surveyTags, surveyPoints, noOfQs, noOfRs, cost, duration, startDate, endDate, responseLimit, status}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const textToCopy = `http://localhost:3000/surveyAnonymous/${surveyID}`; // Replace with your text
    const { onCopy, hasCopied } = useClipboard(textToCopy);

    if(!surveyImage){
        surveyImage = "default_bg"
    }

    return (
        <>
            <Button variant='solid' colorScheme='purple' borderRadius={'full'} fontSize={12} fontWeight={'light'} bg='#11047A' onClick={onOpen}>Survey Details</Button>
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
                        <Box w='40%'>
                            <Text fontSize='2xl' fontWeight='bold'color='#1B2559'>
                                {surveyName}
                            </Text>
                            {type === 'client' && (
                                <Text fontSize='xs' mb='4'>
                                    Filled by {noOfRs} users
                                </Text>
                            )}
                            {type === 'surveyee' && (
                                <Text fontSize='xs' mb='4'>
                                    {surveyPoints} points
                                </Text>
                            )}
                            <Wrap spacing={2}>
                                {/* <Tag size='sm' key='sm' variant='outline' colorScheme='purple'>
                                <TagLabel>art</TagLabel>
                                </Tag>
                                <Tag size='sm' key='sm' variant='outline' colorScheme='purple'>
                                <TagLabel>modern</TagLabel>
                                </Tag>
                                <Tag size='sm' key='sm' variant='outline' colorScheme='purple'>
                                <TagLabel>youth</TagLabel>
                                </Tag> */}
                                {surveyTags.interests &&
                                    Object.entries(surveyTags.interests).map(([key, value]) => (
                                        <Tag size='sm' key={key} variant='outline' colorScheme='purple'>
                                        <TagLabel>{value}</TagLabel>
                                        </Tag>
                                    ))
                                }
                            </Wrap>
                        </Box>
                        <Spacer />
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
                                objectFit="cover"
                                height={'100%'}
                                imageFit="cover"
                                
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
                                <Text fontWeight='bold' pr='8'>Response Limit: </Text>
                                <Text>{responseLimit}</Text>
                            </Flex>
                            <Flex bg='#F4F7FE' p={4} color='#1B2559' borderRadius={15} mr='1'>
                                <Text fontWeight='bold' pr='8'>Duration: </Text>
                                <Text>{duration} days</Text>
                            </Flex>
                            <Flex bg='#F4F7FE' p={4} color='#1B2559' borderRadius={15} mr='1'>
                                <Text fontWeight='bold' pr='8'>Start date: </Text>
                                <Text>{new Date(startDate).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}</Text>
                            </Flex>
                            <Flex bg='#F4F7FE' p={4} color='#1B2559' borderRadius={15} mr='1'>
                                <Text fontWeight='bold' pr='8'>End date: </Text>
                                <Text>{new Date(endDate).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}</Text>
                            </Flex>
                            <Flex bg='#F4F7FE' p={4} color='#1B2559' borderRadius={15} mr='1'>
                                <Text fontWeight='bold' pr='8'>No. of questions: </Text>
                                <Text>{noOfQs}</Text>
                            </Flex>
                            <Flex bg='#F4F7FE' p={4} color='#1B2559' borderRadius={15} mr='1'>
                                <Text fontWeight='bold' pr='8'>Pricing: </Text>
                                <Text>{cost} LKR</Text>
                            </Flex>
                            <Flex bg='#F4F7FE' p={4} color='#1B2559' borderRadius={15} mr='1'>
                                <Text fontWeight='bold' pr='8'>Status: </Text>
                                <Text>{status}</Text>
                            </Flex>
                        </Wrap>
                    )}
                    {type === 'surveyee' && (
                        <Wrap>
                            <Flex bg='#F4F7FE' p={4} color='#1B2559' borderRadius={15} mr='1'>
                                <Text fontWeight='bold' pr='8'>End date: </Text>
                                <Text>{new Date(endDate).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}</Text>
                            </Flex>
                            <Flex bg='#F4F7FE' p={4} color='#1B2559' borderRadius={15} mr='1'>
                                <Text fontWeight='bold' pr='8'>No. of questions: </Text>
                                <Text>{noOfQs}</Text>
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
                            colorScheme='purple' 
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