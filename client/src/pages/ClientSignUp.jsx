import React from 'react';
import { useState } from 'react';

import { useAuthContext } from '../hooks/useAuthContext';

import {
  Box,
  Flex,
  Heading,
  Alert,
  AlertIcon,
  Stack,
  useMediaQuery,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  HStack,
  InputGroup,
  InputRightElement,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  activeStep,
  description,
  title,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';

import { OrganizationSignUp, ClientData, ClientSignUp } from '../components/Auth/clientSignupCom.jsx';


const SignUp = () => {
  const steps = [
    { title: 'First', description: 'Organization Details', content: <OrganizationSignUp /> },
    { title: 'Second', description: 'Your Details', content: <ClientData /> },
    { title: 'Third', description: 'Create a Password', content: <ClientSignUp /> },
  ];

  const { activeStep, count } = useSteps({
    initialStep: 1,
    count: steps.length,
  })

  const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userCreated, setUserCreated] = useState(false);

  const { dispatch } = useAuthContext()

  return (
    <Stack direction="row" spacing={4} height={'100vh'}>
      {isLargerThanLG ? (
        <Flex
          width={'50%'}
          m={'20px'}
          backgroundColor={'brand.purple'}
          backgroundPosition={'center'}
          backgroundRepeat={'no-repeat'}
          backgroundSize={'cover'}
          borderRadius={'20px'}
        />
      ) : null}

      <Flex
        width={isLargerThanLG ? '60%' : '100%'}
        height={'100%'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Stack spacing={8} width={'80%'}>
          <Flex width={'100%'}>
            <Link to="/">
              <ArrowBackIcon /> <u>Return to Home</u>
            </Link>
          </Flex>

          <Stack align={'left'}>
            <Heading fontSize={'4xl'} textAlign={'left'}>
              Sign up
            </Heading>

            {userCreated && (
              <Box color="green.500" mt={2} mb={2}>
                <Alert
                  status="success"
                  variant="subtle"
                  fontSize="md"
                  borderRadius="5px"
                >
                  <AlertIcon />
                  User created successfully.
                </Alert>
              </Box>
            )}
          </Stack>

          <Stack spacing={4}>

              <Stepper  activeStep={activeStep} orientation="vertical" height="400px" gap="0" count={count}>
                {steps.map((step, index) => (
                  <Step key={index}>
                    <StepIndicator>
                      <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>

                    <Box flexShrink="0">
                      <StepTitle>{step.title}</StepTitle>
                      <StepDescription>{step.description}</StepDescription>
                    </Box>
                    <HStack mt={'70px'} ml={'-100px'} mb={'30px'}>
                      {activeStep === index && step.content}
                    </HStack>
                    <StepSeparator />
                  </Step>
                ))}
              </Stepper>

          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default SignUp;
