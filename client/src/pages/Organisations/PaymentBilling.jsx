import { Button, HStack, Heading } from '@chakra-ui/react'
import React from 'react'
import { useEffect, useState } from 'react'
import {
    Box,
    Flex,
    Grid,
    Card,
    VStack,
    Text,
    CardHeader,
    CardBody,
} from '@chakra-ui/react'
import BillingTable from '../../components/organisation/BillingTable'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { AddIcon } from '@chakra-ui/icons'

const PaymentBilling = () => {
    const {
         // eslint-disable-next-line
        user, dispatch, userData
    } = useAuthContext();
     // eslint-disable-next-line
    const history = useNavigate();
    const [paymentMethods, setPaymentMethods] = useState([])

    const addPaymentMethod = async () => {
        console.log(user.token)
        const response = await axios.post(`http://localhost:3002/api/payment/create-checkout-session`, {},
            {
                headers: { 'Authorization': `Bearer ${user.token}` },
            },

        );
        console.log(response.data.url);
        // go to stripe checkout
        window.location.href = response.data.url;

    }

    const getPaymentMethods = async () => {
        console.log(user.token)
        const response = await axios.post(`http://localhost:3002/api/payment/retrieve-payment`, {},
            {
                headers: { 'Authorization': `Bearer ${user.token}` },
            },

        ).then((response) => {
            console.log(response.data)
            setPaymentMethods(response.data)
        }
        );


    }
    const getBillingHistory = async () => {
        const response = await axios.post(`http://localhost:3002/api/payment/get-payment-history`, {}, {
            headers: { 'Authorization': `Bearer ${user.token}` },
        },
        ).then((response) => {
            console.log(response.data)

        }
        );

    }


    useEffect(() => {
        getPaymentMethods()
        // getBillingHistory()
    }, [])
    return (
        <Box mt={-5}>
            <Flex width={'100%'} gap={'10px'} flex={'1'} flexDirection={'column'}>
                {/* <Heading as={'h2'} size={'xl'} fontWeight={'semibold'}>Surveys</Heading> */}
                <Grid templateColumns='repeat(3, 1fr)' gap={6}>

                    <Card w={'100%'}>
                        <CardHeader >
                            <Heading size={'sm'} fontWeight={'bold'}>Payment Methods</Heading>
                            <Text fontSize='sm'>Choose how you pay for your plan</Text>
                        </CardHeader>
                        <CardBody>
                            {paymentMethods && paymentMethods?.paymentMethods?.length > 0
                                ? paymentMethods?.paymentMethods?.map((paymentMethod) => {
                                    return (
                                        <Flex border={'1px solid'} borderColor={
                                            paymentMethod.id === paymentMethods.defaultPaymentMethod ? 'blue.500' : 'gray.200'
                                        } padding={'10px'} borderRadius={'5px'}>

                                            <Flex gap={'10px'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                                                <HStack>

                                                    <Flex padding={'10px'} borderRadius={'5px'}>
                                                        <img src={paymentMethod.card.brand === 'visa' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1200px-Mastercard-logo.svg.png'} width={'50px'} height={'50px'} />
                                                    </Flex>
                                                    <VStack alignItems={'flex-start'}>
                                                        <Text fontWeight={'bold'}>
                                                            {paymentMethod.card.brand.toUpperCase()
                                                            } ending in {paymentMethod.card.last4}
                                                        </Text>
                                                        <Text fontSize={'sm'} color={'gray.500'}>
                                                            {paymentMethod.card.exp_month}/{paymentMethod.card.exp_year}
                                                        </Text>
                                                    </VStack>
                                                </HStack>
                                                <Button colorScheme={'blue'} variant={'outline'}>Edit</Button>
                                            </Flex>
                                        </Flex>
                                    )

                                }
                                ) : (
                                    <Flex border={'1px solid'} padding={'10px'} borderRadius={'5px'} onClick={() => {
                                        addPaymentMethod()

                                    }}>

                                        <Flex justifyContent={'center'} gap={'10px'} alignItems={'center'}>
                                            <Flex border={'1px solid'} padding={'10px'} borderRadius={'5px'}><AddIcon /></Flex>
                                            Add Payment Method
                                        </Flex>
                                    </Flex>
                                )}




                        </CardBody>
                    </Card>
                </Grid>
                <Card padding={'20px'}>
                    <BillingTable />
                </Card>
            </Flex>

        </Box>
    )
}

export default PaymentBilling
