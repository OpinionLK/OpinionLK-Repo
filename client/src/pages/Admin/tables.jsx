import {
  Box,
    Grid,
    VStack,
  } from '@chakra-ui/react';
  import React from 'react';
  import CommunityManagers from './Tables/CommunityManagers';
  import SurveyeeManager from './Tables/SurveyeeManager';
  import TableSelect from './Components/TableSearch';
  import CouponTable from './Tables/CouponTable';
  
  const AdminTables = () => {

    const style = {
      width: '100%',
      overflow: 'auto',
      height: '100%',
      paddingBottom: '20px',
  }

    return (
    <>
      <VStack mt={-5}>
        <Box zIndex={20} width={'100%'} height={'fit-content'}>
          <TableSelect />
        </Box>
        <Box width={'100%'} mt={'100px'}>
        <Grid style={style} templateRows='repeat(1, 1fr)' templateColumns="repeat(1, 1fr)" mt={'-5px'} gap={6}>

            <Box display={'flex'} flexDirection={'column'} gap={5}>
            <CommunityManagers />
            <CouponTable />
            
            <SurveyeeManager />
            <SurveyeeManager />
            </Box>

        </Grid>
        </Box>
      </VStack>
    </> 
    );
  };
  
  export default AdminTables;
  