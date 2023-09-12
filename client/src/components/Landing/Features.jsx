import React from 'react'
import {
    Flex,
    Text,
    useMediaQuery,
    Stack,
    Grid,
    GridItem,
    Image,
    Heading
} from '@chakra-ui/react'

import coin from '../../images/coin.png'

const Features = () => {
    const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');

    const gridStyles = {
        padding: '20px',
        borderRadius: '10px',
        color: 'brand.textBlack',
    }

    return (
        <>
            {/* {isLargerThanLG ? (
                <>
                    <Image src={Clip} alt="clip" position="absolute" top="20%" right="25%" zIndex="-1" />
                    <Image src={Check} alt="check" position="absolute" top="40%" left="20%" zIndex="-1" />
                    <Image src={Clip2} alt="clip2" position="absolute" bottom="10%" right="40%" zIndex="-1" />
                </>
            ) : null} */}

            <Flex

                alignItems="flex-start"
                mt={'300px'}
                // w="full"
                px={isLargerThanLG ? '16' : '6'}
                py="16"
                minHeight="90vh"
                // justifyContent="center"

                color={'brand.textBlack'}

                flexDirection={isLargerThanLG ? 'column' : 'column'}
            >
                <Heading m={'40px 0px'} color={'brand.textDarkPurple'}>Why OpinionLK?</Heading>

                <Grid

                    h='80vh'
                    templateRows='repeat(2, 1fr)'
                    templateColumns={isLargerThanLG ? 'repeat(4, 1fr)' : 'repeat(1, 1fr)'}
                    gap={4}
                >
                    <GridItem colSpan={2} bg='#D3D0FB' sx={gridStyles}>
                        <Grid
                            display={'grid'}
                            padding={'20px'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            templateRows='repeat(1, 1fr)'
                            templateColumns='repeat(3, 1fr)'
                            gap={4}
                        >
                            <GridItem colSpan={2} >
                                <Stack gap={'10px'} direction={'column'}>
                                    <Heading as={'h3'} size={'lg'}>Rewards</Heading>
                                    <Text>
                                        Participants have the opportunity to earn tangible rewards for their time and effort. Whether it's gift cards, discounts, or exclusive offers, we ensure that survey completion is worth their while.
                                    </Text>
                                </Stack>
                            </GridItem>
                            <GridItem colSpan={1}>
                                <Image src={coin}></Image>
                            </GridItem>
                        </Grid>
                    </GridItem>
                    <GridItem colSpan={2} bg='#C5ECE7' sx={gridStyles}>
                        <Grid
                            display={'grid'}
                            padding={'20px'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            templateRows='repeat(1, 1fr)'
                            templateColumns='repeat(3, 1fr)'
                            gap={4}
                        >
                            <GridItem colSpan={2} >
                                <Stack gap={'10px'} direction={'column'}>
                                    <Heading as={'h3'} size={'lg'}>Tailored Surveys</Heading>
                                    <Text>
                                        Say goodbye to generic questionnaires and hello to tailored surveys designed to meet your unique interests and preferences. No more sifting through irrelevant or repetitive questions.
                                    </Text>
                                </Stack>
                            </GridItem>
                            <GridItem colSpan={1}>
                                <Image src={coin}></Image>
                            </GridItem>
                        </Grid>
                    </GridItem>
                    <GridItem colSpan={2} bg='#FEFAD5' sx={gridStyles}>
                        <Grid
                            display={'grid'}
                            padding={'20px'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            templateRows='repeat(1, 1fr)'
                            templateColumns='repeat(3, 1fr)'
                            gap={4}
                        >
                            <GridItem colSpan={2} >
                                <Stack gap={'10px'} direction={'column'}>
                                    <Heading as={'h3'} size={'lg'}>Rewards</Heading>
                                    <Text>
                                        Participants have the opportunity to earn tangible rewards for their time and effort. Whether it's gift cards, discounts, or exclusive offers, we ensure that survey completion is worth their while.
                                    </Text>
                                </Stack>
                            </GridItem>
                            <GridItem colSpan={1}>
                                <Image src={coin}></Image>
                            </GridItem>
                        </Grid>
                    </GridItem>
                    <GridItem colSpan={2} bg='#C5DAAF' sx={gridStyles}>
                        <Grid direction={'rowreverse'}
                            display={'grid'}
                            padding={'20px'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            templateRows='repeat(1, 1fr)'
                            templateColumns='repeat(3, 1fr)'
                            gap={4}
                        >
                            <GridItem colSpan={2} >
                                <Stack gap={'10px'} direction={'column'}>
                                    <Heading as={'h3'} size={'lg'}>Rewards</Heading>
                                    <Text>
                                        Participants have the opportunity to earn tangible rewards for their time and effort. Whether it's gift cards, discounts, or exclusive offers, we ensure that survey completion is worth their while.
                                    </Text>
                                </Stack>
                            </GridItem>
                            <GridItem colSpan={1}>
                                <Image src={coin}></Image>
                            </GridItem>
                        </Grid>

                    </GridItem>
                    {/* <GridItem colSpan={5} bg='tomato' /> */}
                </Grid>
            </Flex>
        </>
    )

}

export default Features