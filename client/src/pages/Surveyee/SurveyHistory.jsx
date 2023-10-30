import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Divider,
    Heading,
    Table,
    TableCaption,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    HStack,
    Input,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const SurveyHistory = () => {

    const [surveyHistory, setSurveyHistory] = useState([]);

    //Fetch survey history
    const fetchSurveyHistory = async () => {
        try {
            // send security token to backend with the header
            const token = "test"; // replace with your token
            const res = await axios.get('http://localhost:3002/api/user/surveyHistory', {
                headers: { 'Authorization': `Bearer ${token}` },
                //send user id to backend
                params: {
                    _id: '653cbbcdcece5a81436d38e0',
                }
            });
            const data = res.data;
            console.log("Hello this is a test: ",data);
            const updatedSurveyHistory = data.map((survey) => ({
                surveyName: survey.surveyName,
                surveyDescription: survey.surveyDescription,
                dateSubmitted: survey.dateSubmitted,
                reward: survey.reward,
            }));
            setSurveyHistory(updatedSurveyHistory);
        } catch (err) {
            console.error('Error fetching Survey History:', err);
        }
    }

    useEffect(() => {
        fetchSurveyHistory();
    }, []);

    //Calculate total surveys

    const totalSurveys = () => {
        return surveyHistory.length;
    }


    return (
        <div>
            <Card borderRadius={10}>
                <CardHeader>
                    <HStack>
                    <Heading fontSize={20} mr={10}>Survey History</Heading>
                    <Input
                        type="search"
                        placeholder="Search"
                        size="sm"
                        width="300px"
                        borderRadius={10}
                        mt={3}
                        mb={3}
                    />
                    </HStack>
                </CardHeader>
                <Divider color={'gray.300'} />
                <CardBody>
                <TableContainer>
                    <Table variant='simple'>
                        <TableCaption m={'0 auto'} mt={5} bg={'purple.400'} borderRadius={5} color={'whiteAlpha.900'} w={'fit-content'}>Total Surveys: {totalSurveys()}</TableCaption>
                        <Thead>
                        <Tr>
                            <Th>Survey Name</Th>
                            <Th>Description</Th>
                            <Th>Date Submitted</Th>
                            <Th>Reward</Th>
                        </Tr>
                        </Thead>
                        <Tbody fontSize={14}>
                            {surveyHistory.map((survey) => (
                                <Tr borderRadius={10} _hover={{cursor: 'pointer', backgroundColor: 'purple.100'}}>
                                    <Td>{survey.surveyName}</Td>
                                    <Td>{survey.surveyDescription}</Td>
                                    <Td>{survey.dateSubmitted}</Td>
                                    <Td>{survey.reward}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                    </TableContainer>
                </CardBody>
            </Card>
        </div>
    )
}

export default SurveyHistory;