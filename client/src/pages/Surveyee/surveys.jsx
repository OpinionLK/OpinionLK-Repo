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
  Heading,
  Wrap

} from '@chakra-ui/react'
import SurveyCard from '../../components/Survey/SurveyCard'

import axios from 'axios'

const Survey = () => {

  const [surveys, setSurveys] = useState([])

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/user/allsurveys')
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
      <div><Text size='6' fontWeight={'semibold'} mb='4'>Recommended Surveys</Text></div>
      {/* <Divider colorScheme="blackAlpha" /> */}
      <Wrap spacing='21px'>
        {surveys ? surveys.map((survey) => {
          return (
            <>
            {/* <Card key={survey._id} width={'100%'} height={'100%'} margin={'10px'}>
              <CardBody>
                <Stack>
                  <Image src={'http://localhost:3002/api/survey/images/' + survey.surveyImage} alt={survey.surveyName} />
                  <Heading as={'h3'} size={'md'}>{survey.surveyName}</Heading>
                  <Text>{survey.surveyDescription}</Text>
                </Stack>
              </CardBody>
              <CardFooter>
                <ButtonGroup>
                  <Button colorScheme={'green'} onClick={()=>{window.location.href = 'http://localhost:3000/portal/survey/' + survey.surveyID + '/fill'}}>Take Survey</Button>
                </ButtonGroup>
              </CardFooter>
            </Card> */}
            <SurveyCard
              type = 'surveyee'
              surveyName={survey.surveyName}
              surveyDescription={survey.surveyDescription}
              surveyImage={survey.surveyImage}
              surveyID={survey.surveyID}
              surveyTags={survey.surveyTags}
              surveyPoints={survey.points}
            />
            </>
          )
        }
        ) : <Text>No Surveys Available</Text>}
      </Wrap>
    </>
  )
}

export default Survey