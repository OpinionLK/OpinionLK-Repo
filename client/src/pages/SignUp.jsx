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
  Image,
  Card,
  Center,
  Divider
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { ArrowBackIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
import signupImage from '../assets/images/client_signup.jpg';
import tcImage from '../assets/images/landing/logo-Dark.svg';



const SignUp = () => {
  const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userCreated, setUserCreated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useAuthContext()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const firstName = event.target.elements.firstName.value;
    const lastName = event.target.elements.lastName.value;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;


    try {
      const json = await axios.post('http://localhost:3002/api/auth/signup', {
        firstName,
        lastName,
        email,
        password
      });
      console.log('User created successfully');
      setUserCreated(true);

      localStorage.setItem('user', JSON.stringify(json.data));

      dispatch({
        type: 'LOGIN',
        payload: json
      });

      document.getElementById('SignUpForm').reset();
      document.getElementById('SignUpForm').style.display = 'none';
      document.getElementById('SignUpHeader').style.display = 'none';
      document.getElementById('footer').style.display = 'none';
      document.getElementById('emailVeryfyCard').style.display = 'block';
      document.getElementById('emailVeryfyCard').style.marginBottom = '-50px';
      document.getElementById('back').style.marginBottom = '-50px';
      document.getElementById('back').style.marginBottom = '-50px';

    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage('User with this email already exists.');
      } else {
        setErrorMessage('Server error. Please try again later.');
      }
      console.error('Error creating user:', error);
    }
  };

  const openTcModel = () => {
    setIsOpen(true);  
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
        height={'100%'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Stack spacing={8} width={'80%'}>
          <Flex id='back' width={'100%'}>
            <Link to="/">
            <Button fontWeight={500}>
              <ArrowBackIcon /> Return to Home
              </Button>
            </Link>
          </Flex>
          <Stack id='SignUpHeader' align={'left'}>
            <Heading fontSize={'4xl'} textAlign={'left'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to access surveys and earn rewards!
            </Text>
          </Stack>
          <Stack spacing={4} gap={'40px'}>
            <form id='SignUpForm' onSubmit={handleSubmit} method="POST">
              <Stack spacing={5}>
                <HStack>
                  <Box width={'100%'}>
                    <FormControl id="firstName" isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input name="firstName" type="text" />
                    </FormControl>
                  </Box>
                  <Box width={'100%'}>
                    <FormControl id="lastName">
                      <FormLabel>Last Name</FormLabel>
                      <Input name="lastName" type="text" />
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input name="email" type="email" />
                </FormControl>
                {errorMessage && (
                  <Box color="red.500" mt={2} mb={2}>
                    <Alert
                      status="error"
                      variant="subtle"
                      fontSize="md"
                      borderRadius="5px"
                    >
                      <AlertIcon />
                      {errorMessage}
                    </Alert>
                  </Box>
                )}
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                    />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setShowPassword(showPassword => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <HStack spacing={10} pt={2} justifyContent={'space-between'} alignItems={'center'}>
                  {/* signup terms and condition tag */}
                  <Text fontSize={'sm'} color={'gray.600'}>
                    By signing up, you agree to our{' '}
                    <Link onClick={openTcModel} isExternal>
                      <span style={{color: 'blue', fontWeight: 400}}> terms and conditions </span> <ExternalLinkIcon mx='2px' />
                    </Link>
                  </Text>
                  <Button
                    type="submit"
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    w={'100px'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                  >
                    Sign up
                  </Button>
                </HStack>
              </Stack>
            </form>
            <Stack id='footer' pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'} to="/login"><u>Login</u> <ExternalLinkIcon mx='2px' /></Link>
              </Text>
              <Text align={'center'}>
                <Link color={'blue.400'} to="/client/signup">Sign up as a <u>Client</u> <ExternalLinkIcon mx='2px' /></Link>
              </Text>
            </Stack>
          </Stack>

          {/* ========================================== Alerts ========================================================== */}
 
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

          <Card 
            id='emailVeryfyCard' 
            p={6} 
            w={'100%'} 
            maxH={'150px'}
            display={'none'} 
            bg={'blue.100'}
            zIndex={'100'}
            // position={'fixed'}
            // top={'40%'}
            // left={'60%'}
          >
              <Heading fontSize={'xl'} mb={2} textAlign={'left'}>
                Please veryify your email address
              </Heading>
              <Text fontSize={'md'} textAlign={'left'}>
                We have sent you an email with a link to verify your email address.
                Please click on the link to verify your email address.
              </Text>
            </Card>
        </Stack>
      </Flex >
      {/* ================================================== terms and condition popup ====================================== */}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Terms and Conditions"
        style={{
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: '1000',
          },
          content: {
            width: '50%',
            minHeight: 'fit-content',
            height: '65%',
            margin: 'auto',
            marginTop: '5%',
            borderRadius: '0px',
            padding: '30px',
            backgroundColor: 'white',
            zIndex: '1000',
          },
        }}
      >
        <Heading fontSize={'xl'} mb={2} textAlign={'left'}>
          Terms and Conditions
        </Heading>
        <Divider></Divider>
        <Center>
          <Image 
            src={tcImage}
            width={'200px'}
            m={'20px'}
            ></Image>
        </Center>
        <Text  fontSize={'md'} textAlign={'left'}>
          <h3> 1. Introduction </h3>

          <h4 style={{fontSize: '14px'}}>These terms and conditions ("Terms") govern your use of the OpinionLK platform (the "Platform") and any services provided by OpinionLK ("we", "our", "us"). By using the Platform, you agree to abide by these Terms. If you do not agree to these Terms, please refrain from using the Platform.</h4>
          <br></br>
          <h3> 2. User Accounts </h3>

          <h4 style={{fontSize: '14px', marginLeft: 10}}>  a. <b>Registration:</b> To access certain features of the Platform, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process.</h4> 
          

          <h4 style={{fontSize: '14px', marginLeft: 10}}> b. <b>Password:</b>  You are responsible for maintaining the confidentiality of your account password. You agree to notify us immediately of any unauthorized use of your account.</h4> 

          <h4 style={{fontSize: '14px', marginLeft: 10}}> c. <b>Termination:</b>  We reserve the right to terminate or suspend your account and access to the Platform at any time for any reason.</h4>

          <br></br>
          <h3> 3. Participation in Surveys </h3>

          <h4 style={{fontSize: '14px', marginLeft: 10}} > a. <b>Eligibility:</b> You must be a registered user to participate in surveys on the Platform. Users must be at least 18 years of age or the legal age in your jurisdiction to participate.</h4> 

          <h4 style={{fontSize: '14px', marginLeft: 10}}> b. <b>Points and Rewards:</b> Users may earn points or rewards for participating in surveys. The redemption of points is subject to the rules and restrictions outlined on the Platform.</h4> 

          <h4 style={{fontSize: '14px', marginLeft: 10}}> c. <b>Fraud Prevention:</b> We reserve the right to monitor and prevent fraudulent or suspicious activity related to survey participation.</h4> 
          <br></br>

          <h3> 4. Privacy Policy </h3>


          <h4 style={{fontSize: '14px', marginLeft: 10}}>Your use of the Platform is also governed by our Privacy Policy, which can be found at [Link to Privacy Policy]. Please review this policy to understand how we collect, use, and protect your personal information.</h4>
          <br></br>

          <h3> 5. Content Ownership </h3>

          <h4 style={{fontSize: '14px', marginLeft: 10}}> a. <b>User-Generated Content:</b> Users may submit content, including survey responses, reviews, and comments. By submitting content, you grant us a non-exclusive, royalty-free, worldwide license to use, display, and distribute this content.</h4> 

          <h4 style={{fontSize: '14px', marginLeft: 10}}> b. <b>Intellectual Property:</b> The Platform and its original content, features, and functionality are owned by OpinionLK and are protected by international copyright,</h4> 
          <br></br>

          <h3>6. Limitation of Liability</h3>
          

          <h4 style={{fontSize: '14px', marginLeft: 10}}>OpinionLK and its affiliates, officers, employees, and agents are not liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the Platform.</h4>
          <br></br>

          <h3>7. Termination</h3>
          

          <h4 style={{fontSize: '14px', marginLeft: 10}}>We may terminate or suspend your account and access to the Platform without notice for any reason, including a breach of these Terms.</h4>
          <br></br>

          <h3>8. Modifications to Terms</h3>
          

          <h4 style={{fontSize: '14px', marginLeft: 10}}>We reserve the right to modify these Terms at any time. It is your responsibility to periodically review these Terms. By continuing to use the Platform, you accept any changes to these Terms.</h4>
          <br></br>

          <h3> 9. Governing Law </h3>
          <br></br>

          <h4 style={{fontSize: '14px', marginLeft: 10}}>These Terms are governed by and construed in accordance with the laws of Privacy and Policy which aligns with Sri Lankan government terms and regulations.</h4>
          <br></br>

          <h3> 10. Contact Information </h3>

          <h4 style={{fontSize: '14px', marginLeft: 10}}>If you have any questions about these Terms, please contact us at <span style={{color: 'blue',}}>info@opinionlk.me</span>.</h4>
        </Text>
        <Button
          mt={4}
          colorScheme="blue"
          float={'right'}
          onClick={() => setIsOpen(false)}
        >
          Close
        </Button>
      </Modal>
    </Stack >
  );
};

export default SignUp;
