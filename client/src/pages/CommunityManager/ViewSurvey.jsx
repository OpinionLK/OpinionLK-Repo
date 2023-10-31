import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    useToast,
    Textarea,
    Table,
    Tbody,
    Tr,
    Td,
    TableContainer,
    Tag, Skeleton
} from '@chakra-ui/react'
import Status from '../../components/Status.jsx';
import {useAuthContext} from '../../hooks/useAuthContext.js';
import {useParams} from 'react-router-dom';
import {
    Card, CardHeader, Heading, Text, Flex, Button, Tabs, TabList, TabPanels, Tab, TabPanel, Radio, VStack, HStack
} from '@chakra-ui/react';

import {useForm} from 'react-hook-form';
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
    Checkbox
} from '@chakra-ui/react'
import {useDisclosure} from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom';
import {
    StarIcon
} from '@chakra-ui/icons'

const ViewSurvey = () => {
// eslint-disable-next-line
    const history = useNavigate();

    const {
        // eslint-disable-next-line
        user, dispatch, userData
    } = useAuthContext();
    const {surveyid} = useParams();
    const [ImgName, setImgName] = useState('default_bg')
    const [survey, setSurvey] = useState();
// eslint-disable-next-line
    const handleContentUpdate = (newContent) => {
        setSurvey(newContent);
        console.log(newContent);
    };


    async function handleSubmit() {
        try {
            const response = await axios.get('http://localhost:3002/api/survey/getsurveytoreview/' + surveyid, {
                headers: {'Authorization': `Bearer ${user.token}`},
            });

            setSurvey(response.data);
            console.log(response.data);
            setImgName(response.data.surveyImage);

        } catch (error) {
            console.log(error)
            // console.log(error.response.status)


        }
    }

    useEffect(() => {

        handleSubmit();
        // eslint-disable-next-line
    }, [])

    // const toast = useToast()


    return (<>
        <Flex flexDirection={'column'} gap={'20px'} mb={'20px'}>
            <Link onClick={() => history('/ComManager/allsurveys')}>Back to Surveys</Link>

            <Card
                backgroundImage={'url("https://ik.imagekit.io/7i3fql4kv7/survey_headers/' + ImgName + '")'}
                backgroundSize={'cover'}
                backgroundPosition={'center'}
            >
                <Card height={'s'}
                      p={'25px 20px'}
                    // backgroundColor="grey"
                      backgroundColor="rgba(0, 0, 0, 0.2)"
                      backdropFilter={'blur(5px)'}
                      color={'white'}
                      boxShadow={'none'}
                >
                    <CardHeader>
                        <Flex justifyContent='space-between' alignItems={'center'} w='100%' flexDirection={'row'}>
                            <Flex gap='10px' flexDir={'column'}>
                                <Heading>
                                    <Text display={'flex'} gap={'20px'} alignItems={'center'}>   {survey?.surveyName ? survey?.surveyName : (
                                        <Skeleton height={'50px'} width={'400px'} />

                                    )}
                                        <Status status={survey?.surveyStatus}/>
                                    </Text>
                                </Heading>
                                <Text>
                                    <Text fontSize={'sm'} fontStyle={'italic'}>Survey ID : {survey ? survey?.surveyID : <Skeleton height={'20px'} width={'200px'} /> }</Text>
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
                    <Tab>Overview</Tab>
                    {/*<Tab>Data</Tab>*/}

                </TabList>

                <TabPanels height={'95%'}>
                    <TabPanel display={'flex'} flexDirection={'column'} height={'100%'} gap={'50px'}>
                        <Flex flexDirection={'row'} width={'100%'} gap={'20px'}>
                            <Flex flexDirection={'column'} padding={'40px'} height={'300px'} borderRadius={'20px'}
                                  width={'50%'}>
                                <VStack gap={'40px'} alignItems={'flex-start'}>
                                    <Flex flexDirection={'column'} gap={'10px'}>
                                        <Heading size={'md'}>Description</Heading>
                                        <Text>{survey?.surveyDescription}</Text>
                                    </Flex>

                                    {survey?.surveyStatus === 'active' && (
                                        <Button colorScheme={'orange'}>Suspend</Button>)} <Heading
                                    size={'md'}>Actions</Heading>
                                    {survey?.surveyStatus === 'pending' && (<ReturnFocus question={survey?.questions}
                                                                                         surveyid={surveyid}/>)}
                                    {survey?.surveyStatus === 'active' && (
                                        <Button colorScheme={'orange'}>Suspend</Button>)}
                                </VStack>
                            </Flex>

                            <Flex flexDirection={'column'} padding={'40px'}
                                  backgroundColor={'brand.dashboardBackground'} 
                                  borderRadius={'20px'} width={'50%'} height={'100%'}>
                                <VStack alignItems={'flex-start'}>
                                    {survey?.surveyStatus === 'active' | survey?.surveyStatus === 'suspended' && (
                                        <Text fontWeight={'semibold'}>Responses : {survey?.responseCount}</Text>)}
                                    {/*<Text>Requested by: {survey?.creatorName}</Text>*/}
                                    {/*<Text>Created at : {new Date(survey?.created_date).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}</Text>*/}

                                    {/*<Text>Targeted User Group :</Text>*/}
                                    {/*<Text>No. of Questions : {survey?.questionCount}</Text>*/}
                                    {/*<Text>Ending Criteria :</Text>*/}
                                    {/*<Text>Target Duration :</Text>*/}
                                    {/*<Text>Target Responses :</Text>*/}
                                    <TableContainer width={'100%'}>
                                        <Table size='md' variant='simple'>
                                            <Tbody>
                                                <Tr>
                                                    <Td>Requested By:</Td>
                                                    <Td>{survey?.creatorName}</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>Created at:</Td>
                                                    <Td>{new Date(survey?.created_date).toLocaleString('en-US', {timeZone: 'Asia/Kolkata'})}</Td>
                                                </Tr>

                                                <Tr>
                                                    <Td rowspan={4}>Targeted User Group</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>Gender: {survey?.userTags[0]?.gender}</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>Birthyear
                                                        Range: {survey?.userTags[0]?.birthyear1} - {survey?.userTags[0]?.birthyear2}</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>City : {survey?.userTags[0]?.city}</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>
                                                        Interests:
                                                    </Td>
                                                    <Td>
                                                        <HStack>
                                                            {survey?.userTags && survey.userTags[0]?.interests && survey.userTags[0].interests.map((interest) => (
                                                                <Tag
                                                                    variant={'solid'}
                                                                    padding={'8px'}
                                                                    borderRadius='full'
                                                                    colorScheme={'purple'}
                                                                    fontWeight={'bold'}
                                                                >
                                                                    {interest}
                                                                </Tag>))}

                                                        </HStack>

                                                    </Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>No. of Questions:</Td>
                                                    <Td>{survey?.questionCount}</Td>
                                                </Tr>
                                            </Tbody>

                                        </Table>
                                    </TableContainer>


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
    </>)
}

