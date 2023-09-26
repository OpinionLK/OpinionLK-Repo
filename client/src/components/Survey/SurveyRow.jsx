import React from 'react'

import {
    Box,
    SimpleGrid,
    Card,
    CardHeader, 
    Wrap,
    Flex,
    Button,
    Spacer,
    Text
} from '@chakra-ui/react'


import SurveyCard from './SurveyCard';

const SurveyRow = ({surveys}) => {
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
                {/* <Wrap spacing='21px'>
                    <SurveyCard />
                    <SurveyCard />
                    <SurveyCard />
                    <SurveyCard />
                </Wrap> */}
                <Wrap spacing='21px'>
                    {surveys ? surveys.map((survey) => {
                    return (
                        <SurveyCard
                        type = 'surveyee'
                        surveyName={survey.surveyName}
                        surveyDescription={survey.surveyDescription}
                        surveyImage={survey.surveyImage}
                        surveyID={survey.surveyID}
                        surveyTags={survey.surveyTags}
                        surveyPoints={survey.surveyPoints}
                        />
                    )
                    }
                    ) : <Text>No Surveys Available</Text>}
                </Wrap>
            </Box>
        </Card>
    )
}

export default SurveyRow