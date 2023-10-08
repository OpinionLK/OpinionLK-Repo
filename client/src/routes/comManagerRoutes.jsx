import DashBoard from '../pages/DashboardLayout';
import { PrivateRoute } from '../components/Auth/PrivateRoute';

import CommunityManagerDashBoard from '../pages/CommunityManager/CommunityManagerDashboard';
import CommuntyManagerTables from '../pages/CommunityManager/CommunityManagerTables';
import CommunityManagerActions from '../pages/CommunityManager/CommunityMangerActions';

import {
    Navigate
} from 'react-router-dom';

import { BsHouseFill, 
    // BsCollectionFill, 
    // BsTable 
} from 'react-icons/bs';
// import { BiSolidEditAlt } from 'react-icons/bi';

const Links = [

    { route: '/ComManager/dashboard', linkName: 'Dashboard', icon: BsHouseFill },
    { route: '/ComManager/Tables', linkName: 'Tables',icon:BsHouseFill},
];

const ComManagerRoutes = [
    {
        path: '/ComManager',
        element: (
            <PrivateRoute allowedRoles={['manager']}>
                <DashBoard sidebarLinks={Links} />
            </PrivateRoute>
        ),
        children: [
            {
                path:'',
                element: <Navigate to="/ComManager/dashboard" replace/>
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