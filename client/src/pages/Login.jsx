import React, {  useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import {
    Flex,
    Heading,
    Image,
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
import { useAuthContext } from '../hooks/useAuthContext'
import LoginImage from '../assets/images/q.png'
import config from '../config'

const Login = () => {
    const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');
    const history = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { dispatch } = useAuthContext()

    async function submit(e) {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.backendUrl}/api/auth/login`, {
                email, password
            });
            console.log(response);

            if (response.status === 200) {
                // Successful login

                localStorage.setItem('user', JSON.stringify(response.data));

                dispatch({
                    type: 'LOGIN',
                    payload: response.data
                });
                console.log(response.data);
                if (response.data.type === 'client') {
                    history("/organisation", { state: { id: email } });
                } else if (response.data.type === 'admin') {
                    history("/admin", { state: { id: email } });

                } else if (response.data.type === 'manager') {
                    history("/commanager", { state: { id: email } });
                }
                else {
                    history("/portal", { state: { id: email } });
                }



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

                <Image
                    src={LoginImage}
                    width={'50%'} m={'20px'}
                    backgroundSize={'cover'}
                    backgroundColor={'brand.purple'}
                    backgroundPosition={'center'} backgroundRepeat={'no-repeat'}
                    borderRadius={'20px'} />

            ) : null}

            <Flex width={isLargerThanLG ? '60%' : '100%'} height={'100%'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>

                <Stack spacing={8} width={'80%'}>
                    <Flex width={'100%'}>
                        <Link to="/">
                            <Button fontWeight={500}>
                                <ArrowBackIcon /> Return to Home
                            </Button>
                        </Link>
                    </Flex>
                    <Heading>
                        Login
                    </Heading>
                    <>
                        <form onSubmit={submit} method="POST">
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input type="email"
                                    mb={3}
                                    value={email}
                                    // variant='pill'
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
                            <Stack spacing={10} mt={5}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Remember me</Checkbox>
                                    <Link color={'blue.400'}>Forgot password?</Link>
                                </Stack>
                                <Button
                                    alignSelf={'flex-end'}
                                    type="submit"
                                    bg={'blue.400'}
                                    color={'white'}
                                    width={'100px'}
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