function ReturnFocus({surveyid, question}) {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const finalRef = React.useRef(null)
    // get token from context
    const {
        // eslint-disable-next-line
        user, dispatch, userData
    } = useAuthContext();
    // eslint-disable-next-line
    const history = useNavigate();


    // set up state to track flgged questions
    const [flaggedQuestions, setFlaggedQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < question?.length - 1) {
            setCurrentQuestionIndex((prevIndex) => {
                console.log("New index " + (prevIndex + 1));
                setShowField(false);

                getFeedbackForQuestion(prevIndex + 1);
                return prevIndex + 1;
            });
        }
    };


    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prevIndex) => {
                console.log("New index " + (prevIndex - 1));
                setShowField(false);
                getFeedbackForQuestion(prevIndex - 1);
                return prevIndex - 1;
            });
        }
    };


    const getFeedbackForQuestion = (questionIndex) => {
        console.log(questionIndex);

        // Find feedback from the flaggedQuestions array of objects
        const feedback = flaggedQuestions.find((item) => item.questionIndex === questionIndex);

        if (feedback) {
            // If feedback is found, update the React hook input field with feedback
            setValue('feedback', feedback.feedback);
            setShowField(true);
            console.log(feedback);
        } else {
            // Handle the case where feedback is not found
            console.log('Feedback not found for question index: ' + questionIndex);
            setValue('feedback', '');
            // You can choose to set a default value or show an error message, depending on your requirements.
        }
    };

    const [showField, setShowField] = useState(false);
    // eslint-disable-next-line
    const [questionFeedback, setQuestionFeedback] = useState('');
    const [proceed, setProceed] = useState(false);
    // eslint-disable-next-line
    const MoodPreview = ({items}) => {

        return (<Flex gap={"10px"} wrap={"wrap"}>
            {items.map((item, index) => (<Flex key={index} flexDirection={"column"} gap={"10px"}
            >
                <Flex gap={"0px"} height={"100px"} width={"100px"} backgroundColor={"white"}
                      justifyContent={"center"} alignItems={"center"} boxShadow={"lg"} border={"1px"}
                      borderColor={"gray"} borderRadius={"lg"} flexDirection={"column"}>
                    <Flex fontSize="60px" lineHeight={"65px"}>
                        <em-emoji id={items[index].emoji} set="apple" size=""></em-emoji>
                    </Flex>
                    <Text noOfLines={1} width={"90%"} textAlign={"center"}>
                        {!item.option ? `Option ${index + 1}` : item.option}
                    </Text>
                </Flex>
            </Flex>))}
        </Flex>)
    }
    const {
        handleSubmit, register, setValue, formState: {errors, isSubmitting},
    } = useForm()

    const toast = useToast()
    const SendFeedback = async (values) => {
        let message = '';
        for (let i = 0; i < flaggedQuestions.length; i++) {
            message += `Question ${flaggedQuestions[i].questionIndex + 1}: ${flaggedQuestions[i].feedback}\n`;
        }
        message += '\nAdditional Feedback:\n';
        message += values.message;

        try {
            const response = await axios.put('http://localhost:3002/api/survey/insertcomment/' + surveyid, {
                comment: message
            }, {
                headers: {'Authorization': `Bearer ${user.token}`},
            });

            if (response.status === 200) {

                toast({
                    title: 'Feedback Published.', // description: "We've created your account for you.",
                    status: 'success', duration: 9000, isClosable: true,

                })
            }

        } catch (error) {
            console.log(error)
            // console.log(error.response.status)
            alert('Error sending feedback');
        }
        console.log(message);
        onClose();
    }

    function onSubmit(values) {
        console.log(values)

        let feedback = {
            questionIndex: currentQuestionIndex, feedback: values.feedback
        }
        // check if feedback for index already exists in array
        let index = flaggedQuestions.findIndex((item) => item.questionIndex === currentQuestionIndex);

        if (index === -1) {
            setFlaggedQuestions([...flaggedQuestions, feedback]);
        } else {
            let temp = [...flaggedQuestions];
            temp[index] = feedback;
            setFlaggedQuestions(temp);
        }
        setQuestionFeedback('');

    }

    async function approve() {
        try {
            // eslint-disable-next-line
            const response = await axios.put('http://localhost:3002/api/survey/changestatus/' + surveyid, {
                state: 'approved'
            }, {
                headers: {'Authorization': `Bearer ${user.token}`},
            });
        } catch (error) {
            console.log(error)
            // console.log(error.response.status)
            alert('Error approving survey');
        }
    }

    return (<>
        <Button mt={4} onClick={onOpen}>
            Review
        </Button>
        <Modal variant={"reviewModal"} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Review Survey</ModalHeader>
                <ModalCloseButton/>
                {!proceed ? (<ModalBody display={'flex'} justifyContent={"space-between"} alignItems={'center'}
                                        width={'100%'} height={'100%'} flexDirection={'column'}>

                    <Text> Please review all questions before sending feedback </Text>

                    <Flex padding={'10px'} justifyContent={'flex-start'} flex={1} height={'80%'} width={'100%'}
                          flexDir={'column'}>
                        <Progress width={'100%'} colorScheme='green' size='sm'
                                  value={(currentQuestionIndex + 1 / question?.length) * 100}/>
                        {question?.length > 0 && (
                            <VStack gap={'10px'} alignItems={'flex-start'} mt={'10px'} mb={'10px'}>
                                <Heading size={'sm'}>Question</Heading>
                                <Text>{question[currentQuestionIndex].question}</Text>
                                <Heading size={'sm'}>Question Type</Heading>
                                <Text>{question[currentQuestionIndex].responseType}</Text>
                                <Heading size={'sm'}>Response Option(s)</Heading>
                                {question[currentQuestionIndex].responseType === "shorttext" &&
                                    <Input disabled placeholder={'fe'} width={"100%"}/>}

                                {(question[currentQuestionIndex].responseType === "singlechoice" || question[currentQuestionIndex].responseType === "multiplechoice") && (
                                    <Flex flexDirection={"column"}>
                                        <RadioGroup defaultValue="1">
                                            {question[currentQuestionIndex].items.map((item, index) => (
                                                <Flex gap={"10px"} key={index}>


                                                    {question[currentQuestionIndex].responseType === "singlechoice" && (
                                                        <Radio value={index} backgroundColor={"white"}>
                                                            <Text>{!item.option ? `Option ${index + 1}` : item.option}</Text>
                                                        </Radio>)}
                                                    {question[currentQuestionIndex].responseType === "multiplechoice" && (
                                                        <Checkbox>
                                                            <Text>{!item.option ? `Option ${index + 1}` : item.option}</Text>
                                                        </Checkbox>)}

                                                </Flex>))}
                                        </RadioGroup>
                                    </Flex>)}
                                <Button onClick={() => {
                                    if (showField) {
                                        // delete feedback from flagged questions
                                        let index = flaggedQuestions.findIndex((item) => item.questionIndex === currentQuestionIndex);
                                        if (index !== -1) {
                                            let temp = [...flaggedQuestions];
                                            temp.splice(index, 1);
                                            setFlaggedQuestions(temp);
                                        }

                                    }
                                    setShowField(!showField);
                                }} disabled={currentQuestionIndex === question?.length - 1} icon={<StarIcon/>}
                                        colorScheme={flaggedQuestions.includes(currentQuestionIndex) ? 'red' : 'gray'}
                                >Flag Question</Button>
                                {showField && (<Flex>

                                        <form
                                            onSubmit={handleSubmit(onSubmit)}
                                            // width 100
                                            width={'100%'}
                                        >
                                            <FormControl isInvalid={errors.feedback}>
                                                <FormLabel htmlFor='name'>Feedback</FormLabel>
                                                <Textarea
                                                    id='feedback'
                                                    placeholder='Enter feedback'
                                                    {...register('feedback', {
                                                        required: 'This is required', minLength: {
                                                            value: 4, message: 'Minimum length should be 4'
                                                        },
                                                    })}
                                                />
                                                <FormErrorMessage>
                                                    {errors.name && errors.name.message}
                                                </FormErrorMessage>
                                            </FormControl>
                                            <Button mt={4} colorScheme='teal' isLoading={isSubmitting}
                                                    type='submit'>
                                                Save
                                            </Button>
                                        </form>
                                    </Flex>

                                )}
                            </VStack>)}
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

                        {currentQuestionIndex === question?.length - 1 && (<Button onClick={() => {
                            setProceed(true);
                        }}
                                                                                   colorScheme='blue'>
                            Proceed
                        </Button>)}

                    </HStack>


                </ModalBody>) : (showField && flaggedQuestions.length > 0) ? (

                    <ModalBody display={'flex'} alignItems={'center'} width={'100%'} height={'100%'}
                               flexDirection={'column'}>
                        <Link onClick={() => setProceed(false)}>Back to survey</Link>
                        <Flex width={'100%'} flexDirection={'column'}>

                            <Text>You have flagged the following questions</Text>
                            <HStack gap={'5px'}>

                                {flaggedQuestions.map((index) => (<Button max-width={'fit-content'} disabled>
                                    {index.questionIndex + 1}
                                </Button>))}
                            </HStack>
                            <Text> Enter Additional Feedback</Text>
                            <Flex width={'100%'} flexDirection={'column'}>

                                <form onSubmit={handleSubmit(SendFeedback)}>
                                    <FormControl isInvalid={errors.feedback}>
                                        <FormLabel htmlFor='name'>Feedback</FormLabel>
                                        <Textarea
                                            id='feedback'
                                            placeholder='Enter feedback'
                                            {...register('message', {
                                                required: 'This is required', minLength: {
                                                    value: 4, message: 'Minimum length should be 4'
                                                },
                                            })}
                                        />
                                        <FormErrorMessage>
                                            {errors.name && errors.name.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <Button mt={4} colorScheme='teal' isLoading={isSubmitting}
                                            type='submit'>
                                        Save
                                    </Button>
                                </form>

                            </Flex>

                        </Flex>

                    </ModalBody>) : (<ModalBody display={'flex'} alignItems={'center'} width={'100%'} height={'100%'}
                                                flexDirection={'column'}>
                    <Link onClick={() => setProceed(false)}>Back to survey</Link>
                    <Flex width={'100%'} flexDirection={'column'}>

                        <Text>You have not flagged any questions, do you wish to approve this survey for
                            payment and publish this on the OpinionLK?</Text>
                        <HStack gap={'5px'}>
                            <Button onClick={() => {
                                setProceed(false);
                                onClose();
                            }}>No</Button>
                            <Button onClick={() => {
                                approve();
                                onClose();
                            }} colorScheme={'green'}>Yes</Button>
                        </HStack>

                    </Flex>

                </ModalBody>)

                }

                <ModalFooter>

                </ModalFooter>
            </ModalContent>
        </Modal>
    </>)

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