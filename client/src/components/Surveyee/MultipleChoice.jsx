// import useFormContext from "../../hooks/useFormContext"
import React from 'react'

// import './style.css'

import { 
    Stack,
    Box,
    Heading,
    Radio, 
    RadioGroup,
} from '@chakra-ui/react'

// const ShortAnswer = () => {
//     const [value, setValue] = React.useState('1')
//     const { data, handleChange } = useFormContext()
//     return (

//         <Box
//             size='md'
//             direction={{ base: 'column', sm: 'row' }}
//             overflow='hidden'
//             variant='elevated'
//             p='5'
//             borderRadius='20'
//             // width='253px'
//             // align='center'
//             bgColor='white'
//         >
//             <Heading size='md' color={'#2B3674'} mb='5'>Slaves should be free?</Heading>
//             <RadioGroup colorScheme='purple' color='#2F2E41' onChange={setValue} value={value}>
//                 <Stack direction='column'>
//                     <Radio value='1'>Yes</Radio>
//                     <Radio value='2'>Ye</Radio>
//                     <Radio value='3'>Aye</Radio>
//                 </Stack>
//             </RadioGroup>
//         </Box>

//     )
// }
const MultipleChoice = ({ question, options, selectedValue, onChange }) => {
  // console.log(options)
  return (
    <Box
      size='md'
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='elevated'
      p='5'
      m='5'
      borderRadius='20'
      bgColor='white'
    >
      <Heading size='md' color={'#2B3674'} mb='5'>
        {question}
      </Heading>
      <RadioGroup
        colorScheme='purple'
        color='#2F2E41'
        onChange={(event) => {
          const selectedLabel = event.target ? event.target.textContent : event; // Extract the label text
          onChange(selectedLabel); // Notify the parent component of the selected label
        }}
        value={selectedValue}
      >
        <Stack direction='column'>
          {options.map((option) => (
            <Radio key={option.value} value={option.label}>
              {option.label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </Box>
  );
};

export default MultipleChoice