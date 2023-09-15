import React, { useEffect, useState } from 'react'
import {
  Divider,
  Flex,
  Text,
  Card,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  Image,
  Stack,
  Heading
} from '@chakra-ui/react'

import axios from 'axios'

const Survey = () => {

  const [surveys, setSurveys] = useState([])

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get('https://opinion-lk-b3d64ae79a55.herokuapp.com/api/user/allsurveys')
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
      <div><Text fontWeight={'semibold'}>Recommended Surveys</Text></div>
      <Divider colorScheme="blackAlpha" />
      <Flex>
        {surveys ? surveys.map((survey) => {
          return (
            <Card key={survey._id} width={'100%'} height={'100%'} margin={'10px'}>
              <CardBody>
                <Stack>
                  <Image src={'http://localhost:3002/api/survey/images/' + survey.surveyImage} alt={survey.surveyName} />
                  <Heading as={'h3'} size={'md'}>{survey.surveyName}</Heading>
                  <Text>{survey.surveyDescription}</Text>
                </Stack>
              </CardBody>
              <CardFooter>
                <ButtonGroup>
                  <Button colorScheme={'green'}>Take Survey</Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          )
        }
        ) : <Text>No Surveys Available</Text>}
      </Flex>
    </>
  )
}

export default Survey