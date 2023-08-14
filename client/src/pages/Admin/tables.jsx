import {
    Grid,
  } from '@chakra-ui/react';
  import React from 'react';
  import './admin.css';
  import CommunityManagers from './Tables/CommunityManagers';
  import SurveyeeManager from './Tables/SurveyeeManager';
  
  const AdminTables = () => {

    return (
    <>
        <Grid className='tablesMainGrid' templateRows='repeat(4, 1fr)' templateColumns="repeat(1, 1fr)" gap={6}>
            <CommunityManagers />
            <SurveyeeManager />
            <SurveyeeManager />
            <SurveyeeManager />

        </Grid>
    </>
    );
  };
  
  export default AdminTables;
  