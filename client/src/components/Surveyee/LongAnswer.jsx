import useFormContext from "../../hooks/useFormContext"
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
    Flex,
    IconButton,
    Input 
} from '@chakra-ui/react'
import { PhoneIcon, AddIcon, ChevronLeftIcon } from '@chakra-ui/icons'

import BackButton from '../../images/backButton.png'

const LongAnswer = ({question, onChange}) => {
    const [value, setValue] = React.useState('1')
    const { data, handleChange } = useFormContext()
    return (

        <Box
            size='md'
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='elevated'
            p='5'
            m='5'
            borderRadius='20'
            // width='253px'
            // align='center'
            bgColor='white'
        >
            <Heading size='md' color={'#2B3674'} mb='5'>{question}</Heading>
            <Input 
                type='text' 
                variant='outline' 
                placeholder='Provide a short answer' 
                focusBorderColor='#6C63FF'
                onChange={(event) => onChange(event.target.value)}
            />
        </Box>

    )
}

export default LongAnswer