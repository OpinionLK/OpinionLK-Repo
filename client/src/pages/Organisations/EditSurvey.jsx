import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Cropper from './cropper.tsx'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useParams } from 'react-router-dom';
import {
    Card, CardBody, CardHeader, Heading, Text, Flex, Button, IconButton, Modal,
    ModalOverlay,
    ModalContent,

    useToast,
    ModalHeader,
    Slider,
    SliderTrack,
    SliderMark,

    SliderFilledTrack,
    Box,
    SliderThumb,
    ModalFooter,
    Tooltip,
    FormControl,
    FormLabel,
    Input,
    ModalBody,
    ModalCloseButton,
    Select,
    Icon,

} from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import {
    DeleteIcon,

    DragHandleIcon
} from '@chakra-ui/icons'
import createsurveybg from '../../assets/images/createsurveybg.png'

import { useDisclosure } from '@chakra-ui/react';

import { QuestionOutlineIcon } from '@chakra-ui/icons'


import EditQuestionModal from '../../components/organisation/EditQuestionModal.jsx'
import { set } from 'mongoose';


function InitialFocus({ surveyid }) {
    const toast = useToast()

    const {
        user, dispatch, userData
    } = useAuthContext();

    const setPending = async () => {
        try {
            console.log(user.token)
            const response = await axios.put(`http://localhost:3002/api/survey/changestatus/${surveyid}`,
                {
                    state: 'pending'

                },
                {
                    headers: { 'Authorization': `Bearer ${user.token}` },
                },
            );

            if (response.status === 200) {
                onClose();
                toast({
                    title: 'Request Sent',
                    description: "We will get back to you shortly.",
                    status: 'success',
                    position: 'bottom-right',
                    duration: 9000,
                    isClosable: true,
                })
            }

        } catch (error) {
            console.log(error)
        }


    }

    const [baseCost, setBaseCost] = useState(0);
    const [costPerResponse, setCostPerResponse] = useState(0);
    const [perDayCost, setPerDayCost] = useState(0);
    const [maxDuration, setMaxDuration] = useState(0);
    const [perQuestionCost, setPerQuestionCost] = useState(0);
    const [questionCount, setQuestionCount] = useState(0);

    const getSurveyConstraints = async () => {
        try {
            console.log(user.token)
            const response1 = await axios.get(`http://localhost:3002/api/survey/getplatformdata`,
                {
                    headers: { 'Authorization': `Bearer ${user.token}` },
                },
            );
            const response2 = await axios.get(`http://localhost:3002/api/survey/getquestioncount/${surveyid}`,
                {
                    headers: { 'Authorization': `Bearer ${user.token}` },
                },
            );

            if (response1.status === 200 && response2.status === 200) {
                setBaseCost(response1.data.surveyBaseCost);
                setCostPerResponse(response1.data.surveyCostPerResponse);
                setPerDayCost(response1.data.perDayCost);
                setMaxDuration(response1.data.maxDuration);
                setPerQuestionCost(response1.data.perQuestionCost);
                setQuestionCount(response2.data);
                alert(response2.data)
            }

        } catch (error) {
            console.log(error)
        }
    }
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const [duration, setDuration] = useState('7');
    const [targetResponses, SetTargetResponses] = useState('300');
    const labelStyles = {


        ml: '-2.5',
        fontSize: 'sm',
    }
    const [total, setTotal] = useState(0);
    const calculate = () => {
        console.log(baseCost);
        console.log(duration);
        console.log(targetResponses);
        
        setTotal(baseCost + (costPerResponse * targetResponses) + (perDayCost * duration) + (perQuestionCost * questionCount));
        
    }
    useEffect(() => {

        getSurveyConstraints();
    }
        , [])
    return (
        <>
            <Button size={'lg'} width={'90%'} colorScheme='brand' onClick={onOpen}>Request for Approval</Button>
            {user.id}

            <Modal
                initialFocusRef={initialRef}
                size={'xl'}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>We need a few more details regarding your survey</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Choose a Target Audience <Tooltip placement='auto-start' label="A target audience is the catergory of people you wish to present this survey to." aria-label='A tooltip'><Icon as={QuestionOutlineIcon} />
                            </Tooltip>
                            </FormLabel>
                            <Select placeholder="Select option">
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                            </Select>

                        </FormControl>

                        <FormControl mt={4} p={'30px 30px'}>
                            <FormLabel>Choose the maximum number of responses you wish to collect</FormLabel>
                            <Slider
                                min={100}
                                value={targetResponses}
                                max={500}
                                mt={'40px'} aria-label='slider-ex-6' onChange={(val) => {
                                    SetTargetResponses(val)
                                    console.log(val)

                                }}>
                                <SliderMark value={100} {...labelStyles}>
                                    100
                                </SliderMark>
                                <SliderMark value={200} {...labelStyles}>
                                    200
                                </SliderMark>
                                <SliderMark value={300} {...labelStyles}>
                                    300
                                </SliderMark>
                                <SliderMark value={400} {...labelStyles}>
                                    400
                                </SliderMark>
                                <SliderMark value={500} {...labelStyles}>
                                    500
                                </SliderMark>


                                <SliderTrack>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <SliderThumb />
                            </Slider>
                        </FormControl>
                        <FormControl mt={4} p={'30px 30px'}>
                            <FormLabel>Choose the number of days you wish to keep the survey active</FormLabel>

                            <Slider
                                min={1}
                                value={duration}
                                max={14}
                                mt={'40px'} aria-label='slider-ex-6' onChange={(val) => {
                                    setDuration(val)
                                   console.log(val)
                                }}>


                                <SliderMark value={1} {...labelStyles}>
                                    1
                                </SliderMark>
                                <SliderMark value={2} {...labelStyles}>
                                    2
                                </SliderMark>
                                <SliderMark value={3} {...labelStyles}>
                                    3
                                </SliderMark>
                                <SliderMark value={4} {...labelStyles}>
                                    4
                                </SliderMark>
                                <SliderMark value={5} {...labelStyles}>
                                    5
                                </SliderMark>
                                <SliderMark value={6} {...labelStyles}>
                                    6
                                </SliderMark>
                                <SliderMark value={7} {...labelStyles}>
                                    7
                                </SliderMark>
                                <SliderMark value={8} {...labelStyles}>
                                    8
                                </SliderMark>
                                <SliderMark value={9} {...labelStyles}>
                                    9
                                </SliderMark>
                                <SliderMark value={10} {...labelStyles}>
                                    10
                                </SliderMark>
                                <SliderMark value={11} {...labelStyles}>
                                    11
                                </SliderMark>
                                <SliderMark value={12} {...labelStyles}>
                                    12
                                </SliderMark>
                                <SliderMark value={13} {...labelStyles}>
                                    13
                                </SliderMark>
                                <SliderMark value={14} {...labelStyles}>
                                    14
                                </SliderMark>


                                {/* 
                                <SliderMark
                                    value={duration}
                                    textAlign='center'
                                    bg='blue.500'
                                    color='white'
                                    mt='-10'
                                    ml='-5'
                                    w='12'
                                >
                                    {duration}
                                </SliderMark> */}
                                <SliderTrack>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <SliderThumb />
                            </Slider>
                        </FormControl>

                        <Button onClick={() => {
                            calculate();
                        }
                        }>Get Cost</Button>
                        <Text mt={4}>Estimated Cost: </Text>
                        <Heading>Rs. {total}.00</Heading>
                        <Text size={'sm'}>You will be able to make the payment after youre survey has been approved</Text>
                        <Text size={'sm'} color='orange' fontWeight={'bold'}>NOTE: You will not be able to modify your survey after you request approval!</Text>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' onClick={setPending}>
                            Proceed
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

const QuestionCard = ({ surveyid, question, approvalStatus, refreshdata, handleSubmit }) => {

    const toast = useToast()

    const handleDelete = async () => {



        try {
            // Make an HTTP DELETE request to your backend API
            await axios.put(`http://localhost:3002/api/survey/deleteQuestion/${surveyid}`, {
                questionid: question.questionID
            });

            OnDeleteClose();
            refreshdata();
            toast({
                title: 'Question Deleted',

                status: 'warning',
                position: 'bottom-right',
                duration: 9000,
                isClosable: true,
            })


        } catch (error) {
            console.error('Error deleting question:', error);
        }
    };
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: OnDeleteClose } = useDisclosure()
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: OnEditClose } = useDisclosure()

    return (
        <>
            <Modal isOpen={isDeleteOpen} onClose={OnDeleteClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Cannot be recovered
                    </ModalBody>

                    <ModalFooter>
                        <Button variant={'outline'} mr={3} onClick={OnDeleteClose}>
                            Close
                        </Button>
                        <Button colorScheme='red' onClick={handleDelete}>Delete</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Card cursor="pointer" transition={'0.3s'}>
                <CardBody borderRadius={'20px'} display={'flex'} justifyContent={'space-between'}
                    alignItems={'center'}><Flex gap={'20px'}>
                        {/* <Text fontWeight={'bold'} color={'brand.textDarkPurple'}></Text> */}
                        <Text>{question.question}</Text></Flex><Flex gap={'20px'} alignItems={'center'}><Text
                            fontWeight={'bold'}>{question ? question.responseType.toUpperCase() : null}</Text>
                        {
                            approvalStatus == 'pending' ? null : (
                                <EditQuestionModal questionID={question.questionID} refreshdata={handleSubmit} mode={'edit'} />
                            )
                        }

                        <IconButton aria-label={'delete'}
                            icon={<DeleteIcon />}
                            onClick={onDeleteOpen} />

                        <IconButton aria-label={'delete'}
                            icon={<DragHandleIcon />}
                            onClick={() => alert('Drag Handle')} />

                    </Flex>
                </CardBody>
            </Card >
        </>
    )
}

const EditSurvey = () => {
    const toast = useToast()

    const history = useNavigate();

    const {
        // eslint-disable-next-line
        user, dispatch, userData
    } = useAuthContext();
    const { surveyid } = useParams();
    const [ImgName, setImgName] = useState()
    const [survey, setSurvey] = useState();

    const handleContentUpdate = (newContent) => {
        setSurvey(newContent.resp[0]);
        toast({
            title: 'Question Added Successfully',
            status: 'success',
            position: 'bottom-right',
            duration: 9000,
            isClosable: true,
        })

    };


    async function handleSubmit() {

        try {
            const response = await axios.get('http://localhost:3002/api/survey/getsurveytoedit/' + surveyid,
                {
                    headers: { 'Authorization': `Bearer ${user.token}` },
                }
            );
            console.log(response.data[0])
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
                backgroundImage={'url("http://localhost:3002/api/survey/images/' + ImgName + '")'}
                backgroundSize={'cover'}
                backgroundColor={'gray'}
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
                                    {survey?.surveyName}
                                </Heading>
                                <Text>
                                    {survey?.surveyDescription}

                                </Text>
                            </Flex>
                            <Flex gap='10px'>
                                <Button>Suspend</Button>
                                <Button>Delete</Button>
                                <Cropper loadImage={loadImage} />

                            </Flex>


                        </Flex>
                    </CardHeader>
                </Card>
            </Card>

            <Flex flex={1} height={'100vh'} flexDirection={'row'} gap={'20px'}>

                <Card height={'100%'} background={'none'} boxShadow={'none'} display={'flex'} flex={4}>
                    <CardHeader justifyContent={'space-between'} display={'flex'} flexDirection={'row'}>
                        <Heading size={'md'} color={'brand.textDarkPurple'}>Questions</Heading>
                        <Flex gap={'10px'}>
                            {survey?.approvalStatus == 'draft' ? (
                                <EditQuestionModal onUpdateContent={handleContentUpdate} refreshdata={handleSubmit} mode={'add'} />
                            ) : null}

                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <Flex width={'100%'} flexDirection={'column'} gap={'20px'}>
                            <AnimatePresence>

                                {survey?.questions.length === 0 ? <Text>No questions added yet</Text> :

                                    survey?.questions.map(question => (
                                        <motion.div
                                            key={question.questionID}
                                            initial={{ opacity: 0, y: -50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, transition: { duration: 0.3 } }}
                                        >
                                            <QuestionCard surveyid={survey.surveyID} approvalStatus={survey.approvalStatus} handleSubmit={handleSubmit} question={question}
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

                    {survey?.approvalStatus == 'draft' && (
                        <>
                            <Text fontSize={'24px'} color={'white'} fontWeight={'bold'}>
                                Ready to publish your survey?
                            </Text>
                            <Text pb={'20px'} color={'white'} fontWeight={'normal'}>Request for approval</Text>

                            <InitialFocus surveyid={survey?.surveyID} />
                        </>
                    )
                    }
                    {survey?.approvalStatus == 'pending' && (
                        <>
                            <Text fontSize={'24px'} color={'white'} fontWeight={'bold'}>
                                Your survey is pending approval
                            </Text>
                            <Text pb={'20px'} color={'white'} fontWeight={'normal'}>We will get back to you shortly</Text>

                        </>
                    )
                    }
                    {survey?.approvalStatus == 'active' && (
                        <>
                            <Text fontSize={'24px'} color={'white'} fontWeight={'bold'}>
                                Your survey is live!
                            </Text>
                            <Text pb={'20px'} color={'white'} fontWeight={'normal'}>Share the link with your    </Text>

                        </>
                    )
                    }
                    {survey?.approvalStatus == 'rejected' && (
                        <>
                            <Text fontSize={'24px'} color={'white'} fontWeight={'bold'}>
                                Your survey was rejected
                            </Text>
                            <Text pb={'20px'} color={'white'} fontWeight={'normal'}>Please contact the admin for more details</Text>

                        </>
                    )
                    }
                    {survey?.approvalStatus == 'approved' && (
                        <>
                            <Text fontSize={'24px'} color={'white'} fontWeight={'bold'}>
                                Your survey was approved
                            </Text>
                            <Text pb={'20px'} color={'white'} fontWeight={'normal'}>You can now proceed to payment to make your survey live
                            </Text>
                            <Button>Pay Now</Button>
                        </>
                    )
                    }



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