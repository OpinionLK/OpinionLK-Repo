
import Dashboard from "../pages/DashboardLayout"
import ClientPortal from "../pages/Surveyee/ClientPortal"
import Survey from "../pages/Surveyee/Survey"
import Profile from "../pages/Surveyee/Profile"
import Serydashboard from "../pages/Surveyee/SurveyeeDashboard"
// import Profile2 from "../pages/Surveyee/Profile2"

import { PrivateRoute } from '../components/Auth/PrivateRoute';



import { BsHouseFill } from 'react-icons/bs';

import {
    Navigate
} from 'react-router-dom';

const Links = [
    { route: '/portal/home', linkName: 'Home', icon: BsHouseFill },
    { route: '/portal/dashboard', linkName: 'Dashboard', icon: BsHouseFill },
    { route: '/portal/profile', linkName: 'Profile', icon: BsHouseFill },
    // { route: '/portal/profile2', linkName: 'profile2', icon: BsHouseFill },
];

//   const { user } = useAuthContext()
const SurveyeeRoutes = [
    {
        path: '/portal',
        element: (
            <PrivateRoute allowedRoles={['user']}>
                <Dashboard sidebarLinks={Links} /> ,
            </PrivateRoute>
            ),
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
                path: '/portal/dashboard',
                element: <Serydashboard />,
            },
            {
                path: '/portal/profile',
                element: <Profile />,
            },
            // {
            //     path: '/portal/profile2',
            //     element: <Profile2 />,
            // },
        ],
    },
]

export default SurveyeeRoutes