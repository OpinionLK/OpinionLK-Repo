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
    Button,
    HStack,
} from '@chakra-ui/react'
import Status from '../../components/Status.jsx';

const SurveyTable = () => {
    const {
        // eslint-disable-next-line
        user, dispatch, userData
    } = useAuthContext();
    const [data, setData] = useState(null);
    // eslint-disable-next-line
    const [isLoading, setIsLoading] = useState(true);
    const numRows = 5;
    const history = useNavigate();

    function onclickhandler(id) {
        history("/organisation/survey/" + id + "/edit")
    }

    useEffect(() => {
        fetch('http://localhost:3002/api/survey/getbyUserId',
            {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${user.token}` },
            }
        )
            .then(response => response.json())
            .then(data => {
                setData(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        // eslint-disable-next-line
    }, []);
    return (
        <>
            <TableContainer>
                <Table variant='simple'>

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
                        {data ? (data.map((survey) => {
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

                                    <Td>{survey.surveyName}</Td>
                                    <Td>{survey.created_date}</Td>
                                    <Td isNumeric>{survey.questions.length}</Td>
                                    <Td isNumeric>{survey.responses.length}</Td>
                                    <Td>
                                        <Status status={survey.approvalStatus} />


                                    </Td>

                                </Tr>)
                        })) : ([...Array(numRows)].map((_, i) => (<Tr key={i}>
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
            <HStack boxSizing='border-box' m={'20px'} width={'100%'} justifyContent={'flex-end'} mr={'20px'}>
                <Button>Previous</Button>
                <Button>Next</Button>
            </HStack>
        </>
    )
}

export default SurveyTable