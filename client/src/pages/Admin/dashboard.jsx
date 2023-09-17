import { 
    Grid,
    Box,
 } from '@chakra-ui/react'
import React from 'react'
import StatRow from '../../components/Stats/StatRow'
import UserManagementGraph from '../../components/Stats/Admin/UserManagementGraph';
import SurveyManagementGraph from '../../components/Stats/Admin/SurveyManagementGraph';
import SurveyFillingGraph from '../../components/Stats/Admin/SurveyFillingGraph';
// import logo from '../../images/topbar/scaled-logo-icon.svg'
const Admindashboard = () => {

    const style = {
        width: '100%',
        overflow: 'auto',
        height: '100%',
        paddingBottom: '20px',
    }

    return (
        <>
            <Box style={style}>
            <StatRow /> {/* This is the row of cards at the top of the page */}

            <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={5}>
                <UserManagementGraph />
                {/* <SurveyFillingGraph /> */}
            </Grid>

            <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={5}>
                {/* <SurveyManagementGraph /> */}
            </Grid>
            </Box>
        </>
    )
}

export default Admindashboard
