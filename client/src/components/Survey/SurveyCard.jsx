import React from 'react'

// import './style.css'

import { 
    Text,
    Stack,
    Box,
    Heading,
    Button,
    Image,
    Flex,
    Spacer,
    HStack,
    Tag,
    TagLabel,
    TagRightIcon,
    Wrap,
} from '@chakra-ui/react'

// import { NavLink } from "react-router-dom";
import sampleCard from '../../images/sample-card.png'
import SurveyPopup from './SurveyPopup'

const SurveyCard = () => {
    return (

        <Box maxW='300px' width={'auto'} borderRadius={15} borderColor={'#fff'} p='4' bgColor='white'>
            <Box
                position="relative"
                height="150px"
                overflow="hidden"
                borderRadius='lg'
            >
                <Image
                src={sampleCard}
                alt='abstract art'
                />
            </Box>  

            <Stack mt='6' spacing='1' pr='0.5' pl='0.5'>
                <Heading size='sm'>Modern Art in Society</Heading>
                <Text fontSize='xs'>
                    by MMCA Sri Sri Lanka
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
                <SurveyPopup/>
            </Flex>
        </Box>

    )
}

export default SurveyCard