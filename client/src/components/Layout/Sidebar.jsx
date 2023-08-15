import React from 'react'

import {
    Box,
    Flex,

} from '@chakra-ui/react'

import { Image } from '@chakra-ui/react'
import topbarLogo from '../../images/logonav.png'

import NavItem from './NavItem';


const Sidebar = ({ navOpen, setNavOpen, sidebarLinks }) => {

    console.log(sidebarLinks)
    return (
        <Box display={'flex'}
            flexDir={'column'}
            position={'fixed'}
            height={'100vh'}
            zIndex={'999'}
        >
            <Box
                height={'10%'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Image src={topbarLogo} alt="logo" boxSize={'200px'} objectFit={'contain'} margin={'5px'} pr={'20px'} />
            </Box>

            <Box

                display={'flex'}

                // width={'274px'}
                width={navOpen ? '100px' : '274px'}
                p={'20px 10px'}
                bottom={'0'}
                left={'0'}
                transition={'0.3s'}
                borderTopRightRadius={'20px'}
                border={'1px solid #E2E8F0'}
                height={'90%'}
                backgroundColor={'#FFF'}
            >

                <Flex
                    gap={'10px'}
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
                    {sidebarLinks.map((item, index) => (
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
        </Box>

    )
}

export default Sidebar