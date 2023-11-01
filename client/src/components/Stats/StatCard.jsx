import React from 'react'
// import './style.css'
import { 
    Text,
    Card, 
    CardBody, 
    Heading,
    Image,
} from '@chakra-ui/react'

import totalSurveysIcon from '../../images/totalSurveys-icon.png'

const StatCard = ({statName, stat}) => {

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
                    Total No of users
                </Text>
                <Heading size='md' color={'#2B3674'}>{stat}</Heading>
            </CardBody>
        </Card>

    )
}

export default StatCard