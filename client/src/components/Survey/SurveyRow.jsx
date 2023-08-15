import React from 'react'

import {
    Box,
    Flex,
    Spacer,
    SimpleGrid,
    Card,
    CardHeader, 
    CardBody, 
    CardFooter, 
    Text,
} from '@chakra-ui/react'


import SurveyCard from './SurveyCard';

const SurveyRow = () => {
    return (
        <Card
            overflow='hidden'
            variant='elevated'
            // p={[2, 3]}
            borderRadius='20'
            mt={5}
            mr={5}
            
        >   
            <CardHeader fontSize={20} fontWeight={'semibold'}>
                Your Surveys
            </CardHeader>

            <Box
                width="800px"
                pl='5'
                pr='5'
                pb='4'
                minW='1000px'
            >
                <SimpleGrid minChildWidth='120px' spacing='40px'>
                    <SurveyCard/>
                    <SurveyCard/>
                    <SurveyCard/>
                </SimpleGrid>
            </Box>
        </Card>
    )
}

export default SurveyRow