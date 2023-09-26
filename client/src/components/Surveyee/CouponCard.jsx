import React from 'react'

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
    Flex,
    IconButton,
    Input,
    Spacer,
    Progress,
    extendTheme,
} from '@chakra-ui/react'

import CouponIMG from '../../images/couponimg.png'
import { RiCopperCoinFill } from "react-icons/ri";

const CouponCard = () => {

    return (
        <Flex
            direction = 'row'
            width = 'fit-content'
            p = '5'
            backgroundColor={'#fff'}
            borderRadius={'20px'}
        >
            <Box width='230px'>
                <Image
                src={CouponIMG}
                alt='coupon'
                
                />
            </Box>
            <Box pl='5' width = '270px' height='auto'>
                <Stack mt='3' mb='4'>
                    <Heading size='md'>Buy one get one free</Heading>
                    <Text size = 'sm' color = '#A3AED0' mt='-2' mb='-1'>
                        Bakes by Bella
                    </Text>
                    <Text>
                        Get another cupcake free with the purchase of any of our cupcakes on the standard menu.
                    </Text>
                </Stack>
                <Flex
                    position={'relative'}
                    bottom='-7'
                    alignContent={'center'}
                    justifyContent={'center'}
                >
                    {/* <Text color='blue.600' fontSize='2xl'>
                        $450
                    </Text> */}
                    <Box pt='4' width='130px' pr='3'>
                        <Progress value={50} width='100%' borderRadius='20px' colorScheme='purple' borderColor='#451CFC'/>
                    </Box>
                    {/* <Progress value={50} width='50%' borderRadius='20px' color='#451CFC' /> */}
                    <Spacer/>
                    <Button variant='solid' colorScheme='purple' leftIcon={<RiCopperCoinFill />}>
                        400/600
                    </Button>
                </Flex>
            </Box>
        </Flex>
        
    )
}

export default CouponCard