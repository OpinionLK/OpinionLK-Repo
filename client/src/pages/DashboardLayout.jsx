import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';

import Topbar from '../components/Layout/Topbar'
import Sidebar from '../components/Layout/Sidebar'

import { Outlet } from 'react-router-dom';
import { Box, Grid } from '@chakra-ui/react';

import '../components/Layout/style.css'

const Dashboard = ({ sidebarLinks }) => {

    const [navOpen, setNavOpen] = useState(false)
    const params = useParams();


    return (
        <Box
            backgroundColor={'#F8FAFC'}>
            <Topbar />

            <Sidebar navOpen={navOpen} setNavOpen={setNavOpen} sidebarLinks={sidebarLinks} />
            
            <Box
                width={navOpen ? 'calc(100% - 100px)' : 'calc(100% - 274px)'}
                minHeight={'calc(100vh - 80px)'}
                position={'absolute'}
                p={'20px'}
                transition={'0.3s'}
                backgroundColor={'#F8FAFC'}

                left={navOpen ? '100px' : '274px'}
                top={'80px'}
            >
                <Outlet />

            </Box >
        </Box>
    )
}

export default Dashboard