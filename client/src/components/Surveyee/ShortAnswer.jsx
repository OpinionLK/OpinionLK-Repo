import useFormContext from "../../hooks/useFormContext"
import React from 'react'
import { 
    Box,
    Heading,
    Input 
} from '@chakra-ui/react'

const ShortAnswer = ({ question, onChange }) => {
    // eslint-disable-next-line
    const [value, setValue] = React.useState('1')
    // eslint-disable-next-line
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
                w='400px'
                onChange={(event) => onChange(event.target.value)}
            />    
        </Box>

    )
}

export default ShortAnswer