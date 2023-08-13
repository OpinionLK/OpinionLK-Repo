import {
    Flex,
    Heading,
    Stack,
    Text,
    Card,
    CardHeader,
    CardBody,
    Button,
    IconButton,
    Tag,
    Icon,
    Box
} from '@chakra-ui/react'
import React from 'react'
import createsurveybg from '../../assets/images/createsurveybg.png'

import { BiDotsHorizontalRounded } from 'react-icons/bi'
const SurveyPage = () => {
    return (
        <>
            <Flex width={'100%'} gap={'10px'} flexDirection={'column'}>
                <Heading as={'h2'} size={'xl'} fontWeight={'semibold'}>Surveys</Heading>
                <Flex w={'100%'} gap={'30px'} mt={'30px'}>
                    <Flex flexDirection={'row'} width={'50%'} gap={'40px'}>
                        <Flex width={'100%'} height={'100%'}>
                            <Stack spacing='4' w={'100%'}>
                                {/* map 5 times */}

                                <Card size={'md'} boxShadow={'md'} >
                                    <Flex>
                                        <Flex direction={'column'} width={'80%'}>
                                            <CardHeader>
                                                <Heading size='md'>Chocolate Biscuits</Heading> <Tag mt={'10px'} fontWeight={'bold'} colorScheme='whatsapp'>Active</Tag>
                                            </CardHeader>
                                            <CardBody pt={'0'}>

                                                <Text>
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                                                </Text>


                                            </CardBody>
                                        </Flex>
                                        <Flex width={'20%'} justifyContent='center' alignItems={'center'}>
                                            <Button>
                                                <Icon as={BiDotsHorizontalRounded} />
                                            </Button>

                                        </Flex>
                                    </Flex>
                                </Card>
                                <Card size={'md'} boxShadow={'md'}>
                                    <Flex>
                                        <Flex direction={'column'} width={'80%'}>
                                            <CardHeader>
                                                <Heading size='md'>Chocolate Biscuits</Heading> <Tag mt={'10px'} fontWeight={'bold'} colorScheme='whatsapp'>Active</Tag>
                                            </CardHeader>
                                            <CardBody pt={'0'}>

                                                <Text>
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                                                </Text>


                                            </CardBody>
                                        </Flex>
                                        <Flex width={'20%'} justifyContent='center' alignItems={'center'}>
                                            <Button>
                                                <Icon as={BiDotsHorizontalRounded} />
                                            </Button>

                                        </Flex>
                                    </Flex>
                                </Card>
                                <Card size={'md'} boxShadow={'md'} >
                                    <Flex>
                                        <Flex direction={'column'} width={'80%'}>
                                            <CardHeader>
                                                <Heading size='md'>Chocolate Biscuits</Heading> <Tag mt={'10px'} fontWeight={'bold'} colorScheme='blue'>Complete</Tag>
                                            </CardHeader>
                                            <CardBody pt={'0'}>

                                                <Text>
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                                                </Text>


                                            </CardBody>
                                        </Flex>
                                        <Flex width={'20%'} justifyContent='center' alignItems={'center'}>
                                            <Button>
                                                <Icon as={BiDotsHorizontalRounded} />
                                            </Button>

                                        </Flex>
                                    </Flex>
                                </Card>


                            </Stack>
                        </Flex>
                    </Flex>
                    <Flex flexDirection={'column'} width={'50%'} justifyContent={'flex-start'} alignItems={'flex-start'} >
                        <Flex backgroundImage={createsurveybg} boxShadow='2xl' backgroundSize={'cover'} width={'60%'} padding={'30px'} borderRadius={'10px'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'}>

                            <Text fontSize={'24px'} color={'white'} fontWeight={'bold'}>
                                Create a new survey!
                            </Text>
                            <Text pb={'20px'} color={'white'} fontWeight={'normal'}>Gain accurate insights</Text>
                            <Button size={'lg'} width={'90%'} colorScheme='brand'>
                                Get Started
                            </Button>

                        </Flex>


                    </Flex>
                </Flex>

            </Flex>
        </>
    )
}

export default SurveyPage