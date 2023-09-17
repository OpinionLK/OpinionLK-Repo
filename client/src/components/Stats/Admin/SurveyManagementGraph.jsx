import React from "react";
import {
    Heading,
    Card,
    CardHeader,
    CardBody,
    VStack,
    Flex,
} from '@chakra-ui/react'
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


const SurveyManagementGraph = () => {
    const state = {
        labels: ['Total Surveys', 'Completed Surveys', 'Pending Surveys'],
        labelStyle: {
            fontSize: 20,
            color: 'red',
            fontWeight: 'bold'
        },
        datasets: [
            {
                label: 'Surveys',
                fill: false,
                lineTension: 0.5,
                backgroundColor: ['#FF0000', '#00FF00', '#0000FF'],
                borderColor: 'lightgrey',
                borderWidth: 1,
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                data: [65, 59, 80]

            }
        ]
    }

    return (
        <Card borderRadius={'20px'} width={'100%'}>
            <CardHeader>
                <Heading size={'md'}>User Management</Heading>
            </CardHeader>
            <hr />
            <CardBody>
                <VStack>
                    <Flex width={'100%'} h={'300px'} justifyContent={'center'}>
                        <Pie
                            data={state}
                            options={{
                                title:{
                                    display:true,
                                    text:'Average Rainfall per month',
                                    fontSize:20
                                },
                                legend:{
                                    display:true,
                                    position:'right'
                                }
                            }}
                        />
                    </Flex>
                    <Flex>

                    </Flex>
                </VStack>
            </CardBody>
        </Card>
    )
}

export default SurveyManagementGraph