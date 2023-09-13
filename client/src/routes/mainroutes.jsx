import Landing from '../pages/Landing';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

import ClientLogin from '../pages/ClientLogin';
import ClientSignUp from '../pages/ClientSignUp';

import ErrorPage from '../pages/ErrorPage';
import Loading from '../pages/Loading';

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
        element: <Landing/>,
        errorElement: <ErrorPage />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <SignUp />,
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

    ...SurveyeeRoutes,
    ...OrganisationRoutes,
    ...adminRoutes,
    ...comManagerRoutes,
]
);

export default router;