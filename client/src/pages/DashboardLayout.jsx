import React, { useEffect } from 'react'
import { useState } from 'react'

import Topbar from '../components/Layout/Topbar'
import Sidebar from '../components/Layout/Sidebar'

import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import { useAuthContext } from '../hooks/useAuthContext'
import { motion } from 'framer-motion'
import { useLogout } from '../hooks/useLogout';

import '../components/Layout/style.css'

const Dashboard = ({ sidebarLinks }) => {
    const logout = useLogout()

    const {
        // eslint-disable-next-line
        user, dispatch, userData
    } = useAuthContext();

    useEffect(() => {

        const fetchUserData = async () => {
            let url
            try {
                if (user.type === 'user' || user.type === 'client') {
                    if (user.type === 'user') {
                        url = 'http://localhost:3002/api/user/userdata'
                    }
                    else if (user.type === 'client') {
                        url = 'http://localhost:3002/api/client/clientdata'
                    }
                    const response = await fetch(url, {
                        method: 'GET',
                        headers: { 'Authorization': `Bearer ${user.token}` },
                    });
                    if (response.status === 401) {
                        logout()
                    }
                    console.log('fetching user data')
                    const json = await response.json();
                    dispatch({ type: 'SET_USER_DATA', payload: json });
                    console.log('User data:', json);
                }
            } catch (error) {
                console.log(error);
            }
        }

        if (user) {
            fetchUserData();
        }
        // eslint-disable-next-line
    }, [dispatch, user]);

    const [navOpen, setNavOpen] = useState(false)

    return (
        <Box
            backgroundColor={'brand.dashboardBackground'}>
            <Topbar />

            <Sidebar navOpen={navOpen} setNavOpen={setNavOpen} sidebarLinks={sidebarLinks} />

            <Box
                width={navOpen ? 'calc(100% - 100px)' : 'calc(100% - 274px)'}
                minHeight={'calc(100vh - 80px)'}
                height={'80vh'}
                position={'fixed'}
                overflow={'auto'}
                mt={'20px'}
                p={'20px'}
                transition={'0.3s'}
                // display={'flex'}
                // flexDir={'column'}
                // gap={'20px'}
                backgroundColor={'brand.dashboardBackground'}
                zIndex={0}
                left={navOpen ? '100px' : '274px'}
                top={'80px'}
            >

                {/* {
                    JSON.stringify(userData)
                }
                {
                    JSON.stringify(user)

                } */}
                <motion.div

                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}

                >

                    <Outlet />
                </motion.div>

            </Box >
        </Box>
    )
}

export default Dashboard