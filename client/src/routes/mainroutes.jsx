import Landing from '../pages/Landing';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import ErrorPage from '../pages/ErrorPage';
import Dashboard from '../pages/Surveyee/DashboardLayout';
import ClientPortal from '../pages/Surveyee/ClientPortal';

import Survey from '../pages/Surveyee/Survey'

import {
    createBrowserRouter
    , Navigate
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
    {
        path: '/portal',
        element: <Dashboard />,
        children: [
            {
                path: '',
                element: <Navigate to="/portal/home" replace />,
            },
            {
                path: 'home',
                element: <ClientPortal />,
            },
            {
                path: '/portal/surveys/:id',
                element: <Survey />,
            }
        ],
    }

]
);

export default router;