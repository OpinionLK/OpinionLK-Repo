import React from 'react'

import {
    Grid,
    useMediaQuery
} from '@chakra-ui/react'


import StatCard from './StatCard';


const StatRow = () => {

    const TopStatCardGrid = {
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        '&::-webkit-scrollbar': {
            width: '0px',
            background: 'transparent',
            display: 'none',
        },
        padding: '3px 2px',
    }

    const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');
    return (
        <Grid style={TopStatCardGrid} overflow={'auto'} templateColumns="repeat(7, 1fr)" gap={4}>
            <StatCard/>
            <StatCard/>
            <StatCard/>
            <StatCard/>
            <StatCard/>
            {/* <StatCard/>
            <StatCard/> */}
        </Grid>
    )
}

export default StatRow