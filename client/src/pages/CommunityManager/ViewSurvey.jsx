import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';


import { useAuthContext } from '../../hooks/useAuthContext.js';
import { useParams } from 'react-router-dom';
import {
    Card, CardBody, CardHeader, Heading, Text, Flex, Button, IconButton,
    Tabs, TabList, TabPanels, Tab, TabPanel, Radio, VStack, Tag

} from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import {
    DeleteIcon
} from '@chakra-ui/icons'


const QuestionCard = ({ surveyid, question, refreshdata }) => {
    const handleDelete = async () => {
        try {
            // Make an HTTP DELETE request to your backend API
            await axios.put(`http://localhost:3002/api/survey/deleteQuestion/${surveyid}`, {
                questionid: question.questionID
            });

            refreshdata();

        } catch (error) {
            console.error('Error deleting question:', error);
        }
    };

    return (<Card cursor="pointer" transition={'0.3s'} sx={{
        _hover: {
            backgroundColor: '#eef1ff',

        },

    }}>
        <CardBody borderRadius={'20px'} display={'flex'} justifyContent={'space-between'}
            alignItems={'center'}><Flex gap={'20px'}>
                {/* <Text fontWeight={'bold'} color={'brand.textDarkPurple'}></Text> */}
                <Text>{question.question}</Text></Flex><Flex gap={'20px'} alignItems={'center'}><Text
                    fontWeight={'bold'}>{question ? question.responseType.toUpperCase() : null}</Text><IconButton aria-label={'delete'}
                        icon={<DeleteIcon />}
                        onClick={handleDelete} /></Flex></CardBody>
    </Card>)
}

