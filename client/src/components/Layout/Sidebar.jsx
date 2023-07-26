import React from 'react'

import {
    Box,
    Flex,

} from '@chakra-ui/react'

import { BsHouseFill } from 'react-icons/bs'


import NavItem from './NavItem';

const Sidebar = ({ navOpen, setNavOpen }) => {


    const sidebarlinks = [
        { route: '/portal/home', linkName: 'Home', icon: BsHouseFill },
        { route: '/portal/surveys/12', linkName: 'Dashboard', icon: BsHouseFill },
    ];


    return (
        <Box
            zIndex={'100'}

            display={'flex'}
            position={'fixed'}
            // width={'274px'}
            width={navOpen ? '100px' : '274px'}
            p={'20px 10px'}
            bottom={'0'}
            left={'0'}
            transition={'0.3s'}
            borderTopRightRadius={'20px'}
            height={'90vh'}
            backgroundColor={'#2F2E41'}
        >

            <Flex
                width={'100%'}
                flexDir={'column'}
                alignItems={'center'}

            >
                {/* <Flex
                width={'100%'}
                alignContent={'center'}
                justifyContent={'center'}
                >
                    <Button variant={'ghost'} colorScheme='whiteAlpha' onClick={() => {

                        setNavOpen(!navOpen)
                    }}>

                        <Icon as={HiMenu} color={'white'} />
                    </Button>
                </Flex> */}

                {/*               
                <NavItem route="/portal/home" linkName="Home" navOpen={navOpen} icon={BsHouseFill} />
                <NavItem route="/portal/dashboard" linkName="Home" navOpen={navOpen} icon={BsHouseFill} />
                <NavItem linkName="Hoefwfweme" navOpen={navOpen} icon={BsHouseFill} />
                <NavItem linkName="Hofwefme" navOpen={navOpen} icon={BsHouseFill} />
                <NavItem linkName="efw" navOpen={navOpen} icon={BsHouseFill} /> */}
                {sidebarlinks.map((item, index) => (
                    <NavItem
                        key={index}
                        route={item.route}
                        linkName={item.linkName}
                        navOpen={navOpen}
                        icon={item.icon}
                    />
                ))}


        </Flex>
        </Box >
    )
}

export default Sidebar