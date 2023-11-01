// import React from 'react'
// import { useState, useEffect } from 'react'
// import { useNavigate } from "react-router-dom"
// import { useAuthContext } from '../../hooks/useAuthContext'
// import {
//     Flex,
//     Heading,
//     Modal,
//     ModalOverlay,
//     ModalContent,
//     ModalHeader,
//     ModalFooter,
//     ModalBody,
//     ModalCloseButton,
//     Skeleton,
//     Table,
//     Thead,
//     Tbody,
//     Tr,
//     Tag,
//     Th,
//     Td,
//     TableContainer,
//     Button,
// } from '@chakra-ui/react'
// import Status from '../../components/Status.jsx';
// import { useDisclosure } from '@chakra-ui/react';

// const SurveyTable = ({ url }) => {
//     // eslint-disable-next-line
//     const { isOpen, onOpen, onClose } = useDisclosure()

//     const {
//         // eslint-disable-next-line
//         user, dispatch, userData
//     } = useAuthContext();

//     const [data, setData] = useState(null);
//     // eslint-disable-next-line
//     const [isLoading, setIsLoading] = useState(true);
//     const numRows = 5;
//     const history = useNavigate();
// // eslint-disable-next-line
//     const [survey, setSurvey] = useState(null);

//     async function onclickhandler(id) {
//         history("/commanager/viewsurvey/" + id + "/")
//     }

//     useEffect(() => {
//         console.log("Fetching data");
//         fetch('http://localhost:3002/api/survey/all',
//             {
//                 method: 'GET',
//                 headers: { 'Authorization': `Bearer ${user.token}` },
//             }
//         )
//         .then(response => {
//             if (!response.ok) {
//                 console.error('API request failed:', response);
//                 throw new Error('API request failed');
//             }
//             return response.json();
//         })
//         .then(data => {
//             if (Array.isArray(data)) {
//                 setData(data);
//             } else {
//                 console.error('API response is not an array:', data);
//                 setData([]);
//             }
//             setIsLoading(false);
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//             setData([]);
//             setIsLoading(false);
//         });
//         // eslint-disable-next-line
//     }, []);

//     return (
//         <>
//             <Modal variant={'purple'} size={'xl'} isOpen={isOpen} onClose={onClose}>
//                 <ModalOverlay />
//                 <ModalContent>
//                     <ModalHeader></ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody display={'flex'} flexDir={'column'}>

//                         <Flex height={'50%'} flex={1}>
//                             <Flex width={'100%'}>
//                                 <Heading size={'md'}>Survey Name</Heading>
//                                 <Tag colorScheme="green" ml={2} fontWeight={'bold'}>Active</Tag>
//                             </Flex>
//                             <Flex width={'100%'}>
//                             </Flex>
//                         </Flex>
//                         <Flex height={'50%'} flex={1}>fegwgw</Flex>

//                     </ModalBody>

//                     <ModalFooter>
//                         <Button colorScheme='blue' mr={3} onClick={onClose}>
//                             Close
//                         </Button>
//                         <Button variant='ghost'>Secondary Action</Button>
//                     </ModalFooter>
//                 </ModalContent>
//             </Modal>
//             <TableContainer>
//                 <Table variant='simple'>

//                     <Thead>
//                         <Tr>
//                             <Th>Survey Name</Th>
//                             <Th>Date Created</Th>
//                             <Th># of Questions</Th>
//                             <Th># of Responses</Th>
//                             <Th>Status</Th>
//                         </Tr>
//                     </Thead>
//                     <Tbody>
//                         {data ? (data.map((survey) => {
//                             return (
//                                 <Tr _hover={{
//                                     bg: 'gray.100', cursor: 'pointer'
//                                 }}
//                                     _active={{
//                                         bg: 'gray.200',
//                                     }}
//                                     key={survey.surveyID}

//                                     onClick={() => {
//                                         onclickhandler(survey.surveyID)
//                                     }}
//                                 >
//                                     <Td>{survey.surveyName}</Td>
//                                     <Td>{survey.created_date}</Td>
//                                     <Td isNumeric>{survey.questions.length}</Td>
//                                     <Td isNumeric>{survey.responses.length}</Td>
//                                     <Td>
//                                         <Status status={survey.approvalStatus} />
//                                     </Td>


//                                 </Tr>)
//                         })) : ([...Array(numRows)].map((_, i) => (<Tr key={i}>
//                             <Td><Skeleton height={'20px'}></Skeleton></Td>
//                             <Td><Skeleton height={'20px'}></Skeleton></Td>
//                             <Td><Skeleton height={'20px'}></Skeleton></Td>
//                             <Td><Skeleton height={'20px'}></Skeleton></Td>
//                             <Td><Skeleton height={'20px'}></Skeleton></Td>
//                             <Td><Skeleton height={'20px'}></Skeleton></Td>

//                         </Tr>)))}

//                     </Tbody>

//                 </Table>
//             </TableContainer>
//             <Button>Previous</Button>

