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
    Progress,
    Spacer,
} from '@chakra-ui/react'

// import { NavLink } from "react-router-dom";
import CouponIMG from '../../images/couponimg.png'
import { RiCopperCoinFill } from "react-icons/ri";

export default function CouponPopup ({ couponID, couponName, couponDescription, companyName, couponImage, couponPoints, userPoints}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const percent = (userPoints/couponPoints)*100
    return (
        <>
            <Button variant='solid' colorScheme='purple' leftIcon={<RiCopperCoinFill />} bg='#583EFF' onClick={onOpen}>
                {couponPoints}
            </Button>

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
                                {couponName}
                            </Text>
                            {/* {type === 'client' && (
                            )}
                            {type === 'surveyee' && (
                            )} */}
                            <Text fontSize='xs' mb='4'>
                                {couponPoints} points
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
                            src={CouponIMG}
                            // src={'http://localhost:3002/api/survey/images/' + {surveyImage}} alt={surveyName}
                            />
                        </Box> 
                    </Flex>
                    
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text mb='4'>
                        {couponDescription}
                    </Text>
                </ModalBody>
                {/* <ModalFooter> */}
                    <Flex
                        position={'relative'}
                        bottom='1'
                        alignContent={'center'}
                        justifyContent={'center'}
                        m='6'
                    >
                        <Box pt='4' width='80%' pr='3'>
                            <Progress value={percent} width='100%' borderRadius='20px' colorScheme='purple' borderColor='#451CFC'/>
                        </Box>
                        <Spacer/>
                        <Button 
                            variant='solid' 
                            colorScheme='purple' 
                            borderRadius={'full'} 
                            fontSize={12} 
                            // fontWeight={'light'} 
                            bg='#583EFF' 
                            onClick={()=>{window.location.href = 'http://localhost:3000/portal/survey/' + couponID + '/fill'}}
                        >
                            Redeem Coupon
                        </Button>  
                    </Flex>                 
                {/* </ModalFooter> */}
                </ModalContent>
            </Modal>
        </>
    )
    
}