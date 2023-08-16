import React from "react";
import { Box, Text, Image, Flex, Button, Card, CardHeader, Grid } from "@chakra-ui/react";
import coupon from "../../assets/images/Coupon.png";

const CouponBoard = () => {

    return (
        <>
                <Card minW={'560px'} borderRadius={'20px'}>
                    <CardHeader>
                        <Text fontSize="xl" fontWeight="bold">Popular Coupons</Text>
                    </CardHeader>
                    <Grid templateRows="repeat(6, 1fr)">
                        <Box>
                            <Flex bg={''} ml={10} mb={5} mr={10}>
                                <Flex direction={'row'}>
                                <Image borderRadius={10} w={'80px'} height={'80px'} src={coupon} alt="coupon" />
                                <Box pl={'10px'} pt={'15px'}>
                                    <Text fontSize="md" fontWeight="bold">Buy one get one free</Text>
                                    <Text fontSize="sm">Bakes by bella</Text>
                                </Box>
                                </Flex>
                                <Flex direction={'column'} ml={'auto'} mr={10} justifyContent={'center'}>
                                    <Button alignSelf={'center'} justifyContent={'flex-end'} colorScheme="blue">Redeem</Button>
                                </Flex>
                            </Flex>
                        </Box>

                        <Box>
                            <Flex bg={''} ml={10} mr={10}>
                                <Flex direction={'row'}>
                                <Image borderRadius={10} w={'80px'} height={'80px'} src={coupon} alt="coupon" />
                                <Box pl={'10px'} pt={'15px'}>
                                    <Text fontSize="md" fontWeight="bold">Buy one get one free</Text>
                                    <Text fontSize="sm">Bakes by bella</Text>
                                </Box>
                                </Flex>
                                <Flex direction={'column'} ml={'auto'} mr={10} justifyContent={'center'}>
                                    <Button alignSelf={'center'} justifyContent={'flex-end'} colorScheme="blue">Redeem</Button>
                                </Flex>
                            </Flex>
                        </Box>
                        <Box>
                            <Flex bg={''} ml={10} mr={10}>
                                <Flex direction={'row'}>
                                <Image borderRadius={10} w={'80px'} height={'80px'} src={coupon} alt="coupon" />
                                <Box pl={'10px'} pt={'15px'}>
                                    <Text fontSize="md" fontWeight="bold">Buy one get one free</Text>
                                    <Text fontSize="sm">Bakes by bella</Text>
                                </Box>
                                </Flex>
                                <Flex direction={'column'} ml={'auto'} mr={10} justifyContent={'center'}>
                                    <Button alignSelf={'center'} justifyContent={'flex-end'} colorScheme="blue">Redeem</Button>
                                </Flex>
                            </Flex>
                        </Box>
                        <Box>
                            <Flex bg={''} ml={10} mr={10}>
                                <Flex direction={'row'}>
                                <Image borderRadius={10} w={'80px'} height={'80px'} src={coupon} alt="coupon" />
                                <Box pl={'10px'} pt={'15px'}>
                                    <Text fontSize="md" fontWeight="bold">Buy one get one free</Text>
                                    <Text fontSize="sm">Bakes by bella</Text>
                                </Box>
                                </Flex>
                                <Flex direction={'column'} ml={'auto'} mr={10} justifyContent={'center'}>
                                    <Button alignSelf={'center'} justifyContent={'flex-end'} colorScheme="blue">Redeem</Button>
                                </Flex>
                            </Flex>
                        </Box>
                        <Box>
                            <Flex bg={''} ml={10} mr={10}>
                                <Flex direction={'row'}>
                                <Image borderRadius={10} w={'80px'} height={'80px'} src={coupon} alt="coupon" />
                                <Box pl={'10px'} pt={'15px'}>
                                    <Text fontSize="md" fontWeight="bold">Buy one get one free</Text>
                                    <Text fontSize="sm">Bakes by bella</Text>
                                </Box>
                                </Flex>
                                <Flex direction={'column'} ml={'auto'} mr={10} justifyContent={'center'}>
                                    <Button alignSelf={'center'} justifyContent={'flex-end'} colorScheme="blue">Redeem</Button>
                                </Flex>
                            </Flex>
                        </Box>
                        <Box>
                            <Flex bg={''} ml={10} mr={10}>
                                <Flex direction={'row'}>
                                <Image borderRadius={10} w={'80px'} height={'80px'} src={coupon} alt="coupon" />
                                <Box pl={'10px'} pt={'15px'}>
                                    <Text fontSize="md" fontWeight="bold">Buy one get one free</Text>
                                    <Text fontSize="sm">Bakes by bella</Text>
                                </Box>
                                </Flex>
                                <Flex direction={'column'} ml={'auto'} mr={10} justifyContent={'center'}>
                                    <Button alignSelf={'center'} justifyContent={'flex-end'} colorScheme="blue">Redeem</Button>
                                </Flex>
                            </Flex>
                        </Box>
                    </Grid>
                </Card>
          
        </>
    )
}

export default CouponBoard;