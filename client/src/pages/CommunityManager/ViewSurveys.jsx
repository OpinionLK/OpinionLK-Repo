import React from 'react'

import SurveyTable from '../../components/CommunityManager/SurveyTable'
import { 
  Card,
  CardBody,
  Flex,
  Grid, 
  GridItem,


} from '@chakra-ui/react'

const ViewSurveys = () => {
  return (
    <>
      <Flex width={'100%'} gap={'10px'} flex={'1'} flexDirection={'column'} mt={-5}>

        <Grid templateColumns='repeat(4, 1fr)' gap={6}>
          <GridItem colSpan={4} height={'100%'}>
            <Card w={'100%'}>
              <CardBody>
                <SurveyTable />
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </Flex>
    </>

  )
}

export default ViewSurveys