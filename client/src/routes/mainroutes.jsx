import Landing from '../pages/Landing';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import ErrorPage from '../pages/ErrorPage';

import OrganisationRoutes from './OrganisationRoutes';
import SurveyeeRoutes from './SurveyeeRoutes';

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
        element: <Login />,
    },
    {
        path: '/signup',
        element: <SignUp />,
    },

    ...SurveyeeRoutes,
    ...OrganisationRoutes,
]
);

export default router;