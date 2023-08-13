import Admindashboard from '../pages/DashboardLayout';
import { PrivateRoute } from '../components/Auth/PrivateRoute';
// import Adminprofile from '../pages/Admin/profile';
import AdminDashboard from '../pages/Admin/dashboard';
import AdminTables from '../pages/Admin/tables';
import AdminActions from '../pages/Admin/actions';

import {
    Navigate
} from 'react-router-dom';

import { BsHouseFill } from 'react-icons/bs';
import { BiEditAlt } from 'react-icons/bi';

const Links = [

    { route: '/admin/dashboard', linkName: 'Dashboard', icon: BsHouseFill },
    { route: '/admin/tables', linkName: 'Tables', icon: BiEditAlt },
    { route: '/admin/actions', linkName: 'Actions', icon: BiEditAlt },

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
                // path: '/admin/profile',
                // element: <Adminprofile/>,
            },
            {
                path: '/admin',
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