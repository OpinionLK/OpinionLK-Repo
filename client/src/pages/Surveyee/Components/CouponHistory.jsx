import React from "react";

import {
    Grid,
    Box,
    Card,
    Heading,
    Divider,
} from '@chakra-ui/react';

const CouponHistory = () => {
    return (
        <><Box>
            <Card borderRadius={10}>
                <Heading size={'md'}>Coupon History</Heading>
                <Divider />
            </Card>
        </Box>
        </>
    );
}

export default CouponHistory;