//             <Button>Next</Button>
//         </>
//     )
// }

// export default SurveyTable;

import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useAuthContext } from '../../hooks/useAuthContext'
import {
    Skeleton,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    InputGroup,
    InputLeftElement,
    Input,
    Button,
    HStack,
    Text,
    Flex,
    Heading,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom';
import Status from '../../components/Status.jsx';
import {
    SearchIcon
} from '@chakra-ui/icons'


const SurveyTable = () => {
    const {
        // eslint-disable-next-line
        user, dispatch, userData
    } = useAuthContext();
    const { page = 1 } = useParams();

    const [data, setData] = useState(null);
    // eslint-disable-next-line
    const [isLoading, setIsLoading] = useState(true);
    const numRows = 10;
    const [totalPages, setTotalPages] = useState(0);
    const [pageData, setPageData] = useState(null);
    const history = useNavigate();

    function onclickhandler(id) {
        history("/commanager/viewsurvey/" + id)
    }
    const [searchTerm, setSearchTerm] = useState('');

    // Add a function to handle the search
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };
    const [searchResults, setSearchResults] = useState(null);


    useEffect(() => {
        fetch('http://localhost:3002/api/survey/getsurveyforcommanager/pending',
            {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${user.token}` },
            }
        )
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(data.surveys);
                setTotalPages(Math.ceil(data.total / numRows));
                if (data.surveys.length > 0) {
                    const filteredData = data.surveys.filter(survey =>
                        survey.surveyName.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                    setSearchResults(filteredData);

                    setPageData(filteredData.slice((page - 1) * numRows, page * numRows));
                }

                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        // eslint-disable-next-line
    }, [page, searchTerm]);
    return (
        <>

            <Flex mb={'20px'} width={'100%'} justifyContent={'space-between'} alignItems={'center'}>

                <Heading size={'md'}>
                    Surveys requiring approval
                </Heading>

                <InputGroup width={'40%'}>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<SearchIcon color="gray.300" />}
                    />
                    <Input type="text" placeholder="Search" onChange={handleSearch} />
                </InputGroup>
            </Flex>


            <TableContainer>
                <Table variant='striped'>

                    <Thead>
                        <Tr>
                            <Th>Survey Name</Th>
                            <Th>Requested By</Th>
                            <Th>Date Created</Th>
                            <Th># of Questions</Th>
                            <Th># of Responses</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {searchResults ? (searchResults.length > 0 ? pageData.map((survey) => {
                            return (
                                <Tr _hover={{
                                    bg: 'gray.100', cursor: 'pointer'
                                }}
                                    _active={{
                                        bg: 'gray.200',
                                    }}
                                    key={survey.surveyID}

                                    onClick={() => {
                                        onclickhandler(survey.surveyID)
                                    }}
                                >

                                    <Td width={'35%'}>{survey.surveyName}</Td>
                                    <Td width={'20%'}>{survey?.creatorName}</Td>
                                    <Td width={'20%'}> {new Date(survey.created_date).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}</Td>

                                    <Td isNumeric>{survey.questions.length}</Td>
                                    <Td isNumeric>{survey.responses.length}</Td>
                                    <Td>
                                        <Status status={survey.approvalStatus} />


                                    </Td>

                                </Tr>)
                        }) : (
                            <Tr>
                                <Td textAlign={'center'} colSpan={6}>No surveys found</Td>
                            </Tr>
                        )) : ([...Array(numRows)].map((_, i) => (<Tr key={i}>
                            <Td><Skeleton height={'20px'}></Skeleton></Td>
                            <Td><Skeleton height={'20px'}></Skeleton></Td>
                            <Td><Skeleton height={'20px'}></Skeleton></Td>
                            <Td><Skeleton height={'20px'}></Skeleton></Td>
                            <Td><Skeleton height={'20px'}></Skeleton></Td>
                            <Td><Skeleton height={'20px'}></Skeleton></Td>

                        </Tr>)))}

                    </Tbody>

                </Table>
            </TableContainer>
            {!searchTerm ? (
                <HStack boxSizing='border-box' p={'20px'} pr={'0px'} width={'100%'} justifyContent={'space-between'} mr={'20px'}>

                    <Text fontWeight={'bold'} fontSize={'md'}>Page {page} of {totalPages} Showing {pageData ? pageData.length : 0} of {data ? data.length : 0} results
                    </Text>
                    <HStack spacing={'10px'}>
                        <Button
                            colorScheme={page > 1 ? 'blue' : 'gray'}
                            onClick={
                                () => {
                                    if (page > 1)
                                        history("/organisation/survey/" + (parseInt(page) - 1))
                                }
                            }
                        >Previous</Button>
                        <Button colorScheme={page < totalPages ? 'blue' : 'gray'}
                            onClick={
                                () => {
                                    if (page < totalPages)
                                        history("/organisation/survey/" + (parseInt(page) + 1))
                                }
                            }>Next</Button>
                    </HStack>
                </HStack>
            ) : null}
        </>
    )
}

export default SurveyTable