import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Cropper from './cropper.tsx'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useParams } from 'react-router-dom';
import {
    Card, CardBody, CardHeader, Heading, Text, Flex, Button, IconButton,

} from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import {
    DeleteIcon
} from '@chakra-ui/icons'
import createsurveybg from '../../assets/images/createsurveybg.png'

import AddQuestionModal from '../../components/organisation/AddQuestionModal'


const QuestionCard = ({ surveyid, question, refreshdata }) => {
    const handleDelete = async () => {
        try {
            // Make an HTTP DELETE request to your backend API
            await axios.put(`http://opinionlk.azurewebsites.net:3002/api/survey/deleteQuestion/${surveyid}`, {
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
                    fontWeight={'bold'}>{question ? question.responseType.toUpperCase() : null }</Text><IconButton aria-label={'delete'}
                        icon={<DeleteIcon />}
                        onClick={handleDelete} /></Flex></CardBody>
    </Card>)
}

const EditSurvey = () => {

    const history = useNavigate();

    const {
        // eslint-disable-next-line
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
            const response = await axios.get('http://opinionlk.azurewebsites.net:3002/api/survey/getsurvey/' + surveyid,
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
// eslint-disable-next-line react-hooks/exhaustive-deps
   useEffect(() => { handleSubmit(); }, [])

    // const toast = useToast()
    const loadImage = (imageName) => {
        setImgName(imageName)
    }

    return (

        <Flex flexDirection={'column'} gap={'20px'}>
            <Card
                backgroundImage={'url("http://opinionlk.azurewebsites.net:3002/api/survey/images/' + ImgName + '")'}
                backgroundSize={'cover'}
                backgroundPosition={'center'}
            >
                <Card height={'s'}
                    p={'25px 20px'}
                    backgroundColor="rgba(0, 0, 0, 0.2)"
                    backdropFilter={'blur(5px)'}
                    color={'white'}
                    boxShadow={'none'}
                >
                    <CardHeader>
                        <Flex justifyContent='space-between' alignItems={'center'} w='100%' flexDirection={'row'}>

                            <Flex gap='10px' flexDir={'column'}>

                                <Heading>
                                    <Text >{survey?.surveyName}</Text>
                                </Heading>
                                <Text>
                                    <Text >{survey?.surveyDescription}</Text>

                                </Text>
                            </Flex>
                            <Cropper loadImage={loadImage} />


                        </Flex>
                    </CardHeader>
                </Card>
            </Card>

            <Flex flex={1} height={'100vh'} flexDirection={'row'} gap={'20px'}>

                <Card height={'100%'} background={'none'} boxShadow={'none'} display={'flex'} flex={4}>
                    <CardHeader justifyContent={'space-between'} display={'flex'} flexDirection={'row'}>
                        <Heading size={'md'} color={'brand.textDarkPurple'}>Questions</Heading>
                        <Flex gap={'10px'}>

                            <AddQuestionModal onUpdateContent={handleContentUpdate} />
                            <Button colorScheme={'teal'}>Preview Survey</Button>
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <Flex width={'100%'} flexDirection={'column'} gap={'20px'}>
                            <AnimatePresence>
                                {survey?.questions.length === 0 ? <Text>No questions added yet</Text> :

                                    survey?.questions.map(question => (<motion.div
                                        key={question._id}
                                        initial={{ opacity: 0, y: -50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, transition: { duration: 0.3 } }}
                                    >
                                        <QuestionCard surveyid={survey.surveyID} question={question}
                                            refreshdata={handleSubmit} />
                                    </motion.div>

                                    ))

                                }
                            </AnimatePresence>

                        </Flex>
                    </CardBody>
                </Card>

                <Card flex={1} backgroundImage={createsurveybg} boxShadow='2xl' height={'30%'} backgroundSize={'cover'}
                    padding={'30px'} borderRadius={'10px'} justifyContent={'center'} flexDirection={'column'}
                    alignItems={'center'}>

                    <Text fontSize={'24px'} color={'white'} fontWeight={'bold'}>
                        Ready to publish your survey?
                    </Text>
                    <Text pb={'20px'} color={'white'} fontWeight={'normal'}>Request for approval</Text>
                    <Button size={'lg'} width={'90%'} colorScheme='brand'>
                        Request
                    </Button>

                </Card>
            </Flex>
        </Flex>

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

export default EditSurvey