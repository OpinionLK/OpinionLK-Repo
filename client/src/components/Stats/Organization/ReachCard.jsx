import React from 'react'
// import './style.css'
import { 
    Card, 
    Box,
    Text,
    CardFooter
} from '@chakra-ui/react'
// import { NavLink } from "react-router-dom";
import { Bar} from 'react-chartjs-2';
// import Chart from 'chart.js/auto';

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

const StatCard = () => {
    return (

        <Card
            // size='md'
            // direction={{ base: 'column', sm: 'row' }}
            variant='elevated'
            width={'auto'}
            borderRadius='20'
            align='center'
        >
            <Box
                position="relative"
                width="100%"
                height="auto" // Set your desired height here
                overflow="hidden"
                px={'10px'}
                pt={'30px'}
                top='3%'
            >
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
            </Box>

            <CardFooter>
                <Text fontWeight={600}>
                    Total Surveys
                </Text>
            </CardFooter>
            

            
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