import { useEffect, useState } from 'react';
import Sidebar from '../../components/Layout/Sidebar';
import Topbar from '../../components/Layout/Topbar';
import './customerProfile.css';
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
    <div className="profile">
      <Topbar />
      <Sidebar
        navOpen={navOpen}
        setNavOpen={setNavOpen}
        sidebarLinks={sidebarLinks}
      />
    </div>
  );
};

export default CustomerProfile;
