import React from 'react'

import { 
    Text,
    Stack,
    Box,
    Heading,
    Button,
    Image,
    Flex,
    Spacer,
    Progress,
} from '@chakra-ui/react'

import CouponPopup from './CouponPopup'
// import CouponIMG from '../../images/couponimg.png'
import { RiCopperCoinFill } from "react-icons/ri";

const CouponCard = ({couponID, couponName, couponDescription, companyName, couponImage, couponPoints, userPoints}) => {

    const percent = (userPoints/couponPoints)*100

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
                borderRadius={'10px'}
                src={couponImage}
                alt='coupon'
                
                />
            </Box>
            <Box pl='5' width = '250px' height='auto'>
                <Stack mt='3' mb='4'>
                    <Heading size='md'>{couponName}</Heading>
                    <Text size = 'sm' color = '#A3AED0' mt='-2' mb='-1'>
                        {companyName}
                    </Text>
                    <Text fontSize={14}>
                        {couponDescription}
                        Get another cupcake free with the purchase of any of our cupcakes on the standard menu.
                    </Text>
                </Stack>
                <Flex
                    position={'relative'}
                    bottom='1'
                    alignContent={'center'}
                    justifyContent={'center'}
                >
                    <Box pt='4' width='130px' pr='3'>
                        <Progress value={percent} width='100%' borderRadius='20px' colorScheme='purple' borderColor='#451CFC'/>
                    </Box>
                    {/* <Progress value={50} width='50%' borderRadius='20px' color='#451CFC' /> */}
                    <Spacer/>
                    
                    {userPoints >= couponPoints ? (
                        // <Button variant='solid' colorScheme='purple' leftIcon={<RiCopperCoinFill />} bg='#583EFF'>
                        //     {couponPoints}
                        // </Button>
                        <CouponPopup 
                            couponID={couponID}
                            couponName={couponName}
                            couponDescription={couponDescription}
                            companyName={companyName}
                            couponImage={couponImage}
                            couponPoints={couponPoints}
                            userPoints={userPoints}
                        />
                    ) : (
                        /* Another type of button */
                        <Button variant='solid' colorScheme='gray' leftIcon={<RiCopperCoinFill />}>
                        {userPoints}/{couponPoints}
                        </Button>
                    )}
                </Flex>
            </Box>
        </Flex>
        
    )
}

export default CouponCard