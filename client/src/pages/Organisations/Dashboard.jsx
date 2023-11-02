import React, { useEffect, useState } from 'react'
// import Makerlayout from '../../components/survey-maker/Layout'
import StatRow from '../../components/Stats/StatRow'
import DiscoverCard from '../../components/Stats/Organization/DiscoverCard'
import SurveyGraphCard from '../../components/Stats/Organization/SurveyGraphCard'
import ReachCard from '../../components/Stats/Organization/ReachCard'
import SurveyRow from '../../components/Survey/SurveyRowClient'
import { 
  Grid, 
  GridItem,
  Box
} from '@chakra-ui/react'


import SurveyCard from '../../components/Survey/SurveyCard'
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios'


const Dashboard = () => {

  const [surveys, setSurveys] = useState([])

  const {
    // eslint-disable-next-line
    user, dispatch, userData
  } = useAuthContext();

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/survey/getbyUserId',
            {
                headers: {
                'Authorization': `Bearer ${user.token}`
                },
            }
        );
        console.log(response.data)
        setSurveys(response.data)
      }
      catch (err) {
        console.log(err)
      }
    }

    fetchSurveys()
  }, [])

  return (
    <>
        {/* <Heading>MakeSurvey</Heading> */}
        {/* <Makerlayout /> */}
        <Box mt={-5}>
        {/* <StatRow /> */}
        <Grid templateColumns="repeat(3, 1fr)" gap={0}>
          <GridItem colSpan={2}>
            <DiscoverCard />
          </GridItem>
          <GridItem colSpan={1}>
            {/* <SurveyGraphCard/> */}
          </GridItem>
        </Grid>
        
        <Grid templateColumns="repeat(3, 1fr)" gap={0} mt={5}>
          <GridItem colSpan={2}>
            <SurveyRow 
                surveys = {surveys.surveys}
            />
          </GridItem>
          {/* <GridItem colSpan={1}>
            <ReachCard/>
          </GridItem> */}
        </Grid>
        </Box>

    </>
  )
}

export default Dashboard