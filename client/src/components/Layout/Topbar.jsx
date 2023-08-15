import React from 'react'
import {
    Box,
    Flex,
    Text,
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    MenuGroup,
    MenuDivider
} from '@chakra-ui/react'

// import CreateSurveyModal from '../organisation/CreateSurveyModal'

import { Icon } from '@iconify/react';
import userdp from '../../images/topbar/download.jpeg'


import { useLogout } from '../../hooks/useLogout';

import { useAuthContext } from '../../hooks/useAuthContext';

const Topbar = () => {
    const { user } = useAuthContext()
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
                {/* <Image src={topbarLogo} alt="logo" width={'40px'} height={'40px'} margin={'5px'} pl={'5px'} />
                <Flex alignItems={'flex-end'}>
                    <Heading as="h2" size="md" fontWeight={'semibold'} pl={'5px'}>Home</Heading>
                    <Text size="s">&nbsp;/Dashboard</Text>
                </Flex> */}
            </Flex>

            <Flex gap={'10px'} mr={'20px'} alignItems={'center'}>
                
                    {/* <Button colorScheme='facebook'>Create a Survey</Button> : */}
                {/* {user.role !== 'client' ?
                    <CreateSurveyModal /> :


                        <Menu>
                            <MenuButton as={Button}
                                // alignItems={'center'}
                                width={'100px'}
                                height={'80%'}
                                padding={'10px 5px'}
                                transition={'0.3s'}
                                _hover={{
                                    textDecoration: 'none',
                                    bgColor: '#eae9ff',
                                }}
                                _active={{
                                    bgColor: '#c0bdef',
                                }}>
                                <Flex justifyContent={'center'} alignItems={'center'}>
                                    <Icon style={{ fontSize: '18px', color: '#4318FF' }} color={'brand.purple'} icon="mdi:star-four-points-circle-outline" />
                                    <Text pl="10px" color={'brand.darkPurple'} fontStyle={'normal'}>500</Text>
                                </Flex>
                            </MenuButton>
                            <MenuList>
                                <Flex height={'300px'} w={'500px'} justifyContent={'center'} alignItems={'center'}>
                                    <Box height={'90%'} w={'90%'} boxShadow='2xl' bgGradient='linear(to-r, green.200, pink.500)' borderRadius={'15px'}>

                                    </Box>
                                </Flex>
                            </MenuList>
                        </Menu>
                } */}
                        <Menu>

                            {({ isOpen }) => (
                                <>
                                    <MenuButton as={Avatar} size='md' padding={'5px'}
                                        transition={'0.3s'}
                                        _hover={{
                                            textDecoration: 'none',
                                            bgColor: '#eae9ff',
                                        }}
                                        _active={{
                                            bgColor: '#c0bdef',
                                        }}
                                        src={userdp} />

                                    <MenuList>
                                        <span style={{ textAlign: 'center' }}>
                                            {/* print json as a string */}
                                            {user && JSON.stringify(user.email)}
                                        </span>
                                        <MenuGroup title='Profile'>
                                            <MenuItem>My Account</MenuItem>
                                            <MenuItem onClick={() => {
                                                logout()
                                            }}>Sign Out </MenuItem>
                                        </MenuGroup>
                                        <MenuDivider />
                                        <MenuGroup title='Help'>

                                            <MenuItem>FAQ</MenuItem>
                                        </MenuGroup>
                                    </MenuList>
                                </>
                            )}
                        </Menu>
                        
            

                        </Flex>
                    </Box>
                )
}

                export default Topbar