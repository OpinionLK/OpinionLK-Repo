import React from 'react'
// import Makerlayout from '../../components/survey-maker/Layout'
import StatRow from '../../components/Stats/StatRow'
import DiscoverCard from '../../components/Stats/Organization/DiscoverCard'
import SurveyGraphCard from '../../components/Stats/Organization/SurveyGraphCard'
import ReachCard from '../../components/Stats/Organization/ReachCard'
import SurveyRow from '../../components/Survey/SurveyRow'
import { 
  Grid, 
  GridItem
} from '@chakra-ui/react'


const Dashboard = () => {
  return (
    <>
        {/* <Heading>MakeSurvey</Heading> */}
        {/* <Makerlayout /> */}
        <StatRow />
        <Grid templateColumns="repeat(3, 1fr)" gap={0}>
          <GridItem colSpan={2}>
            <DiscoverCard />
          </GridItem>
          <GridItem colSpan={1}>
            <SurveyGraphCard/>
          </GridItem>
        </Grid>
        
        <Grid templateColumns="repeat(3, 1fr)" gap={0} mt={5}>
          <GridItem colSpan={2}>
            <SurveyRow />
          </GridItem>
          <GridItem colSpan={1}>
            <ReachCard/>
          </GridItem>
        </Grid>

    </>
  )
}

export default Dashboard