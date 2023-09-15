import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios'; // Import Axios for making HTTP requests
import { useAuthContext } from '../../hooks/useAuthContext';
import MultipleChoice from "../../components/Surveyee/MultipleChoice";
import LongAnswer from "../../components/Surveyee/LongAnswer"
import ShortAnswer from "../../components/Surveyee/ShortAnswer"
import { useParams } from 'react-router-dom';

import { Button, Text, Heading } from '@chakra-ui/react'

// Your component
export default function Survey() {
  // const { surveyid } = match.params;
  const { surveyid } = useParams();
  // const surveyid='056npeUPlmboj6zm'
  const [survey, setSurvey] = useState(null);
  const { handleSubmit, control } = useForm();

  const {
    user, dispatch, userData
  } = useAuthContext();

  // console.log('HELOOO:', user);

  useEffect(() => {
    if (surveyid && !survey) {
      axios.get(`http://localhost:3002/api/survey/fillSurvey/${surveyid}`)
        .then((response) => {
          console.log(response.data)
          setSurvey(response.data);
        })
        .catch((error) => {
          console.error('Error fetching survey:', error);
        });
    }
  }, [surveyid, survey]);

  const onSubmit = async (data) => {
    console.log('Form data:', data);
    try {
      // Assuming you have the surveyID available, either as a prop or state
      const surveyID = '056npeUPlmboj6zm'; // Replace with the actual survey ID

      
      const response = data; // Use the form data as the response 
  
      // Send the response data to the server
      const responseFromServer = await axios.post(`http://localhost:3002/api/survey/createResponse`, {
        surveyid,
        response
      },
      {
        headers: {
          'Authorization': `Bearer ${user.token}`
        },
      });
  
      console.log('Response added successfully:', responseFromServer.data);
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
      {/* <Text size='md' color={'#2B3674'} mb='5'></Text> */}
      <Heading size='lg' color={'#2B3674'} mb='5' ml='5'>
      {survey.surveyName}
      </Heading>
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
            {/* Add support for other question types as needed */}
          </div>
        ))}
        <Button type="submit" ml='5' colorScheme='purple' borderRadius='100px' bg='#6C63FF' w='100px'>Submit</Button>
      </form>
    </>
  );
}
