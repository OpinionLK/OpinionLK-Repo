import React from "react";
import {
    Heading,
    Card,
    CardHeader,
    CardBody,
    VStack,
    Flex,
} from '@chakra-ui/react'
import { Bar } from 'react-chartjs-2';
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

const SurveyFillingGraph = () => {
    const state = {
        labels: ['19th', '20th', '21st', '22nd', '23rd', '24th', '25th', '26th'],
        datasets: [
          {
            label: 'Filled',
            backgroundColor: '#775FFC',
            barThickness: 12,
            borderRadius: '15px',
            // borderSkipped: true,
            data: [65, 59, 80, 41, 56, 40, 80, 30]
          },
          {
            label: 'Viewed',
            backgroundColor: '#84D9FD',
            barThickness: 12,
            borderRadius: '15px',
            // borderSkipped: true,
            data: [65, 59, 80, 61, 56, 50, 40, 70]
          },
          {
            label: 'Aim',
            borderColor: '#E6EDF9',
            backgroundColor: '#E6EDF9',
            barThickness: 12,
            borderwidth: 2,
            borderRadius: 1000,
            borderSkipped: 'middle',
            data: [65, 59, 80, 21, 56, 100, 40, 60]
          }
        ]
      }

    return (
        <Card borderRadius={'20px'} width={'100%'}>
            <CardHeader>
                <Heading size={'md'}>Survey filling Stat</Heading>
            </CardHeader>
            <hr />
            <CardBody>
                <VStack>
                    <Flex width={'100%'} h={'300px'} justifyContent={'center'}>
                        <Bar
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
                                },
                                scales: {
                                    x: {
                                        stacked: true
                                    },
                                    y: {
                                        stacked: true
                                    }
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

export default SurveyFillingGraph