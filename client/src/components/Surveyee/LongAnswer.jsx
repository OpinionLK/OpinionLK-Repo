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

const ShortAnswer = () => {
    const [value, setValue] = React.useState('1')
    const { data, handleChange } = useFormContext()
    return (

        <Box
            size='md'
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='elevated'
            p='5'
            borderRadius='20'
            // width='253px'
            // align='center'
            bgColor='white'
        >
            <Heading size='md' color={'#2B3674'} mb='5'>What is your opinion on the meaning of life?</Heading>
            <Input variant='outline' placeholder='Provide a long answer' focusBorderColor='#6C63FF'/>
        </Box>

    )
}

export default ShortAnswer