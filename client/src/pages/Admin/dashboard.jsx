import { SearchIcon } from '@chakra-ui/icons';
import { 
    Flex, 
    Heading, 
    Stack,
    Text,
    Card,
    CardHeader,
    CardBody,
    Grid,
    Image,
 } from '@chakra-ui/react'
import React from 'react'
import logo from '../../images/topbar/scaled-logo-icon.svg'
import './admin.css'

const Admindashboard = () => {
    const md = 'md';
    const mb = '-15px'
    return (
        <>
            <Grid className='AdminTopGrid' templateColumns="repeat(6, 1fr)" gap={6} overflow="auto" p={'3px'}> 
            <Flex>
                    <Stack width={'100%'}>
                        <Card borderRadius={'20px'}>
                            <Flex flexDirection={'row'} justifyContent={'center'}>
                                <Flex 
                                    boxSize={'70px'} 
                                    alignSelf={'center'} 
                                    justifySelf={'center'} 
                                    ml={5} 
                                    p={2} 
                                    justifyContent={'space-around'} 
                                    bg={'gray.100'}
                                    borderRadius={'full'}
                                >
                                    <Image alignSelf={'center'} boxSize={'50px'} src={logo} alt="Logo" />
                                </Flex>
                                <Flex justifyContent={'flex-end'} flexDirection={'column'}>
                                    <CardHeader>
                                        <Heading size={md} mb={mb}>Organizations</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Text>Organizations</Text>
                                    </CardBody>
                                </Flex>
                            </Flex>
                        </Card>
                    </Stack>
                </Flex>
                <Flex>
                    <Stack width={'100%'}>
                        <Card borderRadius={'20px'}>
                            <Flex flexDirection={'row'} justifyContent={'center'}>
                                <Flex 
                                    boxSize={'70px'} 
                                    alignSelf={'center'} 
                                    justifySelf={'center'} 
                                    ml={5} 
                                    p={2} 
                                    justifyContent={'space-around'} 
                                    bg={'gray.100'}
                                    borderRadius={'full'}
                                >
                                    <Image alignSelf={'center'} boxSize={'50px'} src={logo} alt="Logo" />
                                </Flex>
                                <Flex justifyContent={'flex-end'} flexDirection={'column'}>
                                    <CardHeader>
                                        <Heading size={md} mb={mb}>Organizations</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Text>Organizations</Text>
                                    </CardBody>
                                </Flex>
                            </Flex>
                        </Card>
                    </Stack>
                </Flex>
                <Flex>
                    <Stack width={'100%'}>
                        <Card borderRadius={'20px'}>
                            <Flex flexDirection={'row'} justifyContent={'center'}>
                                <Flex 
                                    boxSize={'70px'} 
                                    alignSelf={'center'} 
                                    justifySelf={'center'} 
                                    ml={5} 
                                    p={2} 
                                    justifyContent={'space-around'} 
                                    bg={'gray.100'}
                                    borderRadius={'full'}
                                >
                                    <Image alignSelf={'center'} boxSize={'50px'} src={logo} alt="Logo" />
                                </Flex>
                                <Flex justifyContent={'flex-end'} flexDirection={'column'}>
                                    <CardHeader>
                                        <Heading size={md} mb={mb}>Organizations</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Text>Organizations</Text>
                                    </CardBody>
                                </Flex>
                            </Flex>
                        </Card>
                    </Stack>
                </Flex>
                <Flex>
                    <Stack width={'100%'}>
                        <Card borderRadius={'20px'}>
                            <Flex flexDirection={'row'} justifyContent={'center'}>
                                <Flex 
                                    boxSize={'70px'} 
                                    alignSelf={'center'} 
                                    justifySelf={'center'} 
                                    ml={5} 
                                    p={2} 
                                    justifyContent={'space-around'} 
                                    bg={'gray.100'}
                                    borderRadius={'full'}
                                >
                                    <Image alignSelf={'center'} boxSize={'50px'} src={logo} alt="Logo" />
                                </Flex>
                                <Flex justifyContent={'flex-end'} flexDirection={'column'}>
                                    <CardHeader>
                                        <Heading size={md} mb={mb}>Organizations</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Text>Organizations</Text>
                                    </CardBody>
                                </Flex>
                            </Flex>
                        </Card>
                    </Stack>
                </Flex>
                <Flex>
                    <Stack width={'100%'}>
                        <Card borderRadius={'20px'}>
                            <Flex flexDirection={'row'} justifyContent={'center'}>
                                <Flex 
                                    boxSize={'70px'} 
                                    alignSelf={'center'} 
                                    justifySelf={'center'} 
                                    ml={5} 
                                    p={2} 
                                    justifyContent={'space-around'} 
                                    bg={'gray.100'}
                                    borderRadius={'full'}
                                >
                                    <Image alignSelf={'center'} boxSize={'50px'} src={logo} alt="Logo" />
                                </Flex>
                                <Flex justifyContent={'flex-end'} flexDirection={'column'}>
                                    <CardHeader>
                                        <Heading size={md} mb={mb}>Organizations</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Text>Organizations</Text>
                                    </CardBody>
                                </Flex>
                            </Flex>
                        </Card>
                    </Stack>
                </Flex>
                <Flex>
                    <Stack width={'100%'}>
                        <Card borderRadius={'20px'}>
                            <Flex flexDirection={'row'} justifyContent={'center'}>
                                <Flex 
                                    boxSize={'70px'} 
                                    alignSelf={'center'} 
                                    justifySelf={'center'} 
                                    ml={5} 
                                    p={2} 
                                    justifyContent={'space-around'} 
                                    bg={'gray.100'}
                                    borderRadius={'full'}
                                >
                                    <Image alignSelf={'center'} boxSize={'50px'} src={logo} alt="Logo" />
                                </Flex>
                                <Flex justifyContent={'flex-end'} flexDirection={'column'}>
                                    <CardHeader>
                                        <Heading size={md} mb={mb}>Organizations</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Text>Organizations</Text>
                                    </CardBody>
                                </Flex>
                            </Flex>
                        </Card>
                    </Stack>
                </Flex>
                </Grid>
 {/* ..................................................................... */}

                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <Flex mt={'20px'}>
                    <Stack width={'100%'}>
                        <Card borderRadius={'20px'} width={'100%'}>
                            <CardHeader>
                                <Heading size={md}>User Management</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text>User Management</Text>
                            </CardBody>
                        </Card>
                    </Stack>
                </Flex>
                <Flex mt={'20px'}>
                    <Stack width={'100%'}>
                        <Card borderRadius={'20px'} width={'100%'}>
                            <CardHeader>
                                <Heading size={md}>Survey Management</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text>User Management</Text>
                            </CardBody>
                        </Card>
                    </Stack>
                </Flex>
            </Grid>
        </>
    )
}

export default Admindashboard