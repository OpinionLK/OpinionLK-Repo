import React from 'react'
import { 
    Card, 
    Text,
    Box,
    Flex,
    Spacer,
    IconButton
} from '@chakra-ui/react'
import {Line} from 'react-chartjs-2';
import { FaChartBar } from 'react-icons/fa'

// sample data
const state = {
    labels: ['JAN', 'FEB', 'MAR',
             'APR', 'MAY'],
    datasets: [
      {
        label: 'Modern Art...',
        fill: false,
        lineTension: 0.4,
        backgroundColor: '#fff',
        borderColor: '#4318FF',
        borderWidth: 3,
        data: [65, 59, 80, 81, 56]
      },
      {
        label: 'AI and ML...',
        fill: false,
        lineTension: 0.4,
        backgroundColor: '#fff',
        borderColor: '#6AD2FF',
        borderWidth: 3,
        data: [43, 34, 90, 91, 70]
      }
    ],
  }

const StatCard = () => {
    return (

        <Card
            size='md'
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='elevated'
            // p={[2, 3]}
            mt={5}
            borderRadius='20'
            align='center'
        >
            <Box
                position="relative"
                width="570px"  // Set your desired width here
                height="300px" // Set your desired height here
                overflow="hidden"
                p= '3'
            >

                <Flex pl='3' pr='3'>
                    <Box>
                        
                        <Text fontSize={20} fontWeight={'semibold'} color={'#2B3674'}>
                            Survey Responses
                        </Text>
                        {/* <Text fontSize={12} fontWeight={'regular'} color={'#A3AED0'}>
                            Data and Analytics
                        </Text> */}
                    </Box>
                    <Spacer/>

                    <IconButton aria-label='Add to friends' icon={<FaChartBar/>} borderRadius={50} color='#4318FF' backgroundColor={'#F4F7FE'}/>
                </Flex>
                
                <Box
                    position="relative"
                    overflow="hidden"
                    p= '5'
                    pt='0'
                >
                    <Line
                        data={state}
                        options={{
                            plugins: {
                                legend:{
                                    display:true,
                                    position:'top',
                                    labels: {
                                        usePointStyle: true,
                                        pointStyleWidth: 2.5,
                                        boxWidth: 3,
                                        pointStyle: 'circle',
                                    }
                                },
                            },
                            scales: {
                                x: {
                                    grid: {
                                        display: false
                                    },
                                    border: {
                                        display: false
                                    }
                                },
                                y: {
                                    display: false,
                                    // grid: {
                                    //     display: false
                                    // },
                                    // border: {
                                    //     display: false
                                    // }
                                }
                            }
                        }}
                    />
                </Box>
            </Box>
            

            
            {/* <CardBody>
                <Text size='0.2'>
                    Total Surveys
                </Text>
                <Heading size='sm'>123</Heading>
            </CardBody> */}
    
        </Card>

    )
}

export default StatCard