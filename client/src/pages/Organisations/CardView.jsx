import React from 'react'
import { useEffect, useState } from 'react'
import {
    Flex,
    VStack,
    Text,
    Button,
    HStack,
} from '@chakra-ui/react'
import { useAuthContext } from '../../hooks/useAuthContext';
        // eslint-disable-next-line
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import{
    AddIcon
} from '@chakra-ui/icons'


const CardView = () => {
    const {
                // eslint-disable-next-line
        user, dispatch, userData
    } = useAuthContext();
    const [paymentMethods, setPaymentMethods] = useState([])
    const getPaymentMethods = async () => {
        console.log(user.token)
                // eslint-disable-next-line
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


    useEffect(() => {
        getPaymentMethods()
                // eslint-disable-next-line
    }, [])
    return (
        <>
            {paymentMethods && paymentMethods?.paymentMethods?.length > 0
                ? paymentMethods?.paymentMethods?.map((paymentMethod) => {
                    return (
                        <Flex border={'1px solid'} borderColor={
                            paymentMethod.id === paymentMethods.defaultPaymentMethod ? 'blue.500' : 'gray.200'
                        } padding={'10px'} borderRadius={'5px'} width={'100%'}>

                            <Flex gap={'10px'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                                <HStack>

                                    <Flex padding={'10px'} borderRadius={'5px'}>
                                            <img
                                                    src={
                                                        paymentMethod.card.brand === 'visa'
                                                        ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png'
                                                        : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1200px-Mastercard-logo.svg.png'
                                                    }
                                                    width={'50px'}
                                                    height={'50px'}
                                                    alt="Visa or Mastercard Logo"
                                                    />
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
                                <Button colorScheme={'red'} variant={'outline'}>Remove</Button>
                            </Flex>
                        </Flex>
                    )

                }
                ) : (
                    <Flex border={'1px solid'} padding={'10px'} borderRadius={'5px'} onClick={() => {


                    }}>

                        <Flex justifyContent={'center'} gap={'10px'} alignItems={'center'}>
                            <Flex border={'1px solid'} padding={'10px'} borderRadius={'5px'}><AddIcon /></Flex>
                            Add Payment Method
                        </Flex>
                    </Flex>
                )}
        </>
    )
}

export default CardView
