import { 
    Flex, 
    Heading, 
    Stack,
    Text,
    Card,
    CardHeader,
    CardBody,
 } from '@chakra-ui/react'
import React from 'react'

const SurveyPage = () => {
    return (
        <>
            <Flex width={'100%'} gap={'10px'}>
                <Flex flexDirection={'column'} width={'50%'}>

                    <Heading as={'h2'} size={'xl'} fontWeight={'semibold'}>Surveys</Heading>
                    <Flex backgroundColor={'red'} width={'100%'} height={'100%'}>
                        <Stack spacing='4' w={'100%'}>
                        {/* map 5 times */}
                        
                            {['sm'].map((size) => (
                                <Card key={size} size={size} boxShadow='sm' >
                                    <CardHeader>
                                        <Heading size='md'> {size}</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Text>size = {size}</Text>
                                    </CardBody>
                                </Card>
                            ))}
                        </Stack>
                    </Flex>
                </Flex>
                <Flex flexDirection={'column'} width={'50%'}>
                    {/* 
                    <Heading as={'h2'} size={'xl'} fontWeight={'semibold'}>Surveys</Heading>
                    <Flex backgroundColor={'red'} width={'100%'} height={'100%'}>
                        r
                    </Flex> */}
                </Flex>

            </Flex>
        </>
    )
}

export default SurveyPage