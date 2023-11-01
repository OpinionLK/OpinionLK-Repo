import React, { useState } from 'react'
import { 
    Box,
    Heading,
    Text,
    Radio, 
    RadioGroup, 
    Stack, 
    Input,
} from '@chakra-ui/react'


const PreQ = ({userTags, updatePreQResponse, preQResponse}) => {
    const stdQuestions = []
    stdQuestions['gender']= "What is your gender?";
    stdQuestions['age1']= "Which year were you born in?";
    stdQuestions['city']= "Which city do you reside in?";
    stdQuestions['interests']= "Are you interested in: ";
    // console.log(stdQuestions)

    const cityOptions = ['Colombo', 'Galle', 'Mannar', 'Kandy', 'Other'];

    const [formValues, setFormValues] = useState({});

    const handleInputChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
        
        // Create a copy of the current preQResponse
        const updatedPreQResponse = { ...preQResponse };
        
        // Update the copy with the new input data
        updatedPreQResponse[e.target.name] = e.target.value;
      
        // Use the updated copy to set the state
        updatePreQResponse(updatedPreQResponse);
    };

    return (

        <Box
            size='md'
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='elevated'
            p='10'
            // pl='2'
            m='5'
            mt='3'
            // ml='12'
            borderRadius='20'
            bgColor='white'
        >               
            <div>
                {Object.entries(userTags[0]).map(([key, value]) => (
                    stdQuestions[key] && value && (
                    <div key={key} onChange={handleInputChange}>
                        <Box bgColor='#'>
                        <Heading size='sm' mb='2' color={'#2B3674'}>{stdQuestions[key]}</Heading>

                        {key === 'gender' ? (
                        <RadioGroup mb='4' colorScheme='purple' name={key}>
                            <Stack direction="column">
                                <Radio value="Male">Male</Radio>
                                <Radio value="Female">Female</Radio>
                                <Radio value="Other">Other</Radio>
                            </Stack>
                        </RadioGroup>
                        ) : key === 'city' ? (
                        <RadioGroup mb='4' colorScheme='purple' name={key}>
                            <Stack direction="column">
                            {cityOptions.map((option, index) => (
                                <Radio key={index} value={option}>{option}</Radio>
                            ))}
                            </Stack>
                        </RadioGroup>
                        ) : key === 'interests' ? (
                            
                        value.map((interest, index) => (
                            <div key={index}>
                            {/* <Text>{`${stdQuestions[key]} ${interest}?`}</Text> */}
                            <Text ml='4' color={'#2B3674'}>{`${interest.charAt(0).toUpperCase() + interest.slice(1)}?`}</Text>
                            <RadioGroup mb='4' ml='8' colorScheme='purple' name={interest}>
                            {/* <RadioGroup defaultValue="No"> */}
                                <Stack direction="row">
                                <Radio value="Yes">Yes</Radio>
                                <Radio value="No">No</Radio>
                                </Stack>
                            </RadioGroup>
                            </div>
                        ))
                        ) : (
                        <Input mb='4' width='100' name={key} onChange={handleInputChange} type={key === 'age1' ? 'number' : 'text'} />
                        )}
                        </Box>
                    </div>
                    )
                ))}
            </div>
        </Box>

    )
}

export default PreQ