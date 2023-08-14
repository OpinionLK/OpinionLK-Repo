import React from 'react'

// import './style.css'

import { 
    Card, 
    CardHeader, 
    CardBody, 
    CardFooter, 
    Text,
    Stack,
    StackDivider,
    Box,
    Heading,
    Divider,
    ButtonGroup,
    Button,
    Image,
    Flex
} from '@chakra-ui/react'

// import { NavLink } from "react-router-dom";
import discover from '../../images/dash-image.png'
import gradient from '../../images/gradient.png'

const StatCard = () => {
    return (

        <Card
            size='md'
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            // p={[2, 3]}
            borderRadius='20'
            mt={5}
            mr={5}
        >
            <Box
                position="relative"
                // width="800px"
                height="300px"
                overflow="hidden"
            >
                <Image
                    // boxSize='300px'
                    // borderRadius='40'
                    objectFit='cover'
                    // maxW={{ base: '100%', sm: '700px' }}
                    // link to image in the same folder
                    
                    // src='../assets/images/Dash-image.png'
                    src={discover}
                    alt='discover'
                    // htmlWidth={800}
                />

                {/* Image Overlay */}
                <Image
                    src={gradient} // Replace with the URL of your overlay image
                    alt="Overlay Image"
                    position="absolute"
                    top="0"
                    left="0"
                    width="100%"
                    height="100%"
                    // opacity="0.5" // Adjust the opacity of the overlay image if needed
                />
                
                <Box
                    position="absolute"
                    width="800px"
                    height="300px"
                    top="0%"
                    left="0%"
                    overflow="hidden"
                >
                    {/* Text Overlay */}
                    <Text
                        position="absolute"
                        top="20%"
                        left="26%"
                        transform="translate(-50%, -50%)" // Center the text vertically and horizontally
                        color="white"
                        fontSize="25px"
                        // fontWeight="bold"
                    >
                        Find Your Desired Audience
                    </Text>

                    <Text
                        position="absolute"
                        top="35%"
                        left="18%"
                        transform="translate(-50%, -50%)" // Center the text vertically and horizontally
                        color="white"
                        fontSize="15px"
                        // fontWeight="bold"
                    >
                        Make every response count
                    </Text>

                    <Button 
                        position="absolute"
                        top="70%"
                        left="6%"
                        color='#000'
                        bg='#fff'
                        variant='solid'
                    >
                        Check it out
                    </Button>
                </Box>
            </Box>
        </Card>

    )
}

export default StatCard