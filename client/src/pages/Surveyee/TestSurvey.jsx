import React from 'react'
// import MultipleChoice from "../../components/Surveyee/MultipleChoice";
// import LongAnswer from "../../components/Surveyee/LongAnswer"
// import ShortAnswer from "../../components/Surveyee/ShortAnswer"
import Survey from "./Survey"
import {
  Card,
  Text, 
  Flex,
  Spacer
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom';

import Form from "../../components/Surveyee/Survey"
import { FormProvider } from '../../context/FormContext'

const TestSurvey = () => {
  // const { id } = useParams();

  return (
    <>
      {/* <FormProvider>
        <Form/>
      </FormProvider> */}

      <Survey surveyid={'4Lq8tpXzPlmboj6z'}/>
      

    </>
  )
}

export default TestSurvey