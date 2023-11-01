import React from "react";

import {
    Grid,
    Box,
} from '@chakra-ui/react';
import SurveyHistory from "./Components/SurveyHistory";
import CouponHistory from "./Components/CouponHistory";

const History = () => {
    return (
        <><Box mt={-5} >
        <Grid mt={-5} templateColumns="repeat(3, 1fr)" gap={6}>
            <SurveyHistory />
            <CouponHistory />
        </ Grid>
        </Box>
        </>
    );
}

export default History;