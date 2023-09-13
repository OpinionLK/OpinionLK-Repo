import React from 'react';
import { useState } from 'react';
import signupImage from '../assets/images/client_signup.jpg';

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
  ChakraProvider,
  Input,
  HStack,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export const FormField = ({ error, label, children }) => {
  return (
    <FormControl mb={5} isInvalid={Boolean(error)}>
        <FormLabel>{label}</FormLabel>
        {children}
        <FormErrorMessage style={{fontSize: '11px', marginTop: '5px'}}>{error}</FormErrorMessage>
    </FormControl>
  );
}

const SignUp = () => {

  const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');
  const [userCreated, setUserCreated] = useState(false);
  const { register, handleSubmit, formState: { errors }, trigger  } = useForm();
  const required = { required: 'This field is required' };
  const phoneValidation = (value) => /^[0-9]{10}$/.test(value);
  // eslint-disable-next-line
  const nicValidation = (value) => /^[0-9]{9}[vV]?$|^[0-9]{12}$/.test(value);
  const emailValidationRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const { activeStep, setActiveStep, goToNext, goToPrevious} = useSteps({
    initialStep: 0
  }) 

  const [orgFormData, setOrgFormData] = useState({});
  const handleOrgChange = e => {
    setOrgFormData({
      ...orgFormData,
      [e.target.name]: e.target.value
    })
  }

  const [clientFormData, setClientFormData] = useState({});
  const handleClientChange = e => {
    setClientFormData({
      ...clientFormData,
      [e.target.name]: e.target.value
    })
  }

  const [clientSignUpData, setClientSignUpData] = useState({});
  const handleSignUpChange = e => {
    setClientSignUpData({
      ...clientSignUpData,
      [e.target.name]: e.target.value
    })
  }
// eslint-disable-next-line
  const formData = {
    orgName: orgFormData.orgName || 'Example Companey (Pvt) Ltd',
    orgWebsite: orgFormData.orgWebsite  || 'example.com',
    orgAddressLine1: orgFormData.orgAddressLine1 || '50, Reid Avenue',
    orgAddressLine2: orgFormData.orgAddressLine2 || 'Thimbirigasyaya',
    orgCity: orgFormData.orgCity || 'Colombo 4',
    orgState: orgFormData.orgState || 'Western',
    orgZip: orgFormData.orgZip || '20034',
    orgPhone: orgFormData.orgPhone || '0112345678',
    orgEmail: orgFormData.orgEmail || 'example@gmail.com',
    firstName: clientFormData.firstName || 'John',
    lastName: clientFormData.lastName || 'Doe',
    position: clientFormData.position || 'Manager',
    department: clientFormData.department || 'HR',
    phone: clientFormData.phone || '0719320164',
    nic: clientFormData.nic || '980930661V',
    email: clientSignUpData.email || 'example@gmail.com',
    password: clientSignUpData.password || '12345678',
    confirmPassword: clientSignUpData.confirmPassword || '12345678'
  };

  const handleFormSubmit = (formData) => {

    console.log('These are the form data: ',formData);
    axios.post('https://opinionlk.azurewebsites.net/api/client/signup', formData)
      .then((res) => {
        console.log(res);
        setUserCreated(true);
      })
      .catch((err) => {
        console.log(err);
      });
      setActiveStep(3);
  };  

  const handleNext = async () => {
    const validateAndProceed = async (fields, successMessage, failedMessage) => {
      const isValid = await trigger(fields);
      if (isValid) {
        console.log(successMessage);
        if (activeStep === 2) {
          handleFormSubmit(orgFormData, clientFormData, clientSignUpData);
        }
        if (activeStep === 1) {
          setActiveStep(2);
        } else {
          goToNext();
        }
      } else {
        console.log(failedMessage);
      }
    };
  
    switch (activeStep) {
      case 0:
        validateAndProceed(['orgName', 'orgWebsite', 'orgAddressLine1', 'orgAddressLine2', 'orgCity', 'orgState', 'orgZip', 'orgPhone', 'orgEmail'], 'Org Details Collected', 'Org details not valid');
        break;
      case 1:
        validateAndProceed(['firstName', 'lastName', 'position', 'department', 'phone', 'nic'], 'Client details collected' ,'Client details not valid');
        break;
      case 2:
        validateAndProceed(['email', 'password', 'confirmPassword'], 'Account credentials collected', 'Client sign up details not valid');
        break;
      default:
        break;
    }
  };
  
  
  const steps2 = [
    {
      title: 'First',
      description: 'Organization Details',
      content: (
        <Card p={6} my={6} minW={'560px'}>
          <HStack spacing={4}>
            <FormControl id="orgName">
              <FormField error={errors.orgName?.message} label={'Organization Name'}>
                <Input type='text' placeholder='Example Companey (Pvt) Ltd' name='orgName' value={orgFormData.orgName} onChange={handleOrgChange} 
                {...register('orgName', required)}/>
              </FormField>
            </FormControl>
            <FormControl id="orgWebsite">
              <FormField error={errors.orgWebsite?.message} label={'Organization Website'}>
                <Input type='text' placeholder='Example.com' name='orgWebsite' value={orgFormData.orgWebsite} onChange={handleOrgChange} 
                {...register('orgWebsite')} />
              </FormField>
            </FormControl>
          </HStack>
          <VStack spacing={4}>
            <FormControl id="orgAddress" isRequired>
              <FormField error={errors.orgAddressLine1?.message} label={'Organization Address'}>
                <Input type='text' placeholder='50, Reid Avenue' name='orgAddressLine1' value={orgFormData.orgAddressLine1} onChange={handleOrgChange} 
                {...register('orgAddressLine1',required)} />
              </FormField>
            <FormField error={errors.orgAddressLine2?.message}>
              <Input type='text' placeholder='Thimbirigasyaya' name='orgAddressLine2' value={orgFormData.orgAddressLine2} onChange={handleOrgChange} 
              {...register('orgAddressLine2', required)} />
            </FormField>
            </FormControl>
          </VStack>
          <HStack spacing={4}>
            <FormControl id="orgCity" isRequired>
              <FormField error={errors.orgCity?.message} label={'Organization City'}>
                <Input type='text' placeholder='Colombo 4' name='orgCity' value={orgFormData.orgCity} onChange={handleOrgChange} 
                {...register('orgCity', required)} />
              </FormField>
            </FormControl>
            <FormControl id="orgState" isRequired>
              <FormField error={errors.orgState?.message} label={'Organization State'}>
                <Input type='text' placeholder='Western' name='orgState' value={orgFormData.orgState} onChange={handleOrgChange} 
                {...register('orgState', required)} />
              </FormField>
            </FormControl>
          </HStack>
          <HStack spacing={4}>
            <FormControl id="orgZip" isRequired>
              <FormField error={errors.orgZip?.message} label={'Organization Zip'}>
                <Input type='number' placeholder='20034' name='orgZip' value={orgFormData.orgZip} onChange={handleOrgChange} 
                {...register('orgZip', required)} />
              </FormField>
            </FormControl>
            <FormControl id="orgPhone" isRequired>
              <FormField error={errors.orgPhone?.message} label={'Organization Phone'}>
                <Input type='tel' placeholder='0112345678' name='orgPhone' value={orgFormData.orgPhone} onChange={handleOrgChange} 
                {...register('orgPhone', required, {validate: phoneValidation})} />
              </FormField>
            </FormControl>
          </HStack>
          <HStack spacing={4}>
            <FormControl id="orgEmail" isRequired>
              <FormField error={errors.orgEmail?.message} label={'Organization Email'}>
                <Input type='email' placeholder='example@gmail.com' name='orgEmail' value={orgFormData.orgEmail} onChange={handleOrgChange} 
                {...register('orgEmail', required, {validate: emailValidationRegex})} />
              </FormField>            
            </FormControl>
          </HStack>
          <Flex display={'flex'} flexDirection={'column'} activeStep={activeStep}>
              {activeStep !== 2 && (
                <Button
                  alignSelf={'flex-end'}
                  width={'100px'}
                  colorScheme="blue"
                  type="next"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
            </Flex>
        </Card>
      ),
    },
    {
      title: 'Second',
      description: 'Your Details',
      content: (
        <Card p={6} my={6} minW={'560px'}>
          <HStack spacing={4}>
            <FormControl id="firstName" isRequired>
              <FormField error={errors.firstName?.message} label={'First Name'}>
                <Input type='text' placeholder='john' name='firstName' value={clientFormData.firstName} onChange={handleClientChange} {...register('firstName', required)} />
              </FormField>
            </FormControl>
            <FormControl id="lastName" isRequired>
              <FormField error={errors.lastName?.message} label={'Last Name'}>
                <Input type='text' placeholder='Doe' name='lastName' value={clientFormData.lastName} onChange={handleClientChange} {...register('lastName', required)} />
              </FormField>
            </FormControl>
          </HStack>
          <HStack spacing={4}>
            <FormControl id="position" isRequired>
              <FormField error={errors.position?.message} label={'Position'}>
                <Input type='text' placeholder='Manager' name='position' value={clientFormData.position} onChange={handleClientChange} {...register('position', required)} />
              </FormField>
            </FormControl>
            <FormControl id="department" isRequired>
              <FormField error={errors.department?.message} label={'Department'}>
                <Input placeholder='HR' name='department' value={clientFormData.department} onChange={handleClientChange} {...register('department', required)} />
              </FormField>
            </FormControl>
          </HStack>
          <HStack spacing={4}>
            <FormControl id="phone" isRequired>
              <FormField error={errors.phone?.message} label={'Phone'}>
                <Input type='tel' placeholder='0719320164' name='phone' value={clientFormData.phone} onChange={handleClientChange} {...register('phone', required)} />
              </FormField>
            </FormControl>
            <FormControl id="nic" isRequired>
              <FormField error={errors.nic?.message} label={'NIC'}>
                <Input type='text' placeholder='980930661V' name='nic' value={clientFormData.nic} onChange={handleClientChange} {...register('nic', required)} />
              </FormField>
            </FormControl>
          </HStack>
          <Flex display={'flex'} justifyContent={'flex-end'} activeStep={activeStep}>
              {activeStep !== 0 && (
                <Button
                  alignSelf={'flex-end'}
                  width={'100px'}
                  mr={2}
                  colorScheme="gray"
                  type="back"
                  onClick={goToPrevious}
                >
                  Back
                </Button>
              )}
              {activeStep !== 2 && (
                <Button
                  alignSelf={'flex-end'}
                  width={'100px'}
                  colorScheme="blue"
                  type="next"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
            </Flex>
        </Card>
      ),
    },
    {
      title: 'Third',
      description: 'Create The Account',
      content: (
        <Card p={6} my={6} minW={'560px'}>
          <HStack spacing={4}>
            <FormControl id="email" isRequired>
              <FormField error={errors.email?.message} label={'Email'}>
                <Input type='email' placeholder='john.example@gamil.com' name='email' value={clientSignUpData.email} onChange={handleSignUpChange} {...register('email', required)} />
              </FormField>
            </FormControl>
          </HStack>
          <HStack spacing={4}>
            <FormControl id="password" isRequired>
              <FormField error={errors.password?.message} label={'Password'}>
                <Input type='password' placeholder='8 characters' name='password' value={clientSignUpData.password} onChange={handleSignUpChange} {...register('password', required)} />
              </FormField>
            </FormControl>
            <FormControl id="confirmPassword" isRequired>
              <FormField error={errors.confirmPassword?.message} label={'Confirm Password'}>
                <Input type='password' placeholder='Confirm Password' name='confirmPassword' value={clientSignUpData.confirmPassword} onChange={handleSignUpChange} {...register('confirmPassword', required)} />
              </FormField>
            </FormControl>
          </HStack>
          <Flex display={'flex'} justifyContent={'flex-end'}  activeStep={activeStep}>
              {activeStep !== 0 && (
                <Button
                  alignSelf={'flex-end'}
                  width={'100px'}
                  mr={2}
                  colorScheme="gray"
                  type="back"
                  onClick={goToPrevious}
                >
                  Back
                </Button>
              )}
              {activeStep === 2 && (
                <Button
                  alignSelf={'flex-end'}
                  width={'100px'}
                  colorScheme="blue"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              )}
            </Flex>
        </Card>
      ),
    },
  ];

  // ================================================================================================

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
          backgroundposition={'center'}
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
            <Heading fontSize={'4xl'} textAlign={'left'}>
              Sign up
            </Heading>
            <Link to="/" >
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

            {/* =============================================== New ==================================================== */}

          <Box>
            <ChakraProvider>
            <Stepper orientation="vertical" height="auto" gap="0" index={activeStep} onSubmit={handleSubmit(handleFormSubmit)}>
              {steps2.map((step, index) => (
                <Step
                  key={index}
                  onSubmit={() => setActiveStep(index) && step.content}
                >
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}onFinish
                      active={<StepNumber />}
                    />
                  </StepIndicator>
                  <StepSeparator />
                    <Box flexShrink="0">
                      <form onSubmit={handleSubmit} method='POST'>
                        <StepTitle>{step.title}</StepTitle>
                        <StepDescription>{step.description}</StepDescription>
                        {activeStep  === index && React.cloneElement(step.content, {
                          onSubmit: handleSubmit(handleFormSubmit)})
                        }
                      </form>
                    </Box>

                  <StepSeparator />
                  </Step>
              ))}
            </Stepper>
            </ChakraProvider>
          </Box>

          {/* ================================================================================================ */}

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
