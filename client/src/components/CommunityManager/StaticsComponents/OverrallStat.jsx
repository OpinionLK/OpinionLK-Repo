import React from 'react'
import {
    Card,
    Box,
} from '@chakra-ui/react'
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Line, } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

// sample data

const OverallStat = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3002/api/survey/countWithStatus') 
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    const arr1 = [];
    const arr2 = [];

    data.forEach((item) => {
        arr1.push(toString(item.status));
        arr2.push(item.count);
    });

    console.log(arr1);
    console.log(arr2);


    const state = {
        labels: arr1,
        datasets: [
            {
                label: 'Status',
                fill: false,
                lineTension: 0.5,
                backgroundColor: '#fff',
                borderColor: '#4318FF',
                borderWidth: 2,
                data: arr2,
            }
        ]
    }




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
            <Box>
                {arr1[0]}
            </Box>
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
                        title: {
                            display: true,
                            text: 'Status with Count',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                />
            </Box>
            <Box>
                <h1>Grouped Approval Status Counts</h1>
                <ul>
                    {data.map((item) => (
                        <li key={item.status}>
                            {item.status}: {item.count}
                        </li>
                        
                    ))}
                    
                </ul>
            </Box>
        </Card>


    )
}

export default OverallStat;