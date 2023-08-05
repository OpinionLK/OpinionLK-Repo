
import { useState } from 'react'

import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Select,
    Flex,
    VStack
} from '@chakra-ui/react'
import React from 'react'

const   Layout = () => {

    const [type, setType] = useState('text')

    return (

        <>
            <Box mt={'50px'} ml={'50px'} width={'50%'}>
                <VStack alignItems={'flex-start'} gap={'20px'}>
                    <FormControl id="question" isRequired>
                        <FormLabel>Question</FormLabel>
                        <Input boxShadow='xl' variant={'outline'} />
                    </FormControl>

                    <FormControl width={'50%'} id="type" isRequired>
                        <FormLabel>Type</FormLabel>
                        <Select placeholder="Select type" boxShadow='xl' variant='outline2' onChange={(e) => setType(e.target.value)}>
                            <option value="text">Text</option>
                            <option value="multiplechoice">Multiple Choice</option>
                            <option value="radio">Radio</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="dropdown">Dropdown</option>
                        </Select>
                    </FormControl>


                    {type === 'text' ? (
                        <Flex gap={'20px'} w={'100%'}>
                            <FormControl id="text" isRequired w={'60%'}>
                                <FormLabel>Input Placeholder</FormLabel>
                                <Input boxShadow='xl' variant={'outline'} />
                            </FormControl>

                            <FormControl id="text" isRequired w={'40%'}>
                                <FormLabel>Response Type</FormLabel>
                                <Select placeholder="Select type" variant='outline' boxShadow='base' onChange={(e) => setType(e.target.value)}>
                                    <option value="text" selected='selected'>Text</option>
                                    <option value="email">E-mail</option>
                                </Select>
                            </FormControl>
                        </Flex>

                    ) : type === 'number' ? (
                        <p>This is a number component.</p>
                    ) : (
                        <p>Other type of component.</p>
                    )}


                </VStack>
            </Box>
        </>
    )
}

export default Layout