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
    Radio, 
    RadioGroup,
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
            <Heading size='md' color={'#2B3674'} mb='5'>Slaves should be free?</Heading>
            <RadioGroup colorScheme='purple' color='#2F2E41' onChange={setValue} value={value}>
                <Stack direction='column'>
                    <Radio value='1'>Yes</Radio>
                    <Radio value='2'>Ye</Radio>
                    <Radio value='3'>Aye</Radio>
                </Stack>
            </RadioGroup>
        </Box>

    )
}

export default ShortAnswer