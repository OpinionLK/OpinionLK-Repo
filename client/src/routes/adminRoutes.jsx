import Admindashboard from '../pages/DashboardLayout';
import { PrivateRoute } from '../components/Auth/PrivateRoute';
// import Adminprofile from '../pages/Admin/profile';
import AdminDashboard from '../pages/Admin/dashboard';
import AdminTables from '../pages/Admin/tables';
// import TestAdminTables from '../pages/Admin/tables';
import AdminActions from '../pages/Admin/actions';
import Adminprofile from '../pages/Admin/Profile';
import {
    motion
} from 'framer-motion';
import {
    Navigate
} from 'react-router-dom';

import { BsHouseFill, BsCollectionFill, BsTable } from 'react-icons/bs';
// import { BiSolidEditAlt } from 'react-icons/bi';

const Links = [

    { route: '/admin/dashboard', linkName: 'Dashboard', icon: BsHouseFill },
    { route: '/admin/tables', linkName: 'Tables', icon: BsTable },
    { route: '/admin/actions', linkName: 'Actions', icon: BsCollectionFill },
    // { route: '/admin/profile', linkName: 'Profile', icon: BsCollectionFill}

];

const adminRoutes = [
    {
        path: '/admin',
        element: (
            <PrivateRoute allowedRoles={['admin']}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: 0.2,
                        ease: 'easeOut',
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                >
                <Admindashboard sidebarLinks={Links} />
                </motion.div>
            </PrivateRoute>
        ),
        children: [
            {
                path: '/admin/profile',
                element: <Adminprofile/>,
            },
            {
                path: '',
                element: <Navigate to="/admin/dashboard" />,
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