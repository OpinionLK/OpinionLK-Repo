import React from 'react'

import {
    Box,
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
                    My Surveys
                </CardHeader>
                <Spacer />
                {/* <Button variant='outline' colorScheme='purple'>search</Button> */}
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
                        type = 'client'
                        surveyName={survey.surveyName}
                        surveyDescription={survey.surveyDescription}
                        surveyImage={survey.surveyImage}
                        surveyID={survey.surveyID}
                        surveyTags={survey.userTags[0]}
                        surveyPoints={survey.points}
                        noOfQs={survey.questions.length}
                        noOfRs={survey.responses.length}
                        cost={survey.cost}
                        duration={survey.duration}
                        startDate={survey.start_date}
                        endDate={survey.expiration_date}
                        responseLimit={survey.responseLimit}
                        status={survey.approvalStatus}
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