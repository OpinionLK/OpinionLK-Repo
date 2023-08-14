import React from 'react'

// import './style.css'

import { 
    Card, 
    CardHeader, 
    CardBody, 
    CardFooter, 
    Text,
    Stack,
    StackDivider,
    Box,
    Heading,
    Divider,
    ButtonGroup,
    Button,
    Image,
    Flex
} from '@chakra-ui/react'

// import { NavLink } from "react-router-dom";
import {Line, Pie, Doughnut} from 'react-chartjs-2';
import Chart from 'chart.js/auto';

// sample data
const state = {
    labels: ['January', 'February', 'March',
             'April', 'May'],
    datasets: [
      {
        label: 'Surveys',
        fill: false,
        lineTension: 0.5,
        backgroundColor: '#fff',
        borderColor: '#4318FF',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56]
      }
    ]
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
                p={[2, 3]}
            >
                <Line
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