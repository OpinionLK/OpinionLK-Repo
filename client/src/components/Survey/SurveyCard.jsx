import React from 'react'
import { 
    Text,
    Stack,
    Box,
    Heading,
    Image,
    Flex,
    Spacer,
    Tag,
    TagLabel,
    Wrap,
} from '@chakra-ui/react'
import SurveyPopup from './SurveyPopup'

const SurveyCard = ({type, surveyName, surveyDescription, surveyImage, surveyID, surveyTags, surveyPoints}) => {
    return (

        <Box maxW='300px' width={'auto'} borderRadius={15} borderColor={'#fff'} p='4' bgColor='white'>
            <Box
                position="relative"
                height="150px"
                overflow="hidden"
                borderRadius='lg'
            >
                <Image
                // src={sampleCard}
                src={'http://localhost:3002/api/survey/images/' + {surveyImage}} alt={surveyName}
                />
            </Box>  

            <Stack mt='6' spacing='1' pr='0.5' pl='0.5'>
                <Heading size='sm'>{surveyName}</Heading>
                <Text fontSize='xs'>
                    {surveyDescription}
                </Text>
            </Stack>
            
            <Flex
                pr='0.5'
                pl='0.5'
                pt='4'
            >
                {/* <Text color='blue.600' fontSize='2xl'>
                    $450
                </Text> */}
                <Wrap spacing='1' width='140px'>
                        <Tag size='sm' key='sm' variant='outline' colorScheme='purple'>
                        <TagLabel>art</TagLabel>
                        </Tag>
                         <Tag size='sm' key='sm' variant='outline' colorScheme='purple'>
                         <TagLabel>modern</TagLabel>
                         </Tag>
                          <Tag size='sm' key='sm' variant='outline' colorScheme='purple'>
                        <TagLabel>youth</TagLabel>
                        </Tag>
                </Wrap>
                <Spacer />
                {/* <Button 
                    variant='solid' 
                    colorScheme='blue' 
                    borderRadius={'full'} 
                    fontSize={12} 
                    fontWeight={'light'} 
                    bg='#11047A'
                >
                    Go to Survey
                </Button> */}
                <SurveyPopup
                    type = {type}
                    surveyID = {surveyID}
                    surveyName = {surveyName}
                    surveyDescription = {surveyDescription}
                    surveyImage = {surveyImage}
                    surveyTags = {surveyTags}
                    surveyPoints = {surveyPoints}
                />
            </Flex>
        </Box>

    )
}

export default SurveyCard