import React from 'react'
import Topbar from '../../components/Surveyee/Topbar'
import Sidebar from '../../components/Surveyee/Sidebar'

import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

const Dashboard = () => {
    return (
        <Box backgroundColor={'#F7FAFC'}
        >

            <Topbar />
            <Sidebar />
            <Box
                marginLeft={'8vw'} marginTop={'12vh'}
            >
                <Outlet />
            </Box >
        </Box>
    )
}

export default Dashboard