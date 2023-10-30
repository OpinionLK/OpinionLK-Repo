import React, { useState } from 'react';
import {
    FormLabel, HStack, Select
} from '@chakra-ui/react';

const YearPicker = () => {
    const currentYear = new Date().getFullYear();
    const [fromYear, setFromYear] = useState(currentYear);
    const [toYear, setToYear] = useState(currentYear);

    const years = Array.from({ length: currentYear - 1900 + 1 }, (v, k) => k + 1900);

    const handleFromYearChange = (e) => {
        const selectedFromYear = parseInt(e.target.value);
        if (selectedFromYear <= toYear) {
            setFromYear(selectedFromYear);
        }
    };

    const handleToYearChange = (e) => {
        const selectedToYear = parseInt(e.target.value);
        if (selectedToYear >= fromYear) {
            setToYear(selectedToYear);
        }
    };

    return (
        <HStack>

            <FormLabel>From Year:</FormLabel>
            <Select value={fromYear} onChange={handleFromYearChange}>
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </Select>

            <FormLabel>To Year:</FormLabel>
            <Select value={toYear} onChange={handleToYearChange}>
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </Select>
        </HStack>
    );
};

export default YearPicker;
