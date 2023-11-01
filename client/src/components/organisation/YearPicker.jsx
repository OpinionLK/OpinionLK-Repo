import React, { useState } from 'react';
import { FormLabel, HStack, Select, Checkbox } from '@chakra-ui/react';

const AgeRangePicker = ({ disabled, setFromYear, setToYear, fromYear, toYear }) => {
  const [filterByBirthYear, setFilterByBirthYear] = useState(true);
  const currentYear = new Date().getFullYear();
  const minBirthYear = currentYear - 100; // Adjust the minimum age as needed
  const maxBirthYear = currentYear - 18;

  if (filterByBirthYear) {
    setFromYear(minBirthYear);
    setToYear(maxBirthYear);
  } else {
    setFromYear(0);
    setToYear(0);
  }

  const years = Array.from(
    { length: maxBirthYear - minBirthYear + 1 },
    (v, k) => maxBirthYear - k
  );

  const handleFromYearChange = (e) => {
    const selectedFromYear = parseInt(e.target.value);
    if (selectedFromYear >= toYear) {
      setFromYear(selectedFromYear);
    }
  };

  const handleToYearChange = (e) => {
    const selectedToYear = parseInt(e.target.value);
    if (selectedToYear <= fromYear) {
      setToYear(selectedToYear);
    }
  };

  const calculateAge = (birthYear) => {
    const age = currentYear - birthYear;
    return age;
  };

  return (
    <HStack>
      <Checkbox isChecked={!filterByBirthYear} onChange={(e) =>
      
         setFilterByBirthYear(!e.target.checked)}>
        Don't filter by birth year
      </Checkbox>

      <FormLabel>Minimum Age:</FormLabel>
      <Select disabled={disabled || !filterByBirthYear} value={fromYear} onChange={handleFromYearChange}>
        {years.map((year) => (
          <option key={year} value={year}>
            {calculateAge(year)} years
          </option>
        ))}
      </Select>

      <FormLabel>Maximum Age:</FormLabel>
      <Select disabled={disabled || !filterByBirthYear} value={toYear} onChange={handleToYearChange}>
        {years.map((year) => (
          <option key={year} value={year}>
            {calculateAge(year)} years
          </option>
        ))}
      </Select>
    </HStack>
  );
};

export default AgeRangePicker;
