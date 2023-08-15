import React from 'react'

import {
    Box,
    SimpleGrid,
    Card,
    CardHeader, 
} from '@chakra-ui/react'


import SurveyCard from './SurveyCard';

const SurveyRow = () => {
    return (
        <Card
            overflow='hidden'
            variant='elevated'
            width={'auto'}
            borderRadius='20'
            mr={5}
            
        >   
            <CardHeader fontSize={20} fontWeight={'semibold'}>
                Your Surveys
            </CardHeader>

            <Box
                width="auto"
                px={5}
                pb='4'
                minW='1000px'
            >
                <SimpleGrid minChildWidth='120px' spacing='20px'>
                    <SurveyCard/>
                    <SurveyCard/>
                    <SurveyCard/>
                </SimpleGrid>
            </Box>
        </Card>
    )
}

export default SurveyRow