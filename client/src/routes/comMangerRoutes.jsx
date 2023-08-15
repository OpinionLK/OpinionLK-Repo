import CommunityManagerDashBoard from '../pages/CommunityManager/CommunityManagerDashboard';
import { PrivateRoute } from '../components/Auth/PrivateRoute';
// import Adminprofile from '../pages/Admin/profile';


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
        path: '/ComManger',
        element: (
            <PrivateRoute>
                <CommunityManagerDashBoard idebarLinks={Links} />
            </PrivateRoute>
        ),
        children: [
            {
                // path: '/admin/profile',
                // element: <Adminprofile/>,
            },
            {
                path: '/ComManger',
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