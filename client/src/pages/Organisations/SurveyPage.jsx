import { useState, useEffect } from 'react'

import {
    Flex,
    Heading,

    Card,
    CardHeader,
    CardBody,
    Modal,
    ModalBody,

} from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import Table2 from '../../components/organisation/tantable'

import createsurveybg from '../../assets/images/createsurveybg.png'


import { BiDotsHorizontalRounded } from 'react-icons/bi'
const SurveyPage = () => {
    return (
        <>

            <Flex width={'100%'} gap={'10px'} flexDirection={'column'}>
                <Heading as={'h2'} size={'xl'} fontWeight={'semibold'}>Surveys</Heading>
                <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                    <GridItem colSpan={4} height={'100%'}>
                        <Card w={'100%'}>
                            <CardHeader>
                                <Heading size={'md'}>
                                    Your Surveys
                                </Heading>
                            </CardHeader>
                            <CardBody>
                                <Table2 />
                            </CardBody>
                        </Card>
                    </GridItem>
                    {/* <GridItem colSpan={1}>

                        <Card backgroundImage={createsurveybg} boxShadow='2xl' backgroundSize={'cover'} width={'100%'} padding={'30px'} borderRadius={'10px'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'}>

                            <Text fontSize={'24px'} color={'white'} fontWeight={'bold'}>
                                Create a new survey!
                            </Text>
                            <Text pb={'20px'} color={'white'} fontWeight={'normal'}>Gain accurate insights</Text>
                            <Button size={'lg'} width={'90%'} colorScheme='brand'>
                                Get Started
                            </Button>

                        </Card>

                    </GridItem> */}
                </Grid>

            </Flex >

        </>
    )
}

export default SurveyPage