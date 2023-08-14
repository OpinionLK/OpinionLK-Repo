import React from 'react'
import Makerlayout from '../../components/survey-maker/Layout'
import StatRow from '../../components/Stats/StatRow'
import DiscoverCard from '../../components/Stats/DiscoverCard'
import SurveyGraphCard from '../../components/Stats/SurveyGraphCard'
import ReachCard from '../../components/Stats/ReachCard'
import SurveyRow from '../../components/Survey/SurveyRow'
import { Heading, Flex, Spacer } from '@chakra-ui/react'


const Dashboard = () => {
  return (
    <>
        {/* <Heading>MakeSurvey</Heading> */}
        {/* <Makerlayout /> */}
        <StatRow />
        <Flex>
          <DiscoverCard />
          <Spacer />
          <SurveyGraphCard/>
        </Flex>

        <Flex>
          <SurveyRow />
          <Spacer />
          <Spacer />
          <ReachCard/>
        </Flex>

    </>
  )
}

export default Dashboard