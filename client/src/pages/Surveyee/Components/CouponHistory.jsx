import React from "react";

import {
    Grid,
    Box,
    Card,
} from '@chakra-ui/react';

const CouponHistory = () => {
    return (
        <><Box mt={-5} >
            <Card borderRadius={10}>
                <Grid mt={-5} templateColumns="repeat(3, 1fr)" gap={6}>
                    <h1> Coupon History </h1>
                </ Grid>
            </Card>
        </Box>
        </>
    );
}

export default CouponHistory;