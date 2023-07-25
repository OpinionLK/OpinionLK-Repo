import React from 'react'

import {
    Box,
    Text,
    Flex,
} from '@chakra-ui/react'

const Sidebar = () => {
    return (
        <Box
            position={'fixed'}
            width={'5%'}
            _hover = {{
                width: '15%',
            }}
            bottom={'0'}
            left={'0'}
            transition={'0.3s'}
            borderTopRightRadius={'20px'}
            height={'90vh'}
            backgroundColor={'brand.blue'}
        >

            <Flex
                flexDirection={'column'}
                alignItems={'center'}
                justifyContent={'space-around'}
                height={'100%'}
            >

            </Flex>
        </Box>
    )
}

export default Sidebar