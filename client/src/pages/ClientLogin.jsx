import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import {
    Flex,
    Heading,
    Stack,
    useMediaQuery,
    FormControl,
    FormLabel,
    Text,
    Input,
    Checkbox,
    Button,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useAuthContext } from '../hooks/useAuthContext';

const Login = () => {

    const {
        // eslint-disable-next-line
        user } = useAuthContext();
    const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');
    const history = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { dispatch } = useAuthContext()

    async function submit(e) {
        e.preventDefault();

        try {
            const response = await axios.post("http://opinionlk.azurewebsites.net:3002/api/client/login/ClientLogin", {
                email, password
            });

            if (response.status === 200) {
                // Successful login

                localStorage.setItem('user', JSON.stringify(response.data));

                dispatch({
                    type: 'LOGIN',
                    payload: response.data
                });

                history("/organisation", { state: { id: email } });


            } else if (response.status === 401) {
                // User does not exist
                alert("User has not signed up");
            } else {
                // Unexpected response data
                alert("Something went wrong during login");
            }
        } catch (error) {
            alert("Wrong details or server error");
            console.log(error);
        }
    }

    return (
        <Stack direction="row" spacing={4} height={'100vh'}>
            {isLargerThanLG ? (

                <Flex width={'50%'} m={'20px'}
                    backgroundColor={'brand.blue'}
                    backgroundPosition={'center'} backgroundRepeat={'no-repeat'} backgroundSize={'cover'}
                    borderRadius={'20px'} />

            ) : null}

            <Flex width={isLargerThanLG ? '60%' : '100%'} height={'100%'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>

                <Stack spacing={8} width={'80%'}>
                    <Flex width={'100%'}><Link to='/'><ArrowBackIcon /> <u>Return to Home</u>

                    </Link></Flex>
                    <Heading>
                        Login
                    </Heading>
                    <>
                        <form onSubmit={submit} method="POST">
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Remember me</Checkbox>
                                    <Link color={'blue.400'}>Forgot password?</Link>
                                </Stack>
                                <Button
                                    type="submit"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                >
                                    Sign in
                                </Button>
                            </Stack>
                        </form>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Don't have an account <Link color={'blue.400'} to="/signup">Sign Up</Link>
                            </Text>
                        </Stack>
                    </>
                </Stack>

            </Flex>
        </Stack>
    )
}

export default Login;