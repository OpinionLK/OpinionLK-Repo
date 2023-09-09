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
            <Flex align='center' mb='10'>
                <IconButton variant='unstyled' aria-label='Back' icon={<ChevronLeftIcon />} color='#6C63FF' />
                <Text fontSize={'xs'} color={'#A3AED0'} pl='3'>
                    Question 1 of 10
                </Text>
            </Flex>
            <Heading size='md' color={'#2B3674'} mb='5'>Slaves should be free?</Heading>
            <RadioGroup colorScheme='purple' color='#2F2E41' onChange={setValue} value={value}>
                <Stack direction='column'>
                    <Radio value='1'>Yes</Radio>
                    <Radio value='2'>Ye</Radio>
                    <Radio value='3'>Aye</Radio>
                </Stack>
            </RadioGroup>
            <Button mt='5' colorScheme='purple' borderRadius='100px' bg='#6C63FF' w='100px'>Next</Button>
        </Box>

    )
}

export default ShortAnswer