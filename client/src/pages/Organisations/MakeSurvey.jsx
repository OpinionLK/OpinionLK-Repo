import React from 'react'
import Makerlayout from '../../components/survey-maker/Layout'
import { Heading, Box } from '@chakra-ui/react'

const MakeSurvey = () => {
  return (
    <>
      <Box>
        <Heading size={'md'}>Add a Question to </Heading>
        <Makerlayout />
      </Box>
      </>
  )
}

export default MakeSurvey