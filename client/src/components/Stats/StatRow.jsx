import React from 'react'

import {
    Box,
    Flex,
    Spacer,
    SimpleGrid,
    Stat
} from '@chakra-ui/react'


import StatCard from './StatCard';

const StatRow = () => {
    return (
        // <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
        //     <StatCard/>
        //     <StatCard/>
        //     <StatCard/>
        //     <StatCard/>
        //     <StatCard/>
        //     <StatCard/>
        // </SimpleGrid>
        <Flex>
            <StatCard/>
            <Spacer/>
            <StatCard/>
            <Spacer/>
            <StatCard/>
            <Spacer/>
            <StatCard/>
            <Spacer/>
            <StatCard/>
            <Spacer/>
            <StatCard/>
        </Flex>
    )
}

export default StatRow