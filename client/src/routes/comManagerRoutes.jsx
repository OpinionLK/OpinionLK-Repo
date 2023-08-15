import DashBoard from '../pages/DashboardLayout';
import { PrivateRoute } from '../components/Auth/PrivateRoute';

import CommunityManagerDashBoard from '../pages/CommunityManager/CommunityManagerDashboard';

import {
    Navigate
} from 'react-router-dom';

import { BsHouseFill, BsCollectionFill, BsTable } from 'react-icons/bs';
// import { BiSolidEditAlt } from 'react-icons/bi';

const Links = [

    { route: '/ComManager/dashboard', linkName: 'Dashboard', icon: BsHouseFill },
    

];

const ComManagerRoutes = [
    {
        path: '/ComManager',
        element: (
            <PrivateRoute>
                <DashBoard sidebarLinks={Links} />
            </PrivateRoute>
        ),
        children: [
            {
                path:'',
                element: <Navigate to="Commanager/dashboard" replace/>
            },
            {
                path: '/ComManager',
                element: <Navigate to="/ComManager" />,
            },
            {
                path: '/ComManager/dashboard',
                element: <CommunityManagerDashBoard />,
            },
         
           
        ],
    }
]

export default ComManagerRoutes