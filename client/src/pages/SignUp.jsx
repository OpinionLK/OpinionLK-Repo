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
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
import signupImage from '../assets/images/client_signup.jpg';


const SignUp = () => {
  const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userCreated, setUserCreated] = useState(false);

  const { dispatch } = useAuthContext()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const firstName = event.target.elements.firstName.value;
    const lastName = event.target.elements.lastName.value;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;


    try {
      const json = await axios.post('https://opinionlk.azurewebsites.net/api/auth/signup', {
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

    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage('User with this email already exists.');
      } else {
        setErrorMessage('Server error. Please try again later.');
      }
      console.error('Error creating user:', error);
    }
  };

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
          <Flex width={'100%'}>
            <Link to="/">
              <ArrowBackIcon /> <u>Return to Home</u>
            </Link>
          </Flex>

          <Stack align={'left'}>
            <Heading fontSize={'4xl'} textAlign={'left'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to access surveys and earn rewards!
            </Text>

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

          <Stack spacing={4} gap={'40px'}>
            <form onSubmit={handleSubmit} method="POST">
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
                <Stack spacing={10} pt={2} justifyItems={'flex-end'} alignItems={'flex-end'}>
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
                </Stack>
              </Stack>
            </form>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'} to="/login">Login</Link>
              </Text>
              <Text align={'center'}>
                <Link color={'blue.400'} to="/client/signup">Sign up as a Client</Link>
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Flex >
    </Stack >
  );
};

export default SignUp;
