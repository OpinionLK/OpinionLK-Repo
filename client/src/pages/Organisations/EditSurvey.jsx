import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Cropper from './cropper.tsx'
import { useAuthContext } from '../../hooks/useAuthContext';
import { Link, useParams } from 'react-router-dom';
import InterestTags from '../../components/organisation/InterestTags.jsx';
import CardView from './CardView.jsx';
import { Pie } from 'react-chartjs-2';

import {
    Card,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    useMediaQuery,
    Td,
    TableCaption,

    TableContainer,
    Tag,
    CardBody,
    CardHeader,
    Heading,
    Text,
    Flex,
    Button,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    useToast,
    useRadioGroup,
    useRadio,
    ListIcon,
    ListItem,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Box,
    ModalHeader,
    ModalFooter,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverCloseButton,
    FormControl,
    FormLabel,
    ModalBody,
    ModalCloseButton,
    Select,
    Icon,
    HStack,
    Checkbox,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    VStack,
    Skeleton,
    List,
    Textarea,
    Divider,
    Tooltip,
    PopoverArrow
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {
    CheckCircleIcon, DeleteIcon, ArrowBackIcon
} from '@chakra-ui/icons'
import createsurveybg from '../../assets/images/createsurveybg.png'
import { useDisclosure } from '@chakra-ui/react';
import { QuestionOutlineIcon } from '@chakra-ui/icons'
import EditQuestionModal from '../../components/organisation/EditQuestionModal.jsx'
import YearPicker from '../../components/organisation/YearPicker.jsx';

function InitialFocus({ surveyid }) {
    const [options, setOptions] = useState([]);
    const [planID, setPlanID] = useState('41t81v4b');
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'plans', defaultValue: planID
        , onChange: (value) => {
            setPlanID(value);
        }

    })
    const group = getRootProps()
    // eslint-disable-next-line
    const [date, setDate] = useState(new Date());
    const [gender, setGender] = useState('');
    const [city, setCity] = useState('');

    const toast = useToast()
    const {
        // eslint-disable-next-line
        user, dispatch, userData
    } = useAuthContext();
    const [areas, setAreas] = useState([]);
    const [fromYear, setFromYear] = useState(0);
    const [toYear, setToYear] = useState(0);

    const setPending = async () => {
        try {
            console.log(user.token)
            const response = await axios.put(`http://localhost:3002/api/survey/changestatus/${surveyid}`, {
                state: 'pending',
                planID: planID,

                userTags: {
                    gender: gender, city: city, age1: fromYear, age2: toYear, interests: areas
                }
            }, {
                headers: { 'Authorization': `Bearer ${user.token}` },
            },);

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
                setTimeout(() => {
                    window.location.reload();
                }, 2000)
            }

        } catch (error) {
            console.log(error)
        }


    }
    // eslint-disable-next-line
    const setActive = async () => {
        try {
            console.log(user.token)
            const response = await axios.put(`http://localhost:3002/api/survey/changestatus/${surveyid}`, {
                state: 'active',
            }, {
                headers: { 'Authorization': `Bearer ${user.token}` },
            },);

            if (response.status === 200) {
                onClose();
                toast({
                    title: 'Survey is now active',
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

    // eslint-disable-next-line
    const [questionCount, setQuestionCount] = useState(0);

    const getSurveyConstraints = async () => {
        try {
            console.log(user.token)
            const response1 = await axios.get(`http://localhost:3002/api/survey/getplatformdata`, {
                headers: { 'Authorization': `Bearer ${user.token}` },
            },);
            const response2 = await axios.get(`http://localhost:3002/api/survey/getquestioncount/${surveyid}`, {
                headers: { 'Authorization': `Bearer ${user.token}` },
            },);

            if (response1.status === 200 && response2.status === 200) {
                console.log(response1.data.surveyPlans)
                setOptions(response1.data.surveyPlans);
            }

        } catch (error) {
            console.log(error)
        }
    }
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    // eslint-disable-next-line
    const [duration, setDuration] = useState('7');
    // eslint-disable-next-line
    const [targetResponses, SetTargetResponses] = useState('300');
    // eslint-disable-next-line
    const labelStyles = {
        mt: '2', ml: '-2.5', fontSize: 'sm',
    }

    const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');

    // eslint-disable-next-line
    const [total, setTotal] = useState(0);
    // eslint-disable-next-line
    const calculate = () => {


        // setTotal(baseCost + (costPerResponse * targetResponses) + (perQuestionCost * questionCount));

    }
    // eslint-disable-next-line
    const [endCriteria, setEndCriteria] = useState('duration');
    useEffect(() => {
        getSurveyConstraints();

    }// eslint-disable-next-line
        , [])

    const [approvalPage, setApprovalPage] = useState(0);

    return (

        <>

            <Button size={'lg'} width={'90%'} colorScheme='brand' onClick={onOpen}>Request for Approval</Button>


            <Modal
                initialFocusRef={initialRef}
                transition={{ duration: 0.3 }}
                variant='approveModal'
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>We need a few more details regarding your survey</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                        {approvalPage === 0 ? (<VStack mt={'20px'} gap={'40px'}>
                            <FormControl>
                                <FormLabel>Choose a target gender <Tooltip placement='auto-start'
                                    label="A target audience is the catergory of people you wish to present this survey to."
                                    aria-label='A tooltip'><Icon
                                        as={QuestionOutlineIcon} />
                                </Tooltip>
                                </FormLabel>
                                <Select onChange={(e) => {
                                    setGender(e.target.value)
                                }} value={gender}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="">Everyone</option>
                                </Select>


                            </FormControl>
                            <FormControl>
                                <FormLabel>Choose a target birth year range <Tooltip placement='auto-start'
                                    label="A target audience is the catergory of people you wish to present this survey to."
                                    aria-label='A tooltip'><Icon
                                        as={QuestionOutlineIcon} />
                                </Tooltip>
                                </FormLabel>
                                <YearPicker setFromYear={setFromYear} setToYear={setToYear}
                                />



                            </FormControl>
                            <FormControl>
                                <FormLabel>Choose a target city <Tooltip placement='auto-start'
                                    label="A target audience is the catergory of people you wish to present this survey to."
                                    aria-label='A tooltip'><Icon as={QuestionOutlineIcon} />
                                </Tooltip>
                                </FormLabel>
                                <Select onChange={(e) => {
                                    setCity(e.target.value)
                                }} value={city}
                                >
                                    <option value="Colombo">Colombo</option>
                                    <option value="Kandy">Kandy</option>
                                    <option value="Galle">Galle</option>
                                    <option value="Mannar">Mannar</option>
                                    <option value="other">Other</option>
                                </Select>

                            </FormControl>
                            <Flex>
                                <InterestTags selectedOptions={areas} setSelectedOptions={setAreas} />
                            </Flex>

                        </VStack>) : approvalPage === 1 ? (<>


                            <FormControl mt={4}>
                                <FormLabel>Choose a Plan for this Survey</FormLabel>

                                <HStack {...group} width={'100%'}>
                                    {options.map((value) => {
                                        const radio = getRadioProps({ value: value.planID });
                                        return (<RadioCard key={value.planID} {...radio}>
                                            <VStack alignContent={'left'} gap={'10px'} p={'10px'}>
                                                <Flex w={'100%'} justifyContent={'space-between'}>

                                                    <Heading color={'brand.purple'} size={'md'}>
                                                        {value.name}
                                                    </Heading>
                                                    <Text color={'brand.textBlack'} fontWeight={'bold'}>
                                                        LKR {value.price}.00
                                                    </Text>

                                                </Flex>
                                                <List spacing={3}>
                                                    <ListItem fontSize={'sm'}>
                                                        {value.description}
                                                    </ListItem>
                                                    <ListItem fontSize={'sm'}>
                                                        <ListIcon as={CheckCircleIcon} color='green.500' />
                                                        Survey will be active for {value.duration} days
                                                    </ListItem>
                                                    <ListItem fontSize={'sm'}>
                                                        <ListIcon as={CheckCircleIcon} color='green.500' />
                                                        Maximum of {value.maxResponses} responses
                                                    </ListItem>

                                                </List>
                                            </VStack>

                                        </RadioCard>)
                                    })}
                                </HStack>
                            </FormControl>


                            <VStack mt={'20px'} gap={'40px'}>

                                <Text size={'sm'}>You will be able to make the payment after youre survey has been
                                    approved</Text>
                                <Text size={'sm'} color='red' fontWeight={'bold'}>NOTE: You will not be able to
                                    modify your survey after you request approval!</Text>
                            </VStack>
                        </>

                        ) : null}
                    </ModalBody>

                    <ModalFooter>
                        <HStack gap={'10px'}>

                            {approvalPage > 0 ? (
                                <Button variant={'outline'} mr={3} onClick={() => setApprovalPage(approvalPage - 1)}>
                                    Back
                                </Button>) : null}
                            <Button colorScheme='blue' onClick={() => {
                                if (approvalPage < 1) {
                                    setApprovalPage(approvalPage + 1)
                                } else {
                                    setPending();
                                }
                            }}>
                                {approvalPage < 1 ? 'Next' : 'Request Approval'}

                            </Button>

                        </HStack>


                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>)
}

const QuestionCard = ({ surveyid, question, approvalStatus, refreshdata, handleSubmit }) => {

    const toast = useToast()
    const {
        // eslint-disable-next-line
        user, dispatch, userData
    } = useAuthContext();
    const handleDelete = async () => {
        try {
            // Make an HTTP DELETE request to your backend API
            // eslint-disable-next-line
            const response = await axios.put(`http://localhost:3002/api/survey/deleteQuestion/${surveyid}`, {
                questionid: question.questionID
            }, {
                headers: { 'Authorization': `Bearer ${user.token}` },
            }).then((response) => {

                OnDeleteClose();
                refreshdata();
                toast({
                    title: 'Question Deleted',

                    status: 'warning', position: 'bottom-right', duration: 9000, isClosable: true,
                })
            }).catch((error) => {
                console.log(error)
            })


        } catch (error) {
            console.error('Error deleting question:', error);
        }
    };
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: OnDeleteClose } = useDisclosure()
    // eslint-disable-next-line
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: OnEditClose } = useDisclosure()

    return (<>
        <Modal isOpen={isDeleteOpen} onClose={OnDeleteClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Confirm Delete?</ModalHeader>
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
                    {approvalStatus === 'pending' ? null : (
                        <EditQuestionModal questionID={question.questionID} refreshdata={handleSubmit}
                            mode={'edit'} />)}
                    {approvalStatus === 'draft' || approvalStatus === 'rejected' ? (<IconButton aria-label={'delete'}
                        icon={<DeleteIcon />}
                        onClick={onDeleteOpen} />) : null}


                </Flex>
            </CardBody>
        </Card>
    </>)
}

function RadioCard(props) {
    const { getInputProps, getRadioProps } = useRadio(props)

    const input = getInputProps()
    const checkbox = getRadioProps()

    return (<Box as='label' w={'100%'}>
        <input {...input} />
        <Box
            {...checkbox}

            cursor='pointer'
            borderWidth='1px'
            borderRadius='md'
            boxShadow='md'
            _checked={{
                bg: '#eeedff', color: 'brand.textBlack', borderColor: 'brand.darkPurple',
            }}
            _focus={{
                boxShadow: 'outline',
            }}
            px={5}
            py={3}
        >
            {props.children}
        </Box>
    </Box>)
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
    const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');


    async function handleSubmit() {

        try {
            const response = await axios.get('http://localhost:3002/api/survey/getsurveytoedit/' + surveyid, {
                headers: { 'Authorization': `Bearer ${user.token}` },
            });
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

    useEffect(() => {
        handleSubmit();
        // eslint-disable-next-line
    }, [])

    // const toast = useToast()
    const loadImage = (imageName) => {
        setImgName(imageName)
    }
    const [chartData, setChartData] = useState([

    ]
    );


    return (

        <Flex flexDirection={'column'} gap={'20px'}>
            <Link to={'/organisation/survey'}>{<ArrowBackIcon />} Back</Link>
            <Card
                backgroundImage={'url("https://ik.imagekit.io/7i3fql4kv7/survey_headers/' + ImgName + '")'}
                backgroundSize={'cover'}
                backgroundColor={'gray'}
                backgroundPosition={'center'}
            >
                <Card height={'s'}
                    p={'25px 20px'}
                    backgroundColor="rgba(0, 0, 0, 0.2)"
                    // backdropFilter={'blur(5px)'}
                    color={'white'}
                    boxShadow={'none'}
                >
                    <CardHeader>
                        <Flex justifyContent='space-between' alignItems={'center'} w='100%' flexDirection={'row'}>

                            <Flex gap='10px' flexDir={'column'}>

                                <Heading textShadow={'0px 0px 25px black'}>
                                    {survey?.surveyName ? survey?.surveyName : (
                                        <Skeleton height={'50px'} width={'400px'} />

                                    )}
                                </Heading>
                                <Text textShadow={'0px 0px 25px black'}>
                                    {survey?.surveyDescription ? survey?.surveyDescription : (
                                        <Skeleton height={'20px'} width={'200px'} />)}
                                </Text>
                                {survey?.approvalStatus === 'active' ? (
                                    <Tag width={'fit-content'}>
                                        Survey Expires on {survey?.expiration_date ? new Date(survey?.expiration_date).toDateString()
                                            : (
                                                <Skeleton height={'20px'} width={'200px'} />)}

                                    </Tag>) : null}
                            </Flex>
                            <Flex gap='10px'>

                                {survey?.approvalStatus === 'draft' || survey?.approvalStatus === 'rejected' ? (
                                    <Cropper loadImage={loadImage} surveyId={survey?.surveyID} />) : null}
                            </Flex>


                        </Flex>
                    </CardHeader>
                </Card>
            </Card>

            <Tabs variant='enclosed' w={'100%'}>
                <TabList>
                    <Tab>Overview</Tab>
                    {survey?.approvalStatus === 'active' && (<Tab>Responses ({survey?.responses.length})</Tab>)}
                    {survey?.approvalStatus === 'active' && (<Tab>Analytics</Tab>)}

                </TabList>
                <TabPanels>
                    <TabPanel gap={'20px'}>

                        <Flex flex={1} height={'100vh'} flexDirection={isLargerThanLG ? 'row' : 'column'} gap={'20px'}>
                            <Card height={'100%'} background={'none'} boxShadow={'none'} display={'flex'} flex={4}>
                                <CardHeader justifyContent={'space-between'} display={'flex'} flexDirection={'row'}>
                                    <Heading size={'md'} color={'brand.textDarkPurple'}>Questions</Heading>
                                    <Flex gap={'10px'}>
                                        {survey?.approvalStatus === 'draft' ? (
                                            <EditQuestionModal onUpdateContent={handleContentUpdate}
                                                refreshdata={handleSubmit}
                                                mode={'add'} />) : null}

                                    </Flex>
                                </CardHeader>
                                <CardBody>
                                    <Flex width={'100%'} flexDirection={'column'} gap={'20px'}>
                                        <AnimatePresence>

                                            {survey?.questions.length === 0 ? <Text>No questions added yet</Text> :

                                                survey?.questions.map(question => (<motion.div
                                                    key={question.questionID}
                                                    initial={{ opacity: 0, y: -50 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
                                                >
                                                    <QuestionCard surveyid={survey.surveyID}
                                                        approvalStatus={survey.approvalStatus}
                                                        handleSubmit={handleSubmit} question={question}
                                                        refreshdata={handleSubmit} />
                                                </motion.div>

                                                ))

                                            }
                                        </AnimatePresence>

                                    </Flex>
                                </CardBody>
                            </Card>
                            <VStack>

                                {survey?.approvalStatus !== 'draft' && (
                                    <Card size={'sm'}>
                                        <CardHeader>
                                            <Heading size={'md'} color={'brand.textDarkPurple'}>Survey Details</Heading>
                                        </CardHeader>
                                        <CardBody>
                                            <Flex flexDirection={'column'} gap={'20px'}>

                                                <TableContainer width={'100%'}>
                                                    <Table size='sm' variant='simple'>
                                                        <Tbody>
                                                            <Tr>
                                                                <Td>Survey Plan:</Td>
                                                                <Td>{survey?.planID == '41t81v4b' ? 'Free Plan' : survey?.planID == 'zzqh0foy' ? 'Premium Plan' : 'Enterprise'}</Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>Created at:</Td>
                                                                <Td>{new Date(survey?.created_date).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}</Td>
                                                            </Tr>

                                                            <Tr>
                                                                <Td rowspan={4}>Targeted User Group</Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>Gender: {survey?.userTags[0]?.gender === '' ? 'No Restriction' : survey?.userTags[0]?.gender
                                                                }</Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>
                                                                    Birthyear {
                                                                        survey?.userTags[0]?.age1 === 0 ? 'No Restriction' : (
                                                                            <>
                                                                                Range: {survey?.userTags[0]?.age1} - {survey?.userTags[0]?.age2}
                                                                            </>
                                                                        )
                                                                    }
                                                                </Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>City : {survey?.userTags[0]?.city}</Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>
                                                                    Interests:
                                                                </Td>
                                                                <Td>
                                                                    <HStack wrap={'wrap'} w={'100%'}>
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
                                            </Flex>

                                        </CardBody>
                                    </Card>
                                )}
                                <Card backgroundImage={createsurveybg} boxShadow='2xl' height={'30%'}
                                    backgroundSize={'cover'}
                                    padding={'30px'} borderRadius={'5px'} justifyContent={'center'}
                                    flexDirection={'column'}
                                    alignItems={'center'}>
                                    <VStack gap={'10px'}>


                                        {survey?.approvalStatus === 'draft' && (<>
                                            <Text textAlign={'center'} fontSize={'18px'} color={'white'}
                                                fontWeight={'bold'}>
                                                Ready to publish your survey?
                                            </Text>
                                            <Text pt={'20px'} pb={'20px'} color={'white'} fontWeight={'normal'}>Request
                                                for
                                                approval</Text>

                                            <InitialFocus surveyid={survey?.surveyID}
                                                questionCount={survey?.questionCount} />
                                        </>)}
                                        {survey?.approvalStatus === 'pending' && (<>
                                            <Text textAlign={'center'} fontSize={'18px'} color={'white'}
                                                fontWeight={'bold'}>
                                                Your survey is pending approval
                                            </Text>
                                            <Text pt={'20px'} pb={'20px'} color={'white'} fontWeight={'normal'}>We will
                                                get back to you
                                                shortly</Text>

                                        </>)}
                                        {survey?.approvalStatus === 'active' && (<>
                                            <Text textAlign={'center'} fontSize={'18px'} color={'white'}
                                                fontWeight={'bold'}>
                                                Your survey is live!<br />
                                                Watch as the responses come in!
                                            </Text>
                                        </>)}
                                        {survey?.approvalStatus === 'rejected' && (<VStack gap='20px'>

                                            <Text textAlign={'center'} fontSize={'18px'} color={'white'}
                                                fontWeight={'bold'}>
                                                Your survey failed the review
                                            </Text>
                                            {/* <Text pt={'20px'} pb={'20px'} color={'white'} fontWeight={'normal'}></Text> */}

                                            <Popover placement='left'>
                                                <PopoverTrigger>
                                                    <Button>View Feedback</Button>
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <PopoverArrow />
                                                    <PopoverCloseButton />
                                                    <PopoverHeader>Feedback</PopoverHeader>
                                                    <PopoverBody>

                                                        <Textarea value={survey?.comments[0].comment} isReadOnly
                                                            rows={'10'} />

                                                    </PopoverBody>
                                                </PopoverContent>
                                            </Popover>
                                            <Button onClick={() => {
                                                alert('clicked')
                                            }}>Request Approval</Button>
                                        </VStack>)}
                                        {survey?.approvalStatus === 'approved' && (<>
                                            <Text fontSize={'24px'} color={'white'} fontWeight={'bold'}>
                                                Your survey was approved
                                            </Text>
                                            <Text pt={'20px'} pb={'20px'} color={'white'} fontWeight={'normal'}>You can
                                                now
                                                proceed to
                                                payment to make your survey live
                                            </Text>
                                            <PaymentModal survey={
                                                survey

                                            } />
                                            {/* <Button
                                            
                                        >Pay Now</Button> */}

                                        </>
                                        )}


                                    </VStack>


                                </Card>
                            </VStack>


                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        {survey?.responses.length === 0 ? <Text>No responses yet</Text> : null}
                        <Accordion allowToggle>
                            {survey?.responses.length === 0 ? (null) : (survey?.responses
                                .sort((a, b) => b.created_date - a.created_date) // Sort in descending order
                                .map((response, index) => (<AccordionItem key={index}>
                                    <h2>
                                        <AccordionButton>
                                            <Box as="span" flex='1' textAlign='left'>
                                                <Flex justifyContent={'space-between'}
                                                    pr={'10px'}>
                                                    <HStack>
                                                        <Text
                                                            fontWeight={'bold'}>{index + 1}</Text>
                                                        <Text> Response ID
                                                            : {response.responseID}</Text>
                                                    </HStack>
                                                    <Text>Date Submitted
                                                        : {response.created_date}</Text>
                                                </Flex>
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        <Flex flexDir={'column'} width={'100%'} gap={'10px'}>

                                            {survey?.questions.map((question, index) => (

                                                <Card key={index} p={'10px'}>
                                                    <CardHeader>

                                                        <HStack>
                                                            <Text
                                                                fontWeight={'bold'}>{index + 1}. </Text>
                                                            <Text
                                                                fontWeight={'bold'}>{question.question}</Text>
                                                        </HStack>

                                                    </CardHeader>
                                                    <CardBody>
                                                        <Text>
                                                            {response?.responses[question.questionID]}
                                                        </Text>
                                                    </CardBody>
                                                </Card>

                                            ))}
                                        </Flex>
                                    </AccordionPanel>
                                </AccordionItem>)))}

                        </Accordion>
                    </TabPanel>
                    <TabPanel>
                        <Text>Analytics</Text>
                        {/* {survey?.questions.map((question, index) => (
                            question?.responseType === 'multiplechoice' && (
                                <Card key={index} p={'10px'}>
                                    <CardHeader>
                                        <HStack>
                                            <Text fontWeight={'bold'}>{index + 1}. </Text>
                                            <Text fontWeight={'bold'}>{question.question}</Text>
                                            
                                        </HStack>
                                    </CardHeader>
                                    <CardBody>
                                  
                                    </CardBody>
                                </Card>
                            )
                        ))} */}
                        <Flex wrap={'wrap'} flexDirection={'row'} gap='10px'>

                            {chartData.length === 0 ? <Text>No Data Yet</Text> :
                                chartData.map((chart, index) => (
                                    <Card p={'50px'} width={'30%'}>
                                        <CardHeader>
                                            <Text fontWeight={'bold'}>{index + 1}. </Text>
                                            <Text fontWeight={'bold'}>{chart.question}</Text>
                                        </CardHeader>
                                        <Pie


                                            key={index}
                                            data={{

                                                labels: chart.labels,
                                                datasets: [{
                                                    data: chart.data,
                                                    backgroundColor: ['red', 'blue', 'green', 'yellow'] // Add more colors as needed
                                                }]
                                            }}
                                            options={{
                                                title: {
                                                    display: true,
                                                    text: chart.question
                                                }
                                            }}
                                        />
                                    </Card>
                                ))}

                        </Flex>

                    </TabPanel>
                </TabPanels>

            </Tabs >
        </Flex >

    )
}

export const variants = {
    show: {
        opacity: 1, y:
            0, transition:
        {
            ease: 'easeOut', duration:
                0.3
        }
    }
    ,
    hide: {
        y: -20, opacity:
            0
    }
};
function PaymentModal(
    { survey }
) {
    const toast = useToast()
    const {
        // eslint-disable-next-line
        user, dispatch, userData
    } = useAuthContext();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const payNow = () => {
        // eslint-disable-next-line
        const response = axios.post('http://localhost:3002/api/payment/do-payment', {
            surveyid: survey?.surveyID,
        }, {
            headers: { 'Authorization': `Bearer ${user.token}` },
        }).then((response) => {
            if (response.status === 200) {
                onClose();
                toast({
                    title: 'Payment Successful',
                    status: 'success',
                    position: 'bottom-right',
                    duration: 9000,
                    isClosable: true,
                })
                setTimeout(() => {
                    window.location.reload();
                }, 2000)
            } else {
                toast({
                    title: 'Payment Failed',
                    status: 'error',
                    position: 'bottom-right',
                    duration: 9000,
                    isClosable: true,
                })
            }
        }).catch((error) => {
            console.log(error)
        })
    }


    return (
        <>
            <Button onClick={onOpen}>Pay Now</Button>

            <Modal onClose={onClose} isOpen={isOpen} isCentered size={'xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Payment</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* checkout ui */}
                        <Flex flexDirection={'column'}>
                            <Heading size={'sm'}>
                                {survey?.surveyName}
                            </Heading>
                            <HStack p={'10px 0px'} justifyContent={'space-between'} w={'100%'} alignItems={'flex-start'}>
                                <Text>Cost</Text>
                                <Text>LKR {survey?.cost}</Text>
                            </HStack>
                            <Divider />
                            <VStack p={'10px 0px'} w={'100%'} alignItems={'flex-start'}>
                                <Text fontWeight={'bold'}>
                                    Payment Method
                                </Text>
                                <CardView />
                            </VStack>
                        </Flex>


                    </ModalBody>
                    <ModalFooter gap={'10px'} flexDirection={'column'}>

                        <Button width={'100%'} colorScheme='messenger' onClick={
                            () => {
                                payNow()
                            }
                        }>Proceed</Button>
                        <Button width={'100%'} variant={'outline'} onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditSurvey