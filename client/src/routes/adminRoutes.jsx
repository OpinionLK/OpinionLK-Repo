import Admindashboard from '../pages/DashboardLayout';
import { PrivateRoute } from '../components/Auth/PrivateRoute';
// import Adminprofile from '../pages/Admin/profile';
import AdminDashboard from '../pages/Admin/dashboard';
import AdminTables from '../pages/Admin/tables';
import TestAdminTables from '../pages/Admin/tables';
import AdminActions from '../pages/Admin/actions';
import Adminprofile from '../pages/Admin/Profile';

import {
    Navigate
} from 'react-router-dom';

import { BsHouseFill, BsCollectionFill, BsTable } from 'react-icons/bs';
// import { BiSolidEditAlt } from 'react-icons/bi';

const Links = [

    { route: '/admin/dashboard', linkName: 'Dashboard', icon: BsHouseFill },
    { route: '/admin/tables', linkName: 'Tables', icon: BsTable },
    { route: '/admin/actions', linkName: 'Actions', icon: BsCollectionFill },
    { route: '/admin/profile', linkName: 'Profile', icon: BsCollectionFill}

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
            {
                path: '',
                element: <Navigate to="/admin" />,
            },
            {
                path: '/admin/dashboard',
                element: <AdminDashboard />,
            },
            {
                path: '/admin/tables',
                element: <AdminTables />,
            },
            {
                path: '/admin/actions',
                element: <AdminActions />,
            },
           
        ],
    }
]

export default adminRoutes