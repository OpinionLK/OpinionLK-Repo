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
    InputLeftElement,
    InputGroup,
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
        history("/organisation/survey/" + id + "/edit")
    }
    const [searchTerm, setSearchTerm] = useState('');

    // Add a function to handle the search
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };
    const [searchResults, setSearchResults] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3002/api/survey/getbyUserId/',
            {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${user.token}` },
            }
        )
            .then(response => response.json())
            .then(data => {
                if (data.surveys) {
                    setData(data.surveys);
                    setTotalPages(Math.ceil(data.total / numRows));
            
                    if (data.surveys.length > 0) {
                        const filteredData = data.surveys.filter(survey =>
                            survey.surveyName.toLowerCase().includes(searchTerm.toLowerCase())
                        );
                        setSearchResults(filteredData);
            
                        setPageData(filteredData.slice((page - 1) * numRows, page * numRows));
                    }
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
                    Your Surveys
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

                                    <Td  width={'35%'}>{survey.surveyName}</Td>
                                    <Td width={'20%'}> {new Date(survey.created_date).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}</Td>

                                    <Td isNumeric>{survey.questions.length}</Td>
                                    <Td isNumeric>{survey.responses.length}</Td>
                                    <Td>
                                        <Status status={survey.approvalStatus} />


                                    </Td>

                                </Tr>)
                        }) : (
                            <Tr>
                                <Td textAlign={'center'} colSpan={5}>No surveys found</Td>
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

                    <Text fontWeight={'bold'} fontSize={'md'}>Page {page} of {totalPages}</Text>
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