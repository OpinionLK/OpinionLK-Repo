import React from 'react'

import {
    Box,
    SimpleGrid,
    Card,
    CardHeader, 
    Wrap,
    Flex,
    Button,
    Spacer
} from '@chakra-ui/react'


import SurveyCard from './SurveyCard';

const SurveyRow = () => {
    return (
        <Card
            overflow='hidden'
            variant='unstyled'
            width={'auto'}
            borderRadius='20'
            mr={5}
            bgColor='#F4F7FE'
            
        >   
            <Flex p='5' pb='4'>
                <CardHeader fontSize={20} fontWeight={'semibold'} color='#2B3674'>
                    Recommended surveys
                </CardHeader>
                <Spacer />
                <Button variant='outline' colorScheme='purple'>search</Button>
            </Flex>

            <Box
                width="auto"
                px={5}
                pb='4'
                minW='1009px'
            >
                <Wrap spacing='21px'>
                    <SurveyCard />
                    <SurveyCard />
                    <SurveyCard />
                    <SurveyCard />
                </Wrap>
            </Box>
        </Card>
    )
}

export default SurveyRow