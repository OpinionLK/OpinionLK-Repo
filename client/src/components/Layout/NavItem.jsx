import React from 'react'

import './style.css'

import {
    Flex,
    Icon,
} from '@chakra-ui/react';

import { NavLink } from "react-router-dom";

const NavItem = ({ linkName, navOpen, icon, route = '404' }) => {
    return (

        <Flex as={NavLink} to={route}
            mt={'20px'}
            _hover={{ textDecor: 'none', backgroundColor: "#565574" }}
            w={"100%"}
            borderRadius={"8px"}
           
        >
            <Flex display={'flex'} borderRadius={'10px'} p={'5px 30px'} color='white' width={'100%'} alignItems={'center'} height={'50px'}>
                <Flex gap={'20px'} justifyContent={'center'} alignItems={'center'}>
                    <Icon as={icon} width={'20px'} height={'20px'} />
                    <Flex
                        display={navOpen ? 'none' : 'flex'}
                    >
                        {linkName}
                    </Flex>


                </Flex>

            </Flex>
        </Flex>

    )
}

export default NavItem