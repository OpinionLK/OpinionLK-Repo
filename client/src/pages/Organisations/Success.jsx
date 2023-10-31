import { Heading, Spinner } from '@chakra-ui/react'
import React from 'react'
import { useEffect } from 'react';
import {
    Box,
    Flex,
    Grid,
    GridItem,
    Card,
    Text,
    CardHeader,

    CardBody,


} from '@chakra-ui/react'
import { useAuthContext } from '../../hooks/useAuthContext';

import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { AddIcon } from '@chakra-ui/icons'
import { useParams } from 'react-router-dom';

const Success = () => {
    const {
        user, dispatch, userData
    } = useAuthContext();
    // get the session id from the url
    const { session_id } = useParams();
    const getSession = async () => {
        console.log(session_id);

        const response = await axios.get(`http://localhost:3002/api/payment/success?session_id=${session_id}`, {
            headers: { 'Authorization': `Bearer ${user.token}` },
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }
    useEffect(async () => {
        getSession();


    }, []);

    return (
        //    show please wait
        <Flex height={'50%'} flexDirection={'column'} width={'100%'} justifyContent={'space-around'} alignItems={'center'}>
            <Heading>Please wait</Heading>
            <Flex padding={'50px'}>
                <Spinner />
            </Flex>
        </Flex>
    )


}

export default Success
