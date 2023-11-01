import React from 'react'
import {
    Flex,
    Text,
    useMediaQuery,
    Stack,
    Grid,
    GridItem,
    Image,
    VStack,
    Heading
} from '@chakra-ui/react'

import coin from '../../images/coin.png'
import rewards from '../../images/rewards.png'
import points from '../../images/points.png'
import mobilereward from '../../images/mobilereward.png'
const Features = () => {
    const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');

    const gridStyles = {
        padding: '20px',
        borderRadius: '10px',
        color: 'brand.textBlack',
    }

    return (
        <>
            <Flex

                alignItems="flex-start"

                // w="full"
                px={isLargerThanLG ? '16' : '6'}
                py="8"
                minHeight="90vh"
                // justifyContent="center"

                color={'brand.textBlack'}

                flexDirection={isLargerThanLG ? 'row' : 'column'}
            >

                <Image src={isLargerThanLG ? rewards : mobilereward

                } height={'40%'} alt="rewards" position={isLargerThanLG ? 'absolute' : 'relative'}
                    left={isLargerThanLG ? '-40%' : '0%'} top={isLargerThanLG ? '60%' : '0%'} zIndex="1" />

                <VStack mt={'5%'} ml={isLargerThanLG ? '35%' : '0%'} alignItems={isLargerThanLG ? 'center' : 'center'} justifyContent={isLargerThanLG ? 'flex-start' : 'center'} spacing={isLargerThanLG ? '10px' : '20px'}>
                    <Text fontSize={isLargerThanLG ? "50px" : "25px"} fontWeight="bold" color={'brand.textDarkPurple'}>A Wide Range of Coupons</Text>

                    <Text w={'80%'} fontSize={isLargerThanLG ? "20px" : "20"} fontWeight="normal" color={'brand.textDarkPurple'}>You can choose from a wide range of coupons from popular brands and stores. <br /><br /> Whether you want to save money on groceries, fashion, entertainment, or travel, OpinionLK has something for you.<br /><br /> Join OpinionLK today and start earning points for your opinions. It’s easy, fun, and rewarding!</Text>
                    <Image mt={'80px'} src = {points} height = {'350px'} alt = "rewards" boxShadow={
                        '0px 0px 10px 0px rgba(0,0,0,0.2)'
                    } borderRadius={'10px'} />
                </VStack>
            </Flex>
        </>
    )

}

export default Features