import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Box, Text, Image, Flex, Button, Card, CardHeader, Grid, Divider, VStack, Modal } from "@chakra-ui/react";
import { ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"
const CouponBoard = () => {

    const [coupons, setCoupons] = useState([])
    // total coupon count
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

    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const onOpen = () => setIsOpen(true)

    const [isOpenN, setIsOpenN] = useState(false)
    const onCloseN = () => setIsOpenN(false)
    const onOpenN = () => setIsOpenN(true)

    const redeeemCoupon = async () => {
        try{
            const response = await axios.post('http://localhost:3002/api/user/redeemCoupon', {couponID: coupons[0].CouponID, userID: userData.UserID})
            console.log(response.data)
            onClose()
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <>
            <Card minW={'560px'} borderRadius={'20px'}>
                <CardHeader>
                    <Text fontSize="xl" fontWeight="bold">Popular Coupons</Text>
                    <Text fontSize="md" color={'gray.500'}>{couponCount} coupons available</Text>
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
                                    <Box pl={'10px'} pt={'15px'}>
                                        <Text fontSize="md" fontWeight="bold">{coupon.CouponName}</Text>
                                        <Text fontSize="sm">{coupon.Description}</Text>
                                    </Box>
                                    </Flex>
                                    <Flex direction={'column'} ml={'auto'} mr={0} justifyContent={'center'}>
                                        <VStack>
                                            {showRedeem ? 
                                            <Button id="redeem" alignSelf={'center'} justifyContent={'flex-end'} onClick={onOpen} colorScheme="purple">Redeem</Button> :
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
                    <Button colorScheme="purple" onClick={redeeemCoupon} >Yes Redeem</Button>
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