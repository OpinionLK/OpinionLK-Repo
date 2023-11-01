import React from 'react';
import {
    Box,
    Flex,
    Button,
    Image
} from '@chakra-ui/react'
import topbarLogo from '../../images/logonav.png'
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

const Topbar = () => {
     // eslint-disable-next-line
    const { user, userData } = useAuthContext()
     // eslint-disable-next-line
    const logout = useLogout()
    return (
        <Box
            width={'100%'}
            height={'80px'}
            display={'flex'}
            justifyContent={'space-between'}
            position={'fixed'}
            top={'0'}
            zIndex={'100'}
            backgroundColor={'brand.dashboardBackground'}
            alignItems={'center'}>
            {/* Topbar Left Side, Logo + Page Name */}
            <Flex display={'flex'}
                width={'15%'}
                alignItems={'center'}
                justifyContent={'space-around'}
                pl={'20px'}>
                <Image src={topbarLogo} alt="logo" margin={'5px'} pl={'5px'} />
                {/* <Flex alignItems={'flex-end'}>
                    <Heading as="h2" size="md" fontWeight={'semibold'} pl={'5px'}>Home</Heading>
                    <Text size="s">&nbsp;/Dashboard</Text>
                </Flex> */}
            </Flex>

            <Flex gap={'10px'} mr={'20px'} alignItems={'center'}>
                <Button ml='5' colorScheme='purple' borderRadius='50px' bg='#6C63FF' w='150px' h='50'
                    onClick={()=>{window.location.href = 'http://localhost:3000/'}}
                >Join OpinionLK</Button>
            </Flex>
        </Box>
    )
}


export default Topbar
