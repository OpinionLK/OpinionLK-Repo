import React from "react";
import {
    Box,
    Select,
} from '@chakra-ui/react';
import '../admin.css';

const TableSelect = () => {
    return (
        <Box className="tableSearchMain">
            <Select>
                <option value="all">All</option>
                <option value="community">Community</option>
                <option value="surveyee">Surveyee</option>
                <option value="survey">Survey</option>
            </Select>
        </Box>
    );
    }

export default TableSelect;