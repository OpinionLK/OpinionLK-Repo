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
 } from '@chakra-ui/react'
import React from 'react'

const Admindashboard = () => {
    const md = 'md';
    const mb = '-15px'
    return (
        <>
            <Grid templateColumns="repeat(8, 1fr)" gap={6}>
                <Flex>
                    <Stack>
                        <Card borderRadius={'20px'}>
                            <CardHeader>
                                <Heading size={md} mb={mb}>Organizations</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text>Organizations</Text>
                            </CardBody>
                        </Card>
                    </Stack>
                </Flex>
                <Flex>
                    <Stack>
                        <Card borderRadius={'20px'}>
                            <CardHeader>
                                <Heading size={md} mb={mb} >Organizations</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text>Organizations</Text>
                            </CardBody>
                        </Card>
                    </Stack>
                </Flex>
                <Flex>
                    <Stack>
                        <Card borderRadius={'20px'}>
                            <CardHeader>
                                <Heading size={md} mb={mb}>Organizations</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text>Organizations</Text>
                            </CardBody>
                        </Card>
                    </Stack>
                </Flex>
                <Flex>
                    <Stack>
                        <Card borderRadius={'20px'}>
                            <CardHeader>
                                <Heading size={md} mb={mb}>Organizations</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text>Organizations</Text>
                            </CardBody>
                        </Card>
                    </Stack>
                </Flex>
                <Flex>
                    <Stack>
                        <Card borderRadius={'20px'}>
                            <CardHeader>
                                <Heading size={md} mb={mb}>Organizations</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text>Organizations</Text>
                            </CardBody>
                        </Card>
                    </Stack>
                </Flex>
                <Flex>
                    <Stack>
                        <Card borderRadius={'20px'}>
                            <CardHeader>
                                <Heading size={md} mb={mb}>Organizations</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text>Organizations</Text>
                            </CardBody>
                        </Card>
                    </Stack>
                </Flex>
                <Flex>
                    <Stack>
                        <Card borderRadius={'20px'}>
                            <CardHeader>
                                <Heading size={md} mb={mb}>Organizations</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text>Organizations</Text>
                            </CardBody>
                        </Card>
                    </Stack>
                </Flex>
                <Flex>
                    <Stack>
                        <Card borderRadius={'20px'}>
                            <CardHeader>
                                <Heading size={md} mb={mb}>Organizations</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text>Organizations</Text>
                            </CardBody>
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