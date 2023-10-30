import useFormContext from "../../hooks/useFormContext"
import React from 'react'

import { 
    Box,
    Heading,
    Divider,
    Text
} from '@chakra-ui/react'
import { PhoneIcon, AddIcon, ChevronLeftIcon } from '@chakra-ui/icons'

import BackButton from '../../images/backButton.png'

const SurveyDetails = ({surveyName, surveyDescription, tags}) => {
    return (

        <Box
            size='md'
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='elevated'
            p='5'
            pl='2'
            m='5'
            mt='100'
            borderRadius='20'
            // width='253px'
            // align='center'
            bgColor='white'
        >
            <Heading size='lg' color={'#2B3674'} mb='5' ml='5'>{surveyName}</Heading>
            <Text size='md' color={'#2B3674'} mb='5' ml='5'>{surveyDescription}</Text>
            
        </Box>

    )
}

export default SurveyDetails