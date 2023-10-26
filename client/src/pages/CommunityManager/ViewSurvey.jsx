import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Picker from "@emoji-mart/react";

import {
    FormErrorMessage,
    FormLabel,
    FormControl,

} from '@chakra-ui/react'

import data from "@emoji-mart/data";

import { useAuthContext } from '../../hooks/useAuthContext.js';
import { useParams } from 'react-router-dom';
import {
    Card, CardBody, CardHeader, Heading, Text, Flex, Button, IconButton,
    Tabs, TabList, TabPanels, Tab, TabPanel, Radio, VStack, Tag, HStack

} from '@chakra-ui/react';

import { useForm, Controller, set, get } from 'react-hook-form';

import MultipleChoice from "../../components/Surveyee/MultipleChoice";
import LongAnswer from "../../components/Surveyee/LongAnswer"
import ShortAnswer from "../../components/Surveyee/ShortAnswer"
import {
    Progress,
    Modal,
    Link,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    RadioGroup,
    Checkbox,
    Box
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

import Survey from '../../components/Surveyee/Survey.jsx';
import { useNavigate } from 'react-router-dom';
import {
    DeleteIcon,
    StarIcon

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
                {/* <Text>{question.question}</Text></Flex><Flex gap={'20px'} alignItems={'center'}><Text
                    fontWeight={'bold'}>{question ? question.responseType.toUpperCase() : null}</Text> */}
                <IconButton aria-label={'delete'}
                    icon={<DeleteIcon />}
                    onClick={handleDelete} />
            </Flex></CardBody>
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
            const response = await axios.get('http://localhost:3002/api/survey/getsurveytoreview/' + surveyid,
                {
                    headers: { 'Authorization': `Bearer ${user.token}` },
                }
            );
            console.log(response)
            setSurvey(response.data);
            // setImgName(response.data[0].surveyImage);

        } catch (error) {
            console.log(error)
            // console.log(error.response.status)
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
                                        {console.log(survey)}
                                        <Text display={'flex'} gap={'20px'} alignItems={'center'}>{survey?.surveyName}
                                            {/* <Tag fontWeight={'bold'} colorScheme={'yellow'}>{survey?.approvalStatus.toUpperCase()}</Tag> */}
                                        </Text>
                                    </Heading>
                                    <Text>
                                        <Text >{survey?.surveyDescription}</Text>

                                    </Text>
                                </Flex>



                            </Flex>
                        </CardHeader>
                        {console.log(survey)}
                        <ReturnFocus question={survey?.questions}
                            surveyid={surveyid} />
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
function ReturnFocus({ surveyid, question }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = React.useRef(null)
    // get token from context
    const {
        user, dispatch, userData
    } = useAuthContext();
    const history = useNavigate();


    // set up state to track flgged questions
    const [flaggedQuestions, setFlaggedQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < question?.length - 1) {
            setCurrentQuestionIndex((prevIndex) => {
                console.log("New index " + (prevIndex + 1));
                return prevIndex + 1;
            });
        }
    };


    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prevIndex) => {
                console.log("New index " + (prevIndex - 1));
                getFeedbackForQuestion(prevIndex - 1);
                return prevIndex - 1;
            });
        }
    };

    const getFeedbackForQuestion = (questionIndex) => {
        // find feedback from the flagged questions array of objects
        console.log(questionIndex)
        let feedback = flaggedQuestions.find((item) => item.questionIndex === questionIndex);
        // update react hook input field with feedback
        setValue('feedback', feedback.feedback);

        console.log(feedback)
    };

    const [showField, setShowField] = useState(false);
    const [questionFeedback, setQuestionFeedback] = useState('');
    const [proceed, setProceed] = useState(false);
    const MoodPreview = ({ items }) => {

        return (
            <Flex gap={"10px"} wrap={"wrap"}>
                {items.map((item, index) => (
                    <Flex key={index} flexDirection={"column"} gap={"10px"}
                    >
                        <Flex gap={"0px"} height={"100px"} width={"100px"} backgroundColor={"white"} justifyContent={"center"} alignItems={"center"} boxShadow={"lg"} border={"1px"} borderColor={"gray"} borderRadius={"lg"} flexDirection={"column"}>
                            <Flex fontSize="60px" lineHeight={"65px"}>
                                <em-emoji id={items[index].emoji} set="apple" size=""></em-emoji>
                            </Flex>
                            <Text noOfLines={1} width={"90%"} textAlign={"center"}>
                                {!item.option ? `Option ${index + 1}` : item.option}
                            </Text>
                        </Flex>
                    </Flex>
                ))}
            </Flex>
        )
    }
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm()

    function onSubmit(values) {
        console.log(values)

        let feedback = {
            questionIndex: currentQuestionIndex,
            feedback: values.feedback
        }
        // check if feedback for index already exists in array
        let index = flaggedQuestions.findIndex((item) => item.questionIndex === currentQuestionIndex);

        if (index === -1) {
            setFlaggedQuestions([...flaggedQuestions, feedback]);
            alert(flaggedQuestions)
        }
        else {
            let temp = [...flaggedQuestions];
            temp[index] = feedback;
            alert(temp)
            setFlaggedQuestions(temp);
        }


        setQuestionFeedback('');

    }



    console.log(flaggedQuestions)
    return (
        <>
            <Box ref={finalRef} tabIndex={-1} aria-label='Focus moved to this box'>
                Some other content that'll receive focus on close.
            </Box>

            <Button mt={4} onClick={onOpen}>
                Open Modal
            </Button>
            <Modal variant={"reviewModal"} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Review Survey</ModalHeader>
                    <ModalCloseButton />
                    {!proceed ? (
                        <ModalBody display={'flex'} justifyContent={"space-between"} alignItems={'center'} width={'100%'} height={'100%'} flexDirection={'column'}>

                            <Text> Please review all questions before sending feedback </Text>

                            <Flex padding={'10px'} justifyContent={'flex-start'} flex={1} height={'80%'} width={'100%'} flexDir={'column'}>
                                <Progress width={'100%'} colorScheme='green' size='sm' value={(currentQuestionIndex + 1 / question?.length) * 100} />
                                {question?.length > 0 && (
                                    <VStack gap={'10px'} alignItems={'flex-start'} mt={'10px'} mb={'10px'}>
                                        <Heading size={'sm'}>Question</Heading>
                                        <Text>{question[currentQuestionIndex].question}</Text>
                                        <Heading size={'sm'}>Question Type</Heading>
                                        <Text>{question[currentQuestionIndex].responseType}</Text>
                                        <Heading size={'sm'}>Response Option(s)</Heading>
                                        {question[currentQuestionIndex].responseType === "shorttext" && <Input disabled placeholder={'fe'} width={"100%"} />}

                                        {(question[currentQuestionIndex].responseType === "singlechoice" || question[currentQuestionIndex].responseType === "multiplechoice") && (
                                            <Flex flexDirection={"column"}>
                                                <RadioGroup defaultValue="1">
                                                    {question[currentQuestionIndex].items.map((item, index) => (
                                                        <Flex gap={"10px"} key={index}>


                                                            {question[currentQuestionIndex].responseType === "singlechoice" && (
                                                                <Radio value={index} backgroundColor={"white"}>
                                                                    <Text>{!item.option ? `Option ${index + 1}` : item.option}</Text>
                                                                </Radio>
                                                            )}
                                                            {question[currentQuestionIndex].responseType === "multiplechoice" && (
                                                                <Checkbox>
                                                                    <Text>{!item.option ? `Option ${index + 1}` : item.option}</Text>
                                                                </Checkbox>
                                                            )}

                                                        </Flex>
                                                    ))}
                                                </RadioGroup>
                                            </Flex>
                                        )}
                                        <Button onClick={() => {
                                            setShowField(!showField);
                                        }} disabled={currentQuestionIndex === question?.length - 1} icon={<StarIcon />}
                                            colorScheme={flaggedQuestions.includes(currentQuestionIndex) ? 'red' : 'gray'}
                                        >Flag Question</Button>
                                        {/* if flagged show feedback text box

                                         */}
                                        {showField
                                            && (
                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                    <FormControl isInvalid={errors.feedback}>
                                                        <FormLabel htmlFor='name'>Feedback</FormLabel>
                                                        <Input
                                                            id='feedback'
                                                            placeholder='Enter feedback'
                                                            {...register('feedback', {
                                                                required: 'This is required',
                                                                minLength: { value: 4, message: 'Minimum length should be 4' },
                                                            })}
                                                        />
                                                        <FormErrorMessage>
                                                            {errors.name && errors.name.message}
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                    <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                                                        Save
                                                    </Button>
                                                </form>
                                            )}
                                    </VStack>
                                )}
                            </Flex>


                            <HStack gap="10px">
                                <Button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}
                                    color={currentQuestionIndex === 0 ? 'gray' : 'black'}
                                >
                                    Previous
                                </Button>


                                {/* if feedback entered to text box then add to flagged questions
                                 */}

                                <Button onClick={handleNextQuestion} disabled={currentQuestionIndex === 0}
                                    color={currentQuestionIndex === question?.length - 1 ? 'gray' : 'black'}
                                >
                                    Next
                                </Button>

                                {currentQuestionIndex === question?.length - 1 && (
                                    <Button onClick={
                                        () => {
                                            setProceed(true);
                                        }}
                                        colorScheme='blue'>
                                        Proceed
                                    </Button>)
                                }

                            </HStack>


                        </ModalBody>
                    ) : (

                        <ModalBody display={'flex'} alignItems={'center'} width={'100%'} height={'100%'} flexDirection={'column'}>
                            <Link onClick={() => setProceed(false)}>Back to survey</Link>
                            <Flex width={'100%'} flexDirection={'column'}>

                                <Text>You have flagged the following questions</Text>
                                <HStack gap={'5px'}>

                                    {flaggedQuestions.map((index) => (
                                        <Button max-width={'fit-content'} disabled>
                                            {index + 1}
                                        </Button>
                                    ))}
                                </HStack>
                                <Text> Please provide feedback for the flagged questions </Text>
                                <Flex width={'100%'} flexDirection={'column'}>

                                    {flaggedQuestions.map((index) => (
                                        <Flex width={'100%'} flexDirection={'column'} gap={'10px'}>
                                            <Text>Question {index + 1}</Text>
                                            <Input placeholder={'Enter feedback'} />
                                        </Flex>
                                    ))}

                                </Flex>

                            </Flex>

                        </ModalBody>
                    )}

                    <ModalFooter>

                    </ModalFooter>
                </ModalContent>
            </Modal>
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