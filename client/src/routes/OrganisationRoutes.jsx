
import OrganisationDashboard from '../pages/DashboardLayout';
import MakeSurvey from '../pages//Organisations/MakeSurvey'

import {
    Navigate
} from 'react-router-dom';

import { BsHouseFill } from 'react-icons/bs';
import { BiEditAlt } from 'react-icons/bi';

const Links = [

    { route: '/organisation/home', linkName: 'Home', icon: BsHouseFill },
    { route: '/organisation/make-survey', linkName: 'Make Survey', icon: BiEditAlt },

];


const OrganisationRoutes = [
    {
        path: '/organisation',
        element: <OrganisationDashboard sidebarLinks={Links} />,
        children: [
            {
                path: '',
                element: <Navigate to="/organisation/home" replace />,
            },
            {
                path: 'home',

            },
            {
                path: '/organisation/make-survey',
                element: <MakeSurvey />,
            }
        ],
    }
]

export default OrganisationRoutes