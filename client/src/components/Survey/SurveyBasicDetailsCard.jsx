import React from 'react'
import { 
    Card, 
    Text,
    Flex,
} from '@chakra-ui/react'
const SurveyCard = () => {
    return (

        <Flex>
            <Card p={6} minW={100}>
                <Flex mb={2}>
                    <Text w={40}>
                        Type:
                    </Text>
                    <Text>
                        Time Based
                    </Text>
                </Flex>
                <Flex mb={2}>
                    <Text w={40}>
                        Duration:
                    </Text>
                    <Text>
                        31 days
                    </Text>
                </Flex>
                <Flex mb={2}>
                    <Text w={40}>
                        Start date:
                    </Text>
                    <Text>
                        20/10/23
                    </Text>
                </Flex>
                <Flex mb={2}>
                    <Text w={40}>
                        End date:
                    </Text>
                    <Text>
                        30/10/23
                    </Text>
                </Flex>
                <Flex mb={2}>
                    <Text w={40}>
                        No. of questions:
                    </Text>
                    <Text>
                        31
                    </Text>
                </Flex>
                <Flex mb={2}>
                    <Text w={40}>
                        Price:
                    </Text>
                    <Text>
                        6000 LKR
                    </Text>
                </Flex>
            </Card>
            
        </Flex>

    )
}

export default SurveyCard