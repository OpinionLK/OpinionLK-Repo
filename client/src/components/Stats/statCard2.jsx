import React, { useEffect, useState } from 'react';
import {
    Text,
    Card,
    CardBody,
    Heading,
    Image,
} from '@chakra-ui/react';
import totalSurveysIcon from '../../images/totalSurveys-icon.png';
import axios from 'axios';

const StatCard1 = () => {
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        // Make an HTTP get request to fetch the total survey count
        axios.post('http://localhost:3002/api/auth/totalusers')
            .then(response => {
                // Update the state with the received survey count
                setTotalUsers(response.data.userCount);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <Card
            size='md'
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='elevated'
            p={[2, 3]}
            borderRadius='20'
            width='253px'
            align='center'
        >
            <Image
                top='50%'
                boxSize='60px'
                borderRadius='full'
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={totalSurveysIcon}
                alt='totalUsers'
                ml='3'
            />

            <CardBody>
                <Text fontSize={'xs'} color={'#A3AED0'}>
                    Total No of Users
                </Text>
                <Heading size='md' color={'#2B3674'}>{totalUsers}</Heading>
            </CardBody>
        </Card>
    );
}

export default StatCard1;
