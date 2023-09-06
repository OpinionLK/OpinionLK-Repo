import { 
    Grid,
    Box,
    GridItem,
    Wrap,
 } from '@chakra-ui/react'
import React from 'react'
import StatRow from '../../components/Stats/StatRow'
import UserManagementGraph from '../../components/Stats/Admin/UserManagementGraph';
import SurveyManagementGraph from '../../components/Stats/Admin/SurveyManagementGraph';
import SurveyFillingGraph from '../../components/Stats/Admin/SurveyFillingGraph';
import StatCard from '../../components/Stats/Organization/DiscoverCard';
import CouponBoard from '../../components/Surveyee/PopularCoupons';
import SurveyRow from '../../components/Survey/SurveyRow';
import SurveyCard from '../../components/Survey/SurveyCard';

// import logo from '../../images/topbar/scaled-logo-icon.svg'
const Serydashboard = () => {

    const style = {
        width: '100%',
        overflow: 'auto',
        height: '100%',
        paddingBottom: '20px',
    }

    return (
        <>
            <Box style={style}>


                <Grid templateColumns="repeat(3, 1fr)">
                    <GridItem colSpan={2}>
                        <Grid templateColumns="repeat(1, 1fr)">
                            <StatCard />
                        </Grid>
                    </GridItem>
                    <GridItem rowSpan={2}>
                        <Grid templateColumns="repeat(1, 1fr)" gap={6} mt={5}>
                            <CouponBoard />
                        </Grid>
                    </GridItem>
                    <GridItem colSpan={2} mt={5} mr={5}>
                        <SurveyRow />
                        {/* <Box
                            width="auto"
                            px={5}
                            pb='4'
                            minW='1000px'
                        >
                            <Wrap spacing='30px'>
                                <SurveyCard />
                                <SurveyCard />
                                <SurveyCard />
                                <SurveyCard />
                            </Wrap>
                        </Box> */}
                    </GridItem>

                </Grid>
                
            </Box>
        </>
    )
}

export default Serydashboard;
