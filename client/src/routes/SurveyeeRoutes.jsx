import React from 'react'
import Dashboard from "../pages/DashboardLayout"
import ClientPortal from "../pages/Surveyee/ClientPortal"
import Surveys from "../pages/Surveyee/surveys"
import Profile from "../pages/Surveyee/Profile"
import Serydashboard from "../pages/Surveyee/SurveyeeDashboard"
import Myrewards from "../pages/Surveyee/Myrewards"
import Upgrade from "../pages/Surveyee/Upgrade"
import TestSurvey from "../pages/Surveyee/TestSurvey"
import Survey from "../pages/Surveyee/Survey"

import { PrivateRoute } from '../components/Auth/PrivateRoute';
import { motion } from 'framer-motion'
import { RiSurveyFill, RiDashboardFill, RiFolderUserFill, RiTicketFill} from 'react-icons/ri';
import { GiUpgrade } from 'react-icons/gi';

import {
    Navigate
} from 'react-router-dom';

const Links = [

    { route: '/portal/dashboard', linkName: 'Dashboard', icon: RiDashboardFill },
    { route: '/portal/surveys', linkName: 'Surveys', icon: RiSurveyFill },
    { route: '/portal/profile', linkName: 'Profile', icon: RiFolderUserFill },
    { route: '/portal/My Rewards', linkName: 'Rewards', icon: RiTicketFill },
    { route: '/portal/Upgrade', linkName: 'Upgrade', icon: GiUpgrade }];

//   const { user } = useAuthContext()
const SurveyeeRoutes = [
    {
        path: '/portal',
        element: (
            <PrivateRoute allowedRoles={['user']}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: 0.2,
                        ease: 'easeOut',
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                >
                    <Dashboard sidebarLinks={Links} /> ,
                </motion.div>
            </PrivateRoute>
        ),
        children: [
            {
                path: '',
                element: <Navigate to="/portal/dashboard" replace />,
            },
            {
                path: 'home',
                element: <ClientPortal />,
            },
            {
                path: '/portal/dashboard',
                element: <Serydashboard />,
            },
            {
                path: '/portal/surveys',
                element: <Surveys />,
            },
            {
                path: '/portal/profile',
                element: <Profile />,
            },
            {
                path: '/portal/My Rewards',
                element: <Myrewards />,
            },
            {
                path: '/portal/Upgrade',
                element: <Upgrade />,
            },
            {
                path: '/portal/testSurvey',
                element: <TestSurvey />,
            },
            {
                path: '/portal/survey/:surveyid/fill',
                element: <Survey />,
            },


        ],
    },
]

export default SurveyeeRoutes