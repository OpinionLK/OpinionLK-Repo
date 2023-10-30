import Landing from '../pages/Landing';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

import ClientLogin from '../pages/ClientLogin';
import ClientSignUp from '../pages/ClientSignUp';
import { motion } from 'framer-motion';

import ErrorPage from '../pages/ErrorPage';
import Loading from '../pages/Loading';

import SurveyAnonymous from '../pages/SurveyAnonymous';
import SurveyAnonComplete from '../pages/SurveyAnonComplete';

// import CommunityManagerDashBoard from '../pages/CommunityManager/CommunityManagerDashboard';
import OrganisationRoutes from './OrganisationRoutes';
import SurveyeeRoutes from './SurveyeeRoutes';
import adminRoutes from './adminRoutes';
import comManagerRoutes from './comManagerRoutes';

import {
    createBrowserRouter

} from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Landing />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/login',
        element:
            <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut',   
                type: "spring",
                stiffness: 260,
                damping: 20
                

            }}
            >
                <Login /></motion.div>,
    },
    {
        path: '/signup',
        element: <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut',
            type: "spring",
            stiffness: 260,
            damping: 20
        }}
        > <SignUp />
        </motion.div>
        ,
    },


    {
        path: '/loading',
        element: <Loading />,
    },

    {
        path: '/client/login',
        element: <ClientLogin />,
    },
    {
        path: '/client/signup',
        element: <ClientSignUp />,
    },
    {
        path: '/surveyAnonymous/:surveyid',
        element: <SurveyAnonymous />,
    },
    {
        path: '/surveyAnonymous/complete/:points',
        element: <SurveyAnonComplete/>,
    },

    ...SurveyeeRoutes,
    ...OrganisationRoutes,
    ...adminRoutes,
    ...comManagerRoutes,
]
);

export default router;