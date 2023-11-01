import React, {useEffect, useState} from 'react'
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios'

import { 
    Text,
    Box,
    Button,
    Image,
    Flex,
    VStack,
    Card,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom';

const CouponCard = ({couponID, couponName, couponDescription, companyName, couponImage, couponPoints, couponCount, userPoints}) => {

    const {
        // eslint-disable-next-line
        user, dispatch, userData
    } = useAuthContext();
    
    const [showRedeem, setShowRedeem] = useState(false)
    const [showPoints, setShowPoints] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [showDetails, setShowDetails] = useState(false)

    useEffect(() => {
        if (userPoints >= couponPoints) {
            setShowRedeem(true);
        } else {
            setShowRedeem(false);
        }
    }, [userPoints, couponPoints]);

    const onOpen = () => {setShowPopup(true)}
    const onClose = () => setShowPopup(false)

    const onOpenN = () => setShowPoints(true)
    const onCloseN = () => setShowPoints(false)

    const onOpenD = () => setShowDetails(true)
    const onCloseD = () => setShowDetails(false)

    // const percent = (userPoints/couponPoints)*100;

    const selectedCoupon = couponID;

    const redeeemCoupon = async (_id) => {
            
            try{
                console.log('id in redeem comp: ', _id)
                const response = await axios.post('http://localhost:3002/api/user/redeemCoupon', 
                { _id }, 
                { headers: { 'Authorization': `Bearer ${user.token}` } }
            )
                console.log(response.data)
                onClose()
                window.location.reload();
            }catch(err){
                console.log(err)
            }
        }
    return (
        <>
        <Card _hover={{backgroundColor: 'purple.100', cursor: 'pointer'}} onClick={() => onOpenD(couponID) }>
            <Flex bg={''} mx={5} my={3}>
                <Flex direction={'row'}>
                <Image borderRadius={10} w={'80px'} height={'80px'} src={couponImage} alt="coupon" />
                <Box px={'10px'} py={'10px'}>
                    <Text fontSize="md" fontWeight="bold">{couponName}</Text>
                    <Text fontSize="sm" color={'gray'}>{companyName}</Text>
                    <Text fontSize="sm">{couponDescription}</Text>
                </Box>
                </Flex>
                <Flex direction={'column'} ml={'auto'} mr={0} justifyContent={'center'}>
                    <VStack>
                        <Button alignSelf={'center'} size={'sm'} justifyContent={'flex-end'} colorScheme="gray">{couponCount} Left</Button>
                        {showRedeem ? 
                        <Button zIndex={1000} id="redeem" size={'sm'} alignSelf={'center'} justifyContent={'flex-end'} onClick={(event) => {event.stopPropagation(); onOpen(couponID);}} colorScheme="purple">Redeem</Button> :
                        <Button zIndex={1000} id="points" alignSelf={'center'} justifyContent={'flex-end'} onClick={(event) => {event.stopPropagation(); onOpenN();}} colorScheme="gray">{userPoints}/{couponPoints}</Button> }
                    </VStack>
                </Flex>
            </Flex>
        </Card>
    {/* ============================================ popup ============================================== */}
        
        {/* modal for coupn redeem */ }

        <Modal isOpen={showPopup} onClose={onClose} isCentered motionPreset='slideInBottom'
>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>
                Redeem Coupon
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text>Are you sure you want to redeem this coupon?</Text>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='gray' mr={3} onClick={onClose}>
                Close
                </Button>
                <Button colorScheme="purple" onClick={() => redeeemCoupon(selectedCoupon)} >Yes, Redeem</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>

        {/* modal for not enough points */ }

        <Modal isOpen={showPoints} onClose={() => setShowPoints(false)} isCentered motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>
                Not Enough Points
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text>You do not have enough points to redeem this coupon.</Text>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="gray" onClick={() => setShowPoints(false)} >Close</Button>
                <Link to='/portal/surveys' ><Button ml={5} colorScheme="purple" onClick={() => setShowDetails(true)} >Go to Surveys</Button></Link>
            </ModalFooter>
            </ModalContent>
        </Modal>

        {/* modal for coupon details */ }

        <Modal isOpen={showDetails} onClose={() => setShowDetails(false)} isCentered motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>
                Coupon Details
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text>You do not have enough points to redeem this coupon.</Text>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="purple" onClick={() => setShowDetails(false)} >Close</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    </>
    )
}

export default CouponCard