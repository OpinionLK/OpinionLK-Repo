

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
    Tag,
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
    Avatar,
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
    const numRows = 7;
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
        fetch('http://localhost:3002/api/payment/get-payment-history',
            {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${user.token}` },
            }
        )
            .then(response => response.json())
            .then(data => {
                console.log(data.paymentHistory);
                setData(data.paymentHistory);
                setTotalPages(Math.ceil(data.paymentHistory.length / numRows));
                if (data.paymentHistory.length) {
                    const filteredData = data.paymentHistory


                    setPageData(filteredData.slice((page - 1) * numRows, page * numRows));
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }, [page, searchTerm]);
    return (
        <>

            <Flex mb={'20px'} width={'100%'} justifyContent={'space-between'} alignItems={'center'}>

                <Heading size={'md'}>
                    Billing History
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
                            <Th>Amount</Th>
                            <Th>Status</Th>

                        </Tr>
                    </Thead>
                    <Tbody>
                        {!isLoading ? (pageData ? pageData.map((historyItem, index) => {
                            return (
                                <Tr _hover={{
                                    bg: 'gray.100', cursor: 'pointer'
                                }}
                                    _active={{
                                        bg: 'gray.200',
                                    }}
                                    key={index}


                                >

                                    <Td width={'35%'}>{historyItem.description}</Td>
                                    <Td width={'20%'}>Rs {historyItem.amount / 100}</Td>
                                    <Td width={'20%'}> {new Date(historyItem.created * 1000).toLocaleDateString()}</Td>
                                    <Td width={'20%'}>{historyItem.status.toUpperCase()}</Td>


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
                                        history("/organisation/paymentbilling/" + (parseInt(page) - 1))
                                }
                            }
                        >Previous</Button>
                        <Button colorScheme={page < totalPages ? 'blue' : 'gray'}
                            onClick={
                                () => {
                                    if (page < totalPages)
                                        history("/organisation/paymentbilling/" + (parseInt(page) + 1))
                                }
                            }>Next</Button>
                    </HStack>
                </HStack>
            ) : null}
        </>
    )
}

export default SurveyTable