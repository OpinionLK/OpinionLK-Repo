import {
    React,
    useState
} from 'react'
import {
    Stack,
    FormControl,
    FormLabel,
    Text,
    Input,
    Checkbox,
    Button,
} from '@chakra-ui/react'

import { Link } from 'react-router-dom'

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email: ', email);
        console.log('Password: ', password);
    };

    return (
        <>
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
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                        bg: 'blue.500',
                    }}
                    onClick={handleSubmit}>
                    Sign in
                </Button>
            </Stack>
            <Stack pt={6}>
                <Text align={'center'}>
                    Don't have an account <Link color={'blue.400'}>Sign Up</Link>
                </Text>
            </Stack>
        </>
    )
}

export default LoginForm