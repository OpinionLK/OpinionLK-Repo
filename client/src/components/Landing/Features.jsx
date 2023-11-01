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

                flexDirection={isLargerThanLG ? 'column' : 'column'}
            >

                <Image src={rewards} height={'40%'} alt="rewards" position="absolute" left="-40%" zIndex="1" />
                <VStack mt={'5%'} ml={'40%'}>
                    <Text fontSize="50px" fontWeight="bold" color={'brand.textDarkPurple'}>A Wide Range of Coupons</Text>
                    <Text fontSize="40px" fontWeight="bold" color={'brand.textDarkPurple'}></Text>
                    <Text fontSize="20px" fontWeight="normal" color={'brand.textDarkPurple'}>You can choose from a wide range of coupons from popular brands and stores. Whether you want to save money on groceries, fashion, entertainment, or travel, OpinionLK has something for you. Join OpinionLK today and start earning points for your opinions. It’s easy, fun, and rewarding!</Text>
                </VStack>
            </Flex>
        </>
    )

}

export default Features