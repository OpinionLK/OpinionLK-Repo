import {
  Grid,
} from '@chakra-ui/react';
import React from 'react';
import QuickActions from './Actions/QuickActions';
// import CouponRequests from './Actions/CouponRequests';
import SurveySettings from './Actions/SurveySettings';
import CouponSettings from './Actions/CouponSettings';

const AdminActions = () => {
  return (
    <>
      <Grid mt={-5} templateColumns="repeat(3, 1fr)" gap={6}>
        <QuickActions />
        <SurveySettings />
        {/* <CouponSettings /> */}
        {/* <CouponRequests /> */}
      </ Grid>
    </>
  );
  };

export default AdminActions;
