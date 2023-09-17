import React from 'react'
import Makerlayout from '../../components/survey-maker/Layout'
import StatRow from '../../components/Stats/StatRow'
import DiscoverCard from '../../components/Stats/Organization/DiscoverCard'
import SurveyGraphCard from '../../components/Stats/Organization/SurveyGraphCard'
import ReachCard from '../../components/Stats/Organization/ReachCard'
import SurveyCard from '../../components/Survey/SurveyCard'
import { Heading, Flex, Spacer } from '@chakra-ui/react'

import SurveyBasicDetailsCard from '../../components/Survey/SurveyBasicDetailsCard'


const Dashboard = () => {
  return (
    <>
        {/* <StatRow />
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
        </Flex> */}

        
        <SurveyBasicDetailsCard />
    </>
  )
}

export default Dashboard