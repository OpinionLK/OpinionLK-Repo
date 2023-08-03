import React from 'react';
import { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Image,
  Alert,
  AlertIcon,
  Stack,
  useMediaQuery,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  useColorModeValue,
  IconButton,
  Text,
  HStack,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import LoginBG from '../images/loginbg.jpg';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';

const SignUp = () => {
    const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [userCreated, setUserCreated] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const firstName = event.target.elements.firstName.value;
        const lastName = event.target.elements.lastName.value;
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;

        try {
            await axios.post('http://localhost:3002/api/auth/signup', { 
                firstName, 
                lastName, 
                email, 
                password 
            });
            console.log('User created successfully');
            setUserCreated(true);
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

          <Stack spacing={4}>
            <form onSubmit={handleSubmit} method="POST">
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input name="firstName" type="text" />
                  </FormControl>
                </Box>
                <Box>
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
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Sign up
                </Button>
              </Stack>
            </form>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'} to= "/login">Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default SignUp;
