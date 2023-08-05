
import Dashboard from "../pages/DashboardLayout"
import ClientPortal from "../pages/Surveyee/ClientPortal"
import Survey from "../pages/Surveyee/Survey"

import { PrivateRoute } from '../components/Auth/PrivateRoute';



import { BsHouseFill } from 'react-icons/bs';

import {
    Navigate
} from 'react-router-dom';

const Links = [
    { route: '/portal/home', linkName: 'Home', icon: BsHouseFill },
    { route: '/portal/surveys/12', linkName: 'Dashboard', icon: BsHouseFill },
];

//   const { user } = useAuthContext()
const SurveyeeRoutes = [
    {
        path: '/portal',
        element: (
            <PrivateRoute>
                <Dashboard sidebarLinks={Links} /> ,
            </PrivateRoute>),
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
    },
]

export default SurveyeeRoutes