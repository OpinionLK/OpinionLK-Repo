import DashBoard from '../pages/DashboardLayout';
import { PrivateRoute } from '../components/Auth/PrivateRoute';
import CommunityManagerDashBoard from '../pages/CommunityManager/CommunityManagerDashboard';
import CommunityManagerTables from '../pages/CommunityManager/CommunityManagerTables';
import CommunityManagerActions from '../pages/CommunityManager/CommunityMangerActions';

import {
    Navigate
} from 'react-router-dom';

import {
    motion
} from 'framer-motion';
// eslint-disable-next-line
import { BsHouseFill, BsCollectionFill, BsTable, BsFillFileRuledFill} from 'react-icons/bs';
import { RiSurveyFill } from 'react-icons/ri';

// import { BiSolidEditAlt } from 'react-icons/bi';

const Links = [

    { route: '/ComManager/dashboard', linkName: 'Dashboard', icon: BsHouseFill },
    { route: '/ComManager/Tables' ,linkName: 'Tables', icon: BsTable},
    {route: '/ComManager/Actions',linkName:'Actions', icon:BsCollectionFill},
    
    { route: '/ComManager/allsurveys', linkName: 'Pending Surveys', icon: RiSurveyFill },

];

const ComManagerRoutes = [
    {
        path: '/ComManager',
        element: (
            <PrivateRoute allowedRoles={['manager']}>
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
                    <DashBoard sidebarLinks={Links} />
                </motion.div>
            </PrivateRoute>
        ),
        children: [
            {
                path: '',
                element: <Navigate to="/ComManager/dashboard" replace />
            },
            {
                path: '/ComManager',
                element: <Navigate to="/ComManager" />,
            },
            {
                path: '/ComManager/dashboard',
                element: <CommunityManagerDashBoard />,
            },
            {
                path: '/ComManager/Tables',
                element: <CommunityManagerTables/>,
            },
            {
                path: '/ComManager/Actions',
                element: <CommunityManagerActions/>,
            },



            {
                //path: '/ComManager/allsurveys',
                //element: <ViewSurveys />,
            },
            {
               // path: '/ComManager/viewsurvey/:surveyid',
                //element: <ViewSurvey />,
            },


        ],
    }
]

export default ComManagerRoutes;