import {
    Grid,
  } from '@chakra-ui/react';
  import React from 'react';
  import CommunityManagers from './Tables/CommunityManagers';
  import SurveyeeManager from './Tables/SurveyeeManager';
  
  const AdminTables = () => {

    const style = {
      width: '100%',
      overflow: 'auto',
      height: '100%',
      paddingBottom: '20px',
  }

    return (
    <>
        <Grid style={style} templateRows='repeat(4, 1fr)' templateColumns="repeat(1, 1fr)" gap={6}>
            <CommunityManagers />
            <SurveyeeManager />
            <SurveyeeManager />
            <SurveyeeManager />

        </Grid>
    </>
    );
  };
  
  export default AdminTables;
  