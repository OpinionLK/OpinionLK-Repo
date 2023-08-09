import Admindashboard from '../pages/DashboardLayout';
import { PrivateRoute } from '../components/Auth/PrivateRoute';
import Adminprofile from '../pages/Admin/profile';

import {
    Navigate
} from 'react-router-dom';

import { BsHouseFill } from 'react-icons/bs';
import { BiEditAlt } from 'react-icons/bi';

const Links = [

    { route: ' ', linkName: ' ', icon: BsHouseFill },
];

const adminRoutes = [
    {
        path: '/admin',
        element: (
            <PrivateRoute>
                <Admindashboard sidebarLinks={Links} />
            </PrivateRoute>
        ),
        children: [
            {
                path: '/admin/profile',
                element: <Adminprofile/>,
            },
           
        ],
    }
]

export default adminRoutes