import React from 'react'
import MultipleChoice from "../../components/Surveyee/MultipleChoice";
import LongAnswer from "../../components/Surveyee/LongAnswer"
import ShortAnswer from "../../components/Surveyee/ShortAnswer"
import {
  Card,
  Text, 
  Flex,
  Spacer
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom';

const TestSurvey = () => {
  // const { id } = useParams();

  return (
    <>
      <Flex>
        <MultipleChoice/>
        <Spacer/>
        <ShortAnswer/>
        <Spacer/>
        <LongAnswer/>
      </Flex>

    </>
  )
}

export default TestSurvey