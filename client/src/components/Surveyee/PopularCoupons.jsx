import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Box, Text, Image, Flex, Button, Card, CardHeader, Grid, Divider, VStack, Modal, HStack } from "@chakra-ui/react";
import { ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"
const CouponBoard = () => {

    const [coupons, setCoupons] = useState([])
    // total coupon count
    // eslint-disable-next-line
    const [couponCount, setCouponCount] = useState(0)

    useEffect(() => {
      const fetchCoupons = async () => {
        try{
            // get 10 most recent coupons
            const response = await axios.get('http://localhost:3002/api/user/getAllCoupons')
            console.log("hello there:",response.data)
            setCoupons(response.data)
            setCouponCount(response.data.length)
        }catch(err){
          console.log(err)
        }
      }
  
      fetchCoupons()
    }, [])

    const {
      // eslint-disable-next-line
      user, dispatch, userData
    } = useAuthContext();
    const points = userData?.points;

    const [selectedCoupon, setSelectedCoupon] = useState(null)

    // modal for redeeming coupon
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const onOpen = (_id) => {
        setSelectedCoupon(_id)
        console.log('id: ', _id)      
        setIsOpen(true)
    }

    // modal for not enough points
    const [isOpenN, setIsOpenN] = useState(false)
    const onCloseN = () => setIsOpenN(false)
    const onOpenN = () => setIsOpenN(true)

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
        //     const updatedUser = await axios.get('http://localhost:3002/api/user/updatedUser', 
        //     { headers: { 'Authorization': `Bearer ${user.token}` } }
        // )
        //     dispatch({ type: 'SET_USER', payload: updatedUser.data })

        }
        catch(err){
            console.log('Coupon redeem was not successful: ',err)
        }
    }

    return (
        <>
            <Card minW={'560px'} borderRadius={'20px'}>
                <CardHeader>
                    <HStack display={'flex'} justifyContent={'space-between'}>
                    <Text fontSize="xl" fontWeight="bold">Popular Coupons</Text>
                    <Link to="/portal/MyRewards" style={{ textDecoration: 'none' }}>View All</Link>
                    {/* <Text fontSize="md" color={'gray.500'}>{couponCount} coupons available</Text> */}
                    </HStack>
                </CardHeader>
                <Divider color={'gray.300'} />
                <Grid templateRows="repeat(6, 1fr)" py={3}>
                    {coupons ? coupons.map((coupon) => {
                        const showRedeem = points >= coupon.Points;
                        
                        return(
                            <Box _hover={{backgroundColor: 'purple.100', cursor: 'pointer'}}>
                                <Flex bg={''} mx={5} my={3}>
                                    <Flex direction={'row'}>
                                    <Image borderRadius={10} w={'80px'} height={'80px'} src={coupon.CouponImage} alt="coupon" />
                                    <Box px={'10px'} py={'10px'}>
                                        <Text fontSize="md" fontWeight="bold">{coupon.CouponName}</Text>
                                        <Text fontSize="sm">{coupon.Description}</Text>
                                    </Box>
                                    </Flex>
                                    <Flex direction={'column'} ml={'auto'} mr={0} justifyContent={'center'}>
                                        <VStack>
                                            <Button alignSelf={'center'} size={'sm'} justifyContent={'flex-end'} colorScheme="gray">{coupon.Count} Left</Button>
                                            {showRedeem ? 
                                            <Button id="redeem" size={'sm'} alignSelf={'center'} justifyContent={'flex-end'} onClick={() => onOpen(coupon._id)} colorScheme="purple">Redeem</Button> :
                                            <Button id="points" alignSelf={'center'} justifyContent={'flex-end'} onClick={onOpenN} colorScheme="gray">{points}/{coupon.Points}</Button> }
                                        </VStack>
                                    </Flex>
                                </Flex>
                            </Box>
                        )
                    }) : <Text>No Coupons Available</Text>}
                </Grid>
            </Card>
            {/* ============================================ popup ============================================== */}

            {/* modal for coupn redeem */ }
            <Modal isOpen={isOpen} onClose={onClose}>
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

            <Modal isOpen={isOpenN} onClose={onCloseN}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>
                    Not Enough Points
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Sorry! You do not have enough points to redeem this coupon.</Text>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="purple" mr={3} onClick={onCloseN}>
                    Close
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CouponBoard;