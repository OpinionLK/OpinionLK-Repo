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

import totalSurveysIcon from '../../images/totalSurveys-icon.png'

const StatCard = () => {

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
                alt='totalSurveys'
                ml='3'
            />
 
            <CardBody>
                <Text fontSize={'xs'} color={'#A3AED0'}>
                    Total Surveys
                </Text>
                <Heading size='md' color={'#2B3674'}>123</Heading>
            </CardBody>
        </Card>

    )
}

export default StatCard