import Landing from '../pages/Landing';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import ErrorPage from '../pages/ErrorPage';
import Dashboard from '../pages/Surveyee/Dashboard';
import ClientPortal from '../pages/Surveyee/ClientPortal';
import ClientPortal2 from '../pages/Surveyee/ClientPortal2';

import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Landing />,
        errorElement: <ErrorPage />,
        // loader: rootLoader,
        // children: [
        //   {
        //     path: 'contacts/:contactId',
        //     element: <Contact />,
        //   },
        // ]
    },
    // login route
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
                path: "",
                element: <ClientPortal />,
            },
            {
                path: "dashboard",
                element: <ClientPortal />,
            },
            {
                path: "home",
                element: <ClientPortal2 />,
            },
        ],
    }

]
);

export default router;