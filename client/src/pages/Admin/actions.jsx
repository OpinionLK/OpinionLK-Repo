import {
  Grid,
} from '@chakra-ui/react';
import React from 'react';
import QuickActions from './Actions/QuickActions';
import CouponRequests from './Actions/CouponRequests';

const AdminActions = () => {
  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <QuickActions />
        <CouponRequests />
      </ Grid>
    </>
  );
  };

export default AdminActions;
