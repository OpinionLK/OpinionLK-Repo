import React, { useEffect,useState } from "react";
import { useAuthContext } from '../../../hooks/useAuthContext';
import axios from 'axios';
import {
    Box,
    Card,
    Heading,
    Divider,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    CardHeader,
    TableCaption,
    CardBody,
    HStack,
    Input,
} from '@chakra-ui/react';

const CouponHistory = () => {

    const [couponHistory, setCouponHistory] = useState([]);
    const {
        // eslint-disable-next-line
        user
    } = useAuthContext();

    const index = 0;

    const fetchCouponHistory = async () => {
        try {
            // send security token to backend with the header
            const res = await axios.get('http://localhost:3002/api/user/couponHistory', {
                headers: { 'Authorization': `Bearer ${user.token}` },
            });
            const data = res.data;
            console.log("Hello this is a test: ",data);
            const updatedCouponHistory = data.map((coupons) => ({
                couponName: coupons.couponName,
                couponDescription: coupons.couponDescription,
                points: coupons.couponPoints,
                dateRedeemed: coupons.dateSubmitted,
            }));
            setCouponHistory(updatedCouponHistory);
        
        }
        catch (err) {
            console.error('Error fetching Coupon History:', err);
        }

    }

    useEffect(() => {
        fetchCouponHistory();
                // eslint-disable-next-line
    } , []);

    const totalCoupons = () => {
        return couponHistory.length;
    }
 
    return (
        <><Box>
            <Card borderRadius={10}>
                <CardHeader>
                    <HStack>
                        <Heading fontSize={20} mr={10}>Coupon History</Heading>
                        <Input
                            type="search"
                            placeholder="Search"
                            size="sm"
                            width="300px"
                            borderRadius={10}
                            mt={3}
                            mb={3}
                        />
                    </HStack>
                </CardHeader>
                <Divider color={'gray.300'} />
                <CardBody>
                <Table variant="simple">
                    <TableCaption m={'0 auto'} mt={5} bg={'purple.400'} borderRadius={5} color={'whiteAlpha.900'} w={'fit-content'}>Total Coupons: {totalCoupons()}</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Coupon Name</Th>
                            <Th>Description</Th>
                            <Th>Points</Th>
                            <Th>Date Redeemed</Th>
                        </Tr>
                    </Thead>
                    <Tbody fontSize={14}>
                        {couponHistory.map((coupons) => (
                            <Tr key={index} borderRadius={10} _hover={{cursor: 'pointer', backgroundColor: 'purple.100'}}>
                                <Td>{coupons.couponName}</Td>
                                <Td>{coupons.couponDescription}</Td>
                                <Td>{coupons.points}</Td>
                                <Td>{coupons.dateRedeemed}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                </CardBody>
            </Card>
        </Box>
        </>
    );
}

export default CouponHistory;