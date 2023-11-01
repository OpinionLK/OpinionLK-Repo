import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Flex,
    Heading,
    Image,
    Stack,
    useMediaQuery,
    FormControl,
    FormLabel,
    Input,
    Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import LoginImage from '../assets/images/q.png';
import config from '../config';

function ResetPass() { // Capitalized the function name
    const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');
    const history = useNavigate();
    const [email, setEmail] = useState('');

    async function submit(e) {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.backendUrl}/api/auth/sendEmail`, {
                email
            });
            console.log(response);

            if (response.status === 200) {
                // Email sent successfully
                history("/login");
            }
        }
        catch (err) {
            console.log(err);
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
                        Reset Password
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
                    
                            <Stack spacing={10} mt={5}>
                               
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
                                   Submit
                                </Button>
                            </Stack>
                        </form>
                        <Stack pt={6}>
                            
                        </Stack>
                    </>
                </Stack>

{/* //display emailVeryfyCard after clicking submit button */}
                
            </Flex>
        </Stack>
    )
}

export default ResetPass;