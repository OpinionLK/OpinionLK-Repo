
import OrganisationDashboard from '../pages/DashboardLayout';
import MakeSurvey from '../pages//Organisations/MakeSurvey'
import { PrivateRoute } from '../components/Auth/PrivateRoute';
import SurveyPage from '../pages/Organisations/SurveyPage';

import EditSurvey from '../pages/Organisations/EditSurvey';


import {
    Navigate
} from 'react-router-dom';

import { BsHouseFill } from 'react-icons/bs';
import { BiEditAlt } from 'react-icons/bi';
import { RiSurveyLine } from 'react-icons/ri';


const Links = [

    { route: '/organisation/home', linkName: 'Home', icon: BsHouseFill },
    { route: '/organisation/mysurveys', linkName: 'Surveys', icon: RiSurveyLine },
    // { route: '/organisation/make-survey', linkName: 'Make Survey', icon: BiEditAlt },

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
                element: <Navigate to="/organisation/mysurveys" replace />,
            },
            {
                path: 'home',

            },
            {
                path: '/organisation/make-survey',
                element: <MakeSurvey />,
            },
            {
                path: '/organisation/mysurveys',
                element: <SurveyPage />,
            },
            {
                path: '/organisation/survey/:surveyid/edit',
                element: <EditSurvey />,
            },
        ],
    }
]

export default OrganisationRoutes