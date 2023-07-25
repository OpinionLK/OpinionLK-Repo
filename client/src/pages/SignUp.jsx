import React from 'react'
import { useState } from 'react'
import {
    Box,
    Flex,
    Heading,
    Image,
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



} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { ArrowBackIcon } from '@chakra-ui/icons'
import LoginBG from '../images/loginbg.jpg'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';



const Login = () => {
    const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');
    const [showPassword, setShowPassword] = useState(false);

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

                    <Stack align={'left'}>
                        <Heading fontSize={'4xl'} textAlign={'left'}>
                            Sign up
                        </Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to access surveys and earn rewards!
                        </Text>
                    </Stack>

                    <Stack spacing={4}>
                        <HStack>
                            <Box>
                                <FormControl id="firstName" isRequired>
                                    <FormLabel>First Name</FormLabel>
                                    <Input type="text" />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="lastName">
                                    <FormLabel>Last Name</FormLabel>
                                    <Input type="text" />
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() =>
                                            setShowPassword((showPassword) => !showPassword)
                                        }>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already a user? <Link color={'blue.400'}>Login</Link>
                            </Text>
                        </Stack>
                    </Stack>


                </Stack>
            </Flex>
        </Stack>
    )
}

export default Login