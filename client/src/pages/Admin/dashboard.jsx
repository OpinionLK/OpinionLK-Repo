import { 
    Grid,
    Box,
 } from '@chakra-ui/react'
import React from 'react'
import StatRow from '../../components/Stats/StatRow'
import UserManagementGraph from '../../components/Stats/Admin/UserManagementGraph';
import SurveyManagementGraph from '../../components/Stats/Admin/SurveyManagementGraph';
import ClientManagementGraph from '../../components/Stats/Admin/ClientManagementGraph';
const Admindashboard = () => {
    return (
        <>
            <Box mt={-5}>
            <StatRow /> {/* This is the row of cards at the top of the page */}

            <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={5}>
                <UserManagementGraph />
                <ClientManagementGraph />
            </Grid>

            <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={5}>
                <SurveyManagementGraph />
            </Grid>
            </Box>
        </>
    )
}

export default Admindashboard
