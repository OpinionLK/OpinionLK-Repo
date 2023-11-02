import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Card, Flex } from '@chakra-ui/react';
import StatViewCard from '../StatViewCard';
import { Chart } from 'react-google-charts';

const Temp = () => {
    const [data, setData] = useState([]);
    const [arr1, setArr1] = useState([]);
    const [arr2, setArr2] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3002/api/survey/countWithStatus')
            .then((response) => {
                setData(response.data);
                const tempArr1 = [];
                const tempArr2 = [];

                response.data.forEach((item) => {
                    tempArr1.push(item._id);
                    tempArr2.push(item.count);
                });

                setArr1(tempArr1);
                setArr2(tempArr2);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const chartData = [['Task', 'Hours per Day']].concat(arr1.map((task, index) => [task, arr2[index]]));

    const options = {
        title: 'My Daily Activities',
        colors: ['#E57373', '#81C784', '#64B5F6', '#FFD54F', '#FFB74D'], // Set your colors with opacity
    };

    return (
        <Box>
            <Flex justifyContent="space-between"> {/* Use "space-between" for equal space */}
                {data.map((item) => (
                    <Box pb={5} key={item._id}  maxWidth={40} style={{ flex: 1, margin: '0 5px' }}>
                        <StatViewCard str={item._id} num={item.count} />
                    </Box>
                ))}
            </Flex>
        </Box>
    );
};

export default Temp;
