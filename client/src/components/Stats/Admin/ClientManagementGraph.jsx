import React, { useEffect, useState } from 'react';
import { Heading, Card, CardHeader, CardBody, VStack, Flex } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const ClientManagementGraph = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        // Make an HTTP POST request to fetch user signups data from the API
        axios.get('http://localhost:3002/api/auth/clientsignups', {})
            .then(response => {
                setChartData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <Card borderRadius={'20px'} width={'100%'}>
            <CardHeader>
                <Heading size={'md'}>Client Management</Heading>
            </CardHeader>
            <hr />
            <CardBody>
                <VStack>
                    <Flex width={'100%'} h={'300px'} justifyContent={'center'}>
                        {chartData && (
                            <Line
                                data={chartData}
                                options={{
                                    title: {
                                        display: true,
                                        text: 'Clients Signups in the Last 30 Days',
                                        fontSize: 20
                                    },
                                    legend: {
                                        display: true,
                                        position: 'right'
                                    }
                                }}
                            />
                        )}
                    </Flex>
                    <Flex></Flex>
                </VStack>
            </CardBody>
        </Card>
    );
}

export default ClientManagementGraph;
