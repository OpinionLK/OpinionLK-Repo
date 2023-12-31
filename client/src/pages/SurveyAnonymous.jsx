import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios'; // Import Axios for making HTTP requests
import { useAuthContext } from '../hooks/useAuthContext';
import MultipleChoice from "../components/Surveyee/MultipleChoice";
import LongAnswer from "../components/Surveyee/LongAnswer"
import ShortAnswer from "../components/Surveyee/ShortAnswer"
import SurveyDetails from "../components/Surveyee/SurveyDetails"
import PreQ from "../components/Surveyee/PreQ"
import { useParams, useNavigate  } from 'react-router-dom';
import { Button, Text,Box, Center, Link, Heading } from '@chakra-ui/react'
import TopbarAnon from '../components/Layout/TopbarAnon';

// Your component
export default function Survey() {
  // const { surveyid } = match.params;
  const { surveyid } = useParams();
  // const surveyid='056npeUPlmboj6zm'
  const [survey, setSurvey] = useState(null);
  const { handleSubmit, control } = useForm();
  const navigate = useNavigate();
  
  const [preQResponse, setPreQResponse] = useState({});
  const updatePreQResponse = (newData) => {
    setPreQResponse(newData);
  };

  const {
    // eslint-disable-next-line
    user, dispatch, userData
  } = useAuthContext();


  useEffect(() => {
    // check if user is logged in
    if (user) {
        // change this to go to the survey page with the popup open
        // navigate('/portal/surveys');
        console.log('User logged in');
        window.location.href = 'http://localhost:3000/portal/surveys';
    }

    if (surveyid && !survey) {
      axios.get(`http://localhost:3002/api/survey/getbysurveyid/${surveyid}`)
        .then((response) => {
          console.log(response.data)
          setSurvey(response.data);
        })
        .catch((error) => {
          console.error('Error fetching survey:', error);
        });
    }

    // check the status of the survey. only allow access if it is active, else redirect to an error page
    // eslint-disable-next-line
  }, [surveyid, survey]);

  const onSubmit = async (data) => {
    console.log('Form data:', data);
    
    try {
      // eslint-disable-next-line
      const points = survey.points;
      const response = data; // Use the form data as the response   
      console.log('PreQResponse:', preQResponse);
      
      const responseFromServer = await axios.post(`http://localhost:3002/api/survey/createAnonResponse`, 
        {
          surveyid,
          response,
          userTags: survey.userTags[0],
          preQResponse: preQResponse,
        },
      );
      console.log('Response added successfully:', responseFromServer.data);

      const responseID = responseFromServer.data.responseID;
      
      navigate(`/surveyAnonymous/complete/${survey.points}?responseID=${responseID}&surveyID=${surveyid}`);
      
    } catch (error) {
      console.error('Error adding response:', error);
    }
  };

  if (!survey) {
    return <div>Loading...</div>;
    // put the skeleton loader here
  }
  
  return (
    <>
      <TopbarAnon />
      <SurveyDetails surveyName={survey.surveyName} surveyDescription={survey.surveyDescription} />
      
      
      <Center mt='5' flexDirection='column'>
        <Box width='60%'>
          <Heading size='md' color={'#2B3674'} mb='3' ml='10'>Pre-Questionnaire</Heading>
          <PreQ userTags={survey.userTags} updatePreQResponse={updatePreQResponse} preQResponse={preQResponse} />

        </Box>

        <Box w='60%'>
        <Heading size='md' color={'#2B3674'} mt='5' ml='10'>Main Questionnaire</Heading>
        {/* <Text size='md' color={'#2B3674'} mb='5'></Text> */}
        {/* <Heading size='lg' color={'#2B3674'} mb='5' ml='5'>
        {survey.surveyName}
        </Heading> */}
        <form onSubmit={handleSubmit(onSubmit)}>
            {survey.questions.map((question) => (
            <div key={question.questionID}>
                {/* Render different question types based on 'question.responseType' */}
                {question.responseType === 'multiplechoice' && (
                <Controller
                    name={`responses[${question.questionID}]`}
                    control={control}
                    render={({ field }) => (
                    <MultipleChoice
                        question={question.question}
                        options={question.items.map((item, index) => ({
                        value: `${index + 1}`, // Convert index to string
                        label: item.option,
                        }))}
                        selectedValue={field.value}
                        onChange={(newValue) => {
                        field.onChange(newValue); // Update the form value
                        }}
                        // name={question.questionID}
                    />
                    )}
                />
                )}
                {question.responseType === 'shorttext' && (
                <Controller
                    name={`responses[${question.questionID}]`}
                    control={control}
                    render={({ field }) => (
                    <ShortAnswer 
                        question={question.question} 
                        onChange={(value) => field.onChange(value)} // Pass the value to field.onChange
                    />
                    )}
                />
                )}
                {question.responseType === 'longtext' && (
                <Controller
                    name={`responses[${question.questionID}]`}
                    control={control}
                    render={({ field }) => (
                    <LongAnswer 
                        question={question.question} 
                        onChange={(value) => field.onChange(value)} // Pass the value to field.onChange
                    />
                    )}
                />
                )}
                {/* Add support for other question types */}
            </div>
            ))}
            <Button type="submit" ml='5' colorScheme='purple' borderRadius='50px' bg='#6C63FF' w='150px' h='50'>Submit</Button>
        </form>
        </Box>
            <Text mt='10' mb='5' color='#A3AED0' bottom='0'>
              <Link href='http://localhost:3000/' color='#6C63FF'>Join</Link> 
              {' '}OpinionLK to get rewarded for you answers!</Text>
      </Center>
    </>
  );
}
