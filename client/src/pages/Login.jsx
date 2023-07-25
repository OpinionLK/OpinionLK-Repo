import React from 'react'
import {
    Box,
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
    IconButton
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { ArrowBackIcon } from '@chakra-ui/icons'
import LoginBG from '../images/loginbg.jpg'
import LoginForm from '../components/Forms/LoginForm'

const Login = () => {
    const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');

    return (
        <Stack direction="row" spacing={4} height={'100vh'}>
            {isLargerThanLG ? (

                <Flex width={'50%'} m={'20px'}
                    backgroundColor={'brand.purple'}
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
                    <LoginForm />
                </Stack>

            </Flex>
        </Stack>
    )
}

export default Login