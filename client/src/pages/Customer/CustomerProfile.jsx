import { useEffect, useState } from 'react';
import Sidebar from '../../components/Layout/Sidebar';
import Topbar from '../../components/Layout/Topbar';
import { useAuthContext } from '../../hooks/useAuthContext';
import Dashboard from './DashBoard';

const CustomerProfile = ({ sidebarLinks }) => {
  const { user, dispatch, userData } = useAuthContext();

  useEffect(() => {
    const fetchUserData = async () => {};

    if (user) {
      fetchUserData();
    }
  }, [dispatch, user]);

  const [navOpen, setNavOpen] = useState(true);

  return (
    <div>
      <Topbar />
      <Sidebar
        navOpen={navOpen}
        setNavOpen={setNavOpen}
        sidebarLinks={sidebarLinks}
      />
      <div>
        <Dashboard />
      </div>
    </div>
  );
};

export default CustomerProfile;
