import React from 'react'

import {
    Box,
    Flex,
    Spacer,
    SimpleGrid,
    Stat,
    useMediaQuery
} from '@chakra-ui/react'


import StatCard from './StatCard';


const StatRow = () => {
    const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');
    return (
        // <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
        //     <StatCard/>
        //     <StatCard/>
        //     <StatCard/>
        //     <StatCard/>
        //     <StatCard/>
        //     <StatCard/>
        // </SimpleGrid>
        <Flex
            flexDirection={isLargerThanLG ? 'row' : 'column'}
            justifyContent='space-between'
            // keep a 20px gap between each card and adjust card lengths based on that
        >
            <StatCard/>
            {/* <Spacer/> */}
            <StatCard/>
            {/* <Spacer/> */}
            <StatCard/>
            {/* <Spacer/> */}
            <StatCard/>
            {/* <Spacer/> */}
            <StatCard/>
            {/* <Spacer/> */}
            <StatCard/>
        </Flex>
    )
}

export default StatRow