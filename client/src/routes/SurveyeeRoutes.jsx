
import Dashboard from "../pages/DashboardLayout"
import ClientPortal from "../pages/Surveyee/ClientPortal"
import Survey from "../pages/Surveyee/create-survey"
import Profile from "../pages/Surveyee/Profile"
import Serydashboard from "../pages/Surveyee/SurveyeeDashboard"
import Myrewards from "../pages/Surveyee/Myrewards"
import Upgrade from "../pages/Surveyee/Upgrade"

import { PrivateRoute } from '../components/Auth/PrivateRoute';

import { BsHouseFill } from 'react-icons/bs';

import {
    Navigate
} from 'react-router-dom';

const Links = [

    { route: '/portal/dashboard', linkName: 'Dashboard', icon: BsHouseFill },
    { route: '/portal/profile', linkName: 'Profile', icon: BsHouseFill },
    { route: '/portal/My Rewards', linkName: 'Rewards', icon: BsHouseFill },
    { route: '/portal/Upgrade', linkName: 'Upgrade', icon: BsHouseFill },
    { route: '/portal/create-survey', linkName: 'Create Survey', icon: BsHouseFill}];

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
                element: <Navigate to="/portal/dashboard" replace />,
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
                path: '/portal/create-survey',
                element: <Survey />,
            },
           
        ],
    },
]

export default SurveyeeRoutes