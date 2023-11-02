import React, { useEffect, useState } from 'react';
import { Heading, Card, CardHeader, CardBody, VStack, Flex } from '@chakra-ui/react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
// eslint-disable-next-line
import { ArcElement } from "chart.js";
// eslint-disable-next-line
import Chart from "chart.js/auto";

const SurveyManagementGraph = () => {
    const [surveyData, setSurveyData] = useState({ approved: 0, pending: 0, draft: 0 });

    // Make an HTTP GET request to fetch survey data
    useEffect(() => {
        // Replace with your backend API URL
        axios.get('http://localhost:3002/api/auth/approvalstatus')
            .then(response => {
                const data = response.data;
                setSurveyData(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const chartData = {
        labels: ['Approved', 'Pending', 'Draft'],
        datasets: [
            {
                data: [surveyData.approved, surveyData.pending, surveyData.draft],
                backgroundColor: ['#FF0000', '#00FF00', '#0000FF'],
            },
        ],
    };
    
    return (
        <Card borderRadius={'20px'} width={'100%'}>
            <CardHeader>
                <Heading size={'md'}>Survey Approval Status</Heading>
            </CardHeader>
            <CardBody>
                <VStack>
                    <Flex width={'100%'} h={'300px'} justifyContent={'center'}>
                        <Pie data={chartData} />
                    </Flex>
                </VStack>
            </CardBody>
        </Card>
    );
};

export default SurveyManagementGraph;