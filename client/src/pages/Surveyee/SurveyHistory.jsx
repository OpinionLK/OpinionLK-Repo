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
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
    VStack,
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
            const res = await axios.get('http://localhost:3002/api/user/surveyHistory');
            const data = res.data;
            setSurveyHistory(data);
        }
        catch (err) {
            console.error('Error fetching Survey History:', err);
        }
    }

    useEffect(() => {
        fetchSurveyHistory();
    }, []);


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
                        <TableCaption>Total Surveys</TableCaption>
                        <Thead>
                        <Tr>
                            <Th>Survey Name</Th>
                            <Th>Date Submitted</Th>
                            <Th>Progress</Th>
                            <Th>Reward</Th>
                        </Tr>
                        </Thead>
                        <Tbody fontSize={14}>
                            {surveyHistory.map((survey) => (
                                <Tr>
                                    <Td>{survey.surveyName}</Td>
                                    <Td>{survey.dateSubmitted}</Td>
                                    <Td>{survey.progress}</Td>
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