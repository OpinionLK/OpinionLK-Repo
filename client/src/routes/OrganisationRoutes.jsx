
import OrganisationDashboard from '../pages/DashboardLayout';
import MakeSurvey from '../pages//Organisations/MakeSurvey'
import Dashboard from '../pages//Organisations/Dashboard';
import { PrivateRoute } from '../components/Auth/PrivateRoute';
import SurveyPage from '../pages/Organisations/SurveyPage';



import {
    Navigate
} from 'react-router-dom';

import { BsHouseFill } from 'react-icons/bs';
// import { BiEditAlt } from 'react-icons/bi';
import { AiFillEdit } from 'react-icons/ai';
import { RiSurveyFill } from 'react-icons/ri';


const Links = [

    { route: '/organisation/home', linkName: 'Home', icon: BsHouseFill },
    { route: '/organisation/surveys', linkName: 'Surveys', icon: RiSurveyFill },
    { route: '/organisation/make-survey', linkName: 'Make Survey', icon: AiFillEdit },

];


const OrganisationRoutes = [
    {
        path: '/organisation',
        element: (
            <PrivateRoute>
                <OrganisationDashboard sidebarLinks={Links} />
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
                path: '/organisation/surveys',
                element: <SurveyPage />,
            },
        ],
    }
]

export default OrganisationRoutes