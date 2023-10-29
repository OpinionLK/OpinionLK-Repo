import { Heading } from '@chakra-ui/react'
import React from 'react'
import {
    Box,
    Flex,
    Grid,
    Card,
    Text,
    CardHeader,
    CardBody,


} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

const PaymentBilling = () => {
    return (
        <Box mt={-5}>
            <Flex width={'100%'} gap={'10px'} flex={'1'} flexDirection={'column'}>
                {/* <Heading as={'h2'} size={'xl'} fontWeight={'semibold'}>Surveys</Heading> */}
                <Grid templateColumns='repeat(2, 1fr)' gap={6}>

                    <Card w={'100%'}>
                        <CardHeader >
                            <Heading size={'sm'} fontWeight={'bold'}>Payment Methods</Heading>
                            <Text fontSize='sm'>Choose how you pay for your plan</Text>
                        </CardHeader>
                        <CardBody>
                            <Flex border={'1px solid'} padding={'10px'} borderRadius={'5px'}onClick={()=>{alert('click')}}>

                                <Flex justifyContent={'center'} gap={'10px'} alignItems={'center'}>
                                    <Flex border={'1px solid'} padding={'10px'} borderRadius={'5px'}><AddIcon /></Flex>
                                    Add Payment Method
                                </Flex>
                            </Flex>
                        </CardBody>
                    </Card>
                    {/* <Card w={'100%'}>
                            <CardHeader>
                              
                            </CardHeader>
                            <CardBody>
                           
                            </CardBody>
                        </Card> */}

                </Grid>
            </Flex>

        </Box>
    )
}

export default PaymentBilling