const ViewSurvey = () => {

    const history = useNavigate();

    const {
        user, dispatch, userData
    } = useAuthContext();
    const { surveyid } = useParams();
    const [ImgName, setImgName] = useState()
    const [survey, setSurvey] = useState();

    const handleContentUpdate = (newContent) => {
        setSurvey(newContent);
        console.log(newContent);
    };


    async function handleSubmit() {
        try {
            const response = await axios.get('http://localhost:3002/api/survey/getsurveytoedit/' + surveyid,
                {
                    headers: { 'Authorization': `Bearer ${user.token}` },
                }
            );
            setSurvey(response.data[0]);
            setImgName(response.data[0].surveyImage);

        } catch (error) {
            console.log(error.response.status)
            if (error.response.status === 401) {
                console.log('forwarding;....')
                history("/404");
            }
        }
    }

    useEffect(() => {

        handleSubmit();
    }, [])

    // const toast = useToast()
    const loadImage = (imageName) => {
        setImgName(imageName)
    }

    return (
        <>
            <Flex flexDirection={'column'} gap={'20px'} mb={'20px'}>
                <Card
                    backgroundImage={'url("http://localhost:3002/api/survey/images/' + ImgName + '")'}
                    backgroundSize={'cover'}
                    backgroundPosition={'center'}
                >
                    <Card height={'s'}
                        p={'25px 20px'}
                        backgroundColor="grey"
                        backdropFilter={'blur(5px)'}
                        color={'white'}
                        boxShadow={'none'}
                    >
                        <CardHeader>
                            <Flex justifyContent='space-between' alignItems={'center'} w='100%' flexDirection={'row'}>

                                <Flex gap='10px' flexDir={'column'}>

                                    <Heading>
                                        <Text display={'flex'} gap={'20px'} alignItems={'center'}>{survey?.surveyName}
                                            <Tag fontWeight={'bold'} colorScheme={'yellow'}>{survey?.approvalStatus.toUpperCase()}</Tag>
                                        </Text>
                                    </Heading>
                                    <Text>
                                        <Text >{survey?.surveyDescription}</Text>

                                    </Text>
                                </Flex>



                            </Flex>
                        </CardHeader>
                    </Card>
                </Card>


            </Flex>
            <Card flex={1} flexDirection={'row'} gap={'20px'}>


                <Tabs isLazy variant='enclosed' width={'100%'} height={'100%'}>
                    <TabList>
                        <Tab>Details</Tab>
                        <Tab>Data</Tab>

                    </TabList>

                    <TabPanels height={'95%'} >
                        <TabPanel display={'flex'} flexDirection={'column'} height={'100%'} gap={'50px'}>
                            <Flex flexDirection={'row'} width={'100%'} gap={'20px'}>
                                <Flex flexDirection={'column'} padding={'40px'} backgroundColor={'brand.dashboardBackground'} height={'300px'} borderRadius={'20px'} width={'50%'}>
                                    <VStack alignItems={'flex-start'}>

                                        <Text fontWeight={'semibold'}>Type :</Text>
                                        <Text fontWeight={'semibold'}>Duration :</Text>
                                        <Text fontWeight={'semibold'}>Start Date :</Text>
                                        <Text fontWeight={'semibold'}>End Date :</Text>
                                        <Text fontWeight={'semibold'}>No. of questions : </Text>
                                        <Text fontWeight={'semibold'}>Pricing : </Text>
                                    </VStack>
                                </Flex>

                                <Flex flexDirection={'column'} padding={'40px'} backgroundColor={'brand.dashboardBackground'} height={'300px'} borderRadius={'20px'} width={'50%'}>
                                    <VStack alignItems={'flex-start'}>

                                        <Text fontWeight={'semibold'}>Responses :</Text>
                                        <Text fontWeight={'semibold'}>Users viewed:</Text>
                                        <Text fontWeight={'semibold'}>Useful responses : ???</Text>
                                        <Text fontWeight={'semibold'}>Targeted User Group :</Text>

                                    </VStack>
                                </Flex>


                            </Flex>
                            <Flex flexDirection={'column'} borderRadius={'20px'} width={'100%'} gap={'20px'} >


                                <Flex flexDirection={'column'} borderRadius={'20px'} minHeight={'200px'} width={'100%'} gap={'20px'} padding={'30px'} border={'1px solid grey'} >
                                    <Text fontWeight={'bold'} fontStyle={'italic'}>
                                        Question 1
                                    </Text>
                                    <Text fontWeight={'bold'}>Multiple Choice</Text>
                                    <Text>
                                        How aware are you of the modern art sphere in Sri Lanka? Rate from 1 - 5
                                    </Text>
                                    <Flex flexDir={'column'} gap={'20px'}>
                                        <Text>OPTIONS:</Text>
                                        <Text>1. Not aware at all</Text>
                                        <Text>2. Somewhat aware</Text>
                                        <Text>3. Aware</Text>
                                        <Text>4. Very aware</Text>
                                        <Text>5. Extremely aware</Text>
                                    </Flex>
                                </Flex>
                                <Flex flexDirection={'column'} borderRadius={'20px'} minHeight={'200px'} width={'100%'} gap={'20px'} padding={'30px'} border={'1px solid grey'} >
                                    <Text fontWeight={'bold'} fontStyle={'italic'}>
                                        Question 1
                                    </Text>
                                    <Text fontWeight={'bold'}>Multiple Choice</Text>
                                    <Text>
                                        How aware are you of the modern art sphere in Sri Lanka? Rate from 1 - 5
                                    </Text>
                                    <Flex flexDir={'column'} gap={'20px'}>
                                        <Text>OPTIONS:</Text>
                                        <Text>1. Not aware at all</Text>
                                        <Text>2. Somewhat aware</Text>
                                        <Text>3. Aware</Text>
                                        <Text>4. Very aware</Text>
                                        <Text>5. Extremely aware</Text>
                                    </Flex>
                                </Flex>
                                <Flex flexDirection={'column'} borderRadius={'20px'} minHeight={'200px'} width={'100%'} gap={'20px'} padding={'30px'} border={'1px solid grey'} >
                                    <Text fontWeight={'bold'} fontStyle={'italic'}>
                                        Question 1
                                    </Text>
                                    <Text fontWeight={'bold'}>Multiple Choice</Text>
                                    <Text>
                                        How aware are you of the modern art sphere in Sri Lanka? Rate from 1 - 5
                                    </Text>
                                    <Flex flexDir={'column'} gap={'20px'}>
                                        <Text>OPTIONS:</Text>
                                        <Text>1. Not aware at all</Text>
                                        <Text>2. Somewhat aware</Text>
                                        <Text>3. Aware</Text>
                                        <Text>4. Very aware</Text>
                                        <Text>5. Extremely aware</Text>
                                    </Flex>
                                </Flex>
                                <Flex flexDirection={'column'} borderRadius={'20px'} minHeight={'200px'} width={'100%'} gap={'20px'} padding={'30px'} border={'1px solid grey'} >
                                    <Text fontWeight={'bold'} fontStyle={'italic'}>
                                        Question 1
                                    </Text>
                                    <Text fontWeight={'bold'}>Multiple Choice</Text>
                                    <Text>
                                        How aware are you of the modern art sphere in Sri Lanka? Rate from 1 - 5
                                    </Text>
                                    <Flex flexDir={'column'} gap={'20px'}>
                                        <Text>OPTIONS:</Text>
                                        <Text>1. Not aware at all</Text>
                                        <Text>2. Somewhat aware</Text>
                                        <Text>3. Aware</Text>
                                        <Text>4. Very aware</Text>
                                        <Text>5. Extremely aware</Text>
                                    </Flex>
                                </Flex>
                                <Flex flexDirection={'column'} borderRadius={'20px'} minHeight={'200px'} width={'100%'} gap={'20px'} padding={'30px'} border={'1px solid grey'} >
                                    <Text fontWeight={'bold'} fontStyle={'italic'}>
                                        Question 1
                                    </Text>
                                    <Text fontWeight={'bold'}>Multiple Choice</Text>
                                    <Text>
                                        How aware are you of the modern art sphere in Sri Lanka? Rate from 1 - 5
                                    </Text>
                                    <Flex flexDir={'column'} gap={'20px'}>
                                        <Text>OPTIONS:</Text>
                                        <Text>1. Not aware at all</Text>
                                        <Text>2. Somewhat aware</Text>
                                        <Text>3. Aware</Text>
                                        <Text>4. Very aware</Text>
                                        <Text>5. Extremely aware</Text>
                                    </Flex>
                                </Flex>


                            </Flex>


                        </TabPanel>
                        <TabPanel>

                            <p>two!</p>

                        </TabPanel>

                    </TabPanels>
                </Tabs>

            </Card>
        </>
    )
}

export const variants = {
    show: {
        opacity: 1, y: 0, transition: {
            ease: 'easeOut', duration: 0.3
        }
    }, hide: {
        y: -20, opacity: 0
    }
};

export default ViewSurvey