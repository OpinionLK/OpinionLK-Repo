import { useParams } from 'react-router-dom';

import { Button, Text, Heading, Flex, Image } from '@chakra-ui/react'

import complete from '../../images/complete.png'

// Your component
export default function SurveyComplete() {
    const { points } = useParams();
    console.log('points:' , points)
    return (
        <Flex
            direction='column'
            alignItems='center'
            justifyContent='center'
            height='100%'
        >
            <Heading m='3' color='#1B2559'>
                Survey Complete!
            </Heading>
            <Image m='3' src={complete}/>
            <Text m='3'>
                You have earned {points} points!
            </Text>
            <Button 
                m='5' 
                colorScheme='purple' 
                borderRadius='100px' 
                bg='#6C63FF' 
                w='100px'
                onClick={() => window.location.href = '/portal/dashboard'}
            >Home</Button>
        </Flex>
    );
}
