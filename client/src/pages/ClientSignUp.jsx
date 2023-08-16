import React from 'react';
import { useState } from 'react';
import signupImage from '../assets/images/client_signup.jpg';

// import { useAuthContext } from '../hooks/useAuthContext';
// const { dispatch } = useAuthContext()


import {
  Box,
  Flex,
  Heading,
  Alert,
  AlertIcon,
  Stack,
  useMediaQuery,
  Button,
  Text,
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
  Image,
  Card,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
// import { ArrowBackIcon, ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
// import axios from 'axios';

import { OrganizationSignUp, ClientData, ClientSignUp } from '../components/Auth/clientSignupCom.jsx';


const SignUp = () => {

  const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');
  // const [showPassword, setShowPassword] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');
  const [userCreated, setUserCreated] = useState(false);

  const { activeStep, setActiveStep} = useSteps({
    initialStep: 0
  })

  const [orgFormData, setOrgFormData] = useState({});
  const [clientFormData, setClientFormData] = useState({});
  const [clientSignUpData, setClientSignUpData] = useState({});

  const steps = [
    {
      title: 'First',
      description: 'Organization Details',
      content: (
        <Card p={6} my={6} minW={'560px'}>
          <OrganizationSignUp
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            orgFormData={orgFormData}
            setOrgFormData={setOrgFormData}
          />
        </Card>
      ),
    },
    {
      title: 'Second',
      description: 'Your Details',
      content: (
        <Card p={6} my={6} minW={'560px'}>
          <ClientData
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            clientFormData={clientFormData}
            setClientFormData={setClientFormData}
          />
        </Card>
      ),
    },
    {
      title: 'Third',
      description: 'Create a Password',
      content: (
        <Card p={6} my={6} minW={'560px'}>
          <ClientSignUp
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            clientSignUpData={clientSignUpData}
            setClientSignUpData={setClientSignUpData}
          />
        </Card>
      ),
    },
  ];

  if (activeStep === 3) {
    const emailVeryfyCard = document.getElementById('emailVeryfyCard');
    emailVeryfyCard.style.display = 'block';
  }


  return (
    <Stack direction="row" spacing={4} height={'100vh'}>
      {isLargerThanLG ? (
        <Image
          src={signupImage}
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
        pt={'50px'}
        height={'100%'}
        flexDirection={'column'}
        // justifyContent={'center'}
        alignItems={'center'}
      >
        <Flex width={'100%'} justifyContent={'center'}>
        <Stack spacing={8} width={'80%'}>
          <Stack align={'left'}>
          <Flex
            width={'100%'}
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'flex-end'}
          >
            {/* <Image
              src={signupImage}
            ></Image> */}
            <Heading fontSize={'4xl'} textAlign={'left'}>
              Sign up
            </Heading>
            <Link to="/" alignItems={'flex-end'}>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{ bg: 'blue.500' }}
                ml="auto"
              >
                <Text fontSize={'md'} color={'white'}>
                  Return to Home
                </Text>
              </Button>
            </Link>
          </Flex>
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
              <Stepper orientation="vertical" height="200px" gap="0" index={activeStep}>
                {steps.map((step, index) => (
                  <Step 
                    key={index}
                    onSubmit={() => setActiveStep(index) && step.content}
                  >
    
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
                        {activeStep  === index && React.cloneElement(step.content, { 
                          orgFormData, setOrgFormData, 
                          clientFormData, setClientFormData, 
                          clientSignUpData, setClientSignUpData
                          })
                        }
                      </Box>

                    <StepSeparator />
                  </Step>
                ))}
              </Stepper>

          </Stack>

          <Card id='emailVeryfyCard' p={6} my={6} minW={'560px'} display={'none'} bg={'blue.100'}>
            <Heading fontSize={'xl'} textAlign={'left'}>
              Please veryify your email address
            </Heading>
            <Text fontSize={'md'} textAlign={'left'}>
              We have sent you an email with a link to verify your email address.
              Please click on the link to verify your email address.
            </Text>
          </Card>
        </Stack>
        </Flex>
      </Flex>
    </Stack>
    
  );
  
};

export default SignUp;
