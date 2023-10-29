import React from 'react'
import { 
    Card, 
    Text,
    Box,
    Flex,
    Spacer,
    IconButton
} from '@chakra-ui/react'
import { Bar} from 'react-chartjs-2';
import { FaChartBar } from 'react-icons/fa'

const state = {
    labels: ['19th', '20th', '21st', '22nd', '23rd', '24th', '25th', '26th'],
    datasets: [
      {
        label: 'Filled',
        backgroundColor: '#775FFC',
        barThickness: 12,
        borderRadius: 100,
        borderSkipped: 'middle',
        data: [15, 15, 22, 10, 16, 13, 10, 30]
      },
      {
        label: 'Viewed',
        backgroundColor: '#84D9FD',
        barThickness: 12,
        borderRadius: 100,
        borderSkipped: 'middle',
        data: [30, 37, 40, 35, 26, 30, 22, 36]
      },
      {
        label: 'Aim',
        borderColor: '#E6EDF9',
        backgroundColor: '#E6EDF9',
        barThickness: 12,
        borderwidth: 2,
        borderRadius: 100,
        borderSkipped: 'middle',
        data: [65, 59, 80, 70, 56, 100, 40, 60]
      }
    ]
  }

const StatCard = () => {
    return (

        <Card
            size='md'
            // direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='elevated'
            // p={[2, 3]}
            mt={5}
            borderRadius='20'
            align='center'
        >
            <Box
                position="relative"
                width="520px"
                height="3057x" // Set your desired height here
                overflow="hidden"
                p= '3'
            >
                <Flex pl='3' pr='3'>
                    <Box pb='3'>
                        
                        <Text fontSize={20} fontWeight={'semibold'} color={'#2B3674'}>
                            Your Reach
                        </Text>
                        <Text fontSize={12} fontWeight={'regular'} color={'#A3AED0'}>
                            Data and Analytics
                        </Text>
                    </Box>
                    <Spacer/>

                    <IconButton aria-label='Add to friends' icon={<FaChartBar/>} borderRadius={50} color='#4318FF' backgroundColor={'#F4F7FE'}/>
                </Flex>

                <Bar
                    data={state}
                    options={{
                        plugins: {
                            legend:{
                                display:true,
                                position:'top',
                                labels: {
                                    usePointStyle: true,
                                    pointStyle: 'circle',
                                }
                            },
                        },
                        scales: {
                            x: {
                                stacked: true,
                                grid: {
                                    display: false
                                },
                                border: {
                                    display: false
                                }
                            },
                            y: {
                                // stacked: true,
                                grid: {
                                    display: false
                                },
                                border: {
                                    display: false
                                }
                            }
                        }
                    }}
                />
            </Box>
        </Card>

    )
}

export default StatCard 