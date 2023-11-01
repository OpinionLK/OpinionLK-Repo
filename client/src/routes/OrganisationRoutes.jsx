import React from 'react';
import OrganisationDashboard from '../pages/DashboardLayout';
import MakeSurvey from '../pages//Organisations/MakeSurvey'
import Dashboard from '../pages//Organisations/Dashboard';
import { PrivateRoute } from '../components/Auth/PrivateRoute';
import SurveyPage from '../pages/Organisations/SurveyPage';
import PaymentBilling from '../pages/Organisations/PaymentBilling';
import Payments from '../pages/Organisations/Payments';
import EditSurvey from '../pages/Organisations/EditSurvey';
import TestComponenets from '../pages/Organisations/TestComponenets';

import {
    motion
} from 'framer-motion';

import {
    Navigate
} from 'react-router-dom';

import { BsHouseFill } from 'react-icons/bs';
// import { AiFillEdit } from 'react-icons/ai';
import { RiSurveyFill } from 'react-icons/ri';
import Success from '../pages/Organisations/Success';


const Links = [

    { route: '/organisation/home', linkName: 'Home', icon: BsHouseFill },
    { route: '/organisation/survey', linkName: 'Surveys', icon: RiSurveyFill },
    { route: '/organisation/paymentbilling', linkName: 'Payments & Billing', icon: RiSurveyFill },
    { route: '/organisation/payments', linkName: 'Payments', icon: RiSurveyFill },
    {
        
    }
    // { route: '/organisation/make-survey', linkName: 'Make Survey', icon: AiFillEdit },

];


const OrganisationRoutes = [
    {
        path: '/organisation',
        element: (
            <PrivateRoute allowedRoles={['client']}>
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
                    <OrganisationDashboard sidebarLinks={Links} />
                </motion.div>
            </PrivateRoute>
        ),
        children: [
            {
                path: '',
                element: <Navigate to="/organisation/home" replace />,
            },
            {
                path: 'home',
                element: <Dashboard />,

            },
            {
                path: '/organisation/make-survey',
                element: <MakeSurvey />,
            },
            {
                path: '/organisation/survey',
                element: <SurveyPage />,
            },
            {
                path: '/organisation/survey/:surveyid/edit',
                element: <EditSurvey />,
            },
            {
                path: '/organisation/test-components',
                element: <TestComponenets />,
            },
            {
                path: '/organisation/paymentbilling',
                element: <PaymentBilling />
            },
          
            {
                path: '/organisation/paymentbilling/success/:session_id',
                element: <Success />
            },
        ],
    }
]

export default OrganisationRoutes