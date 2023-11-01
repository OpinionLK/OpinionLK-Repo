import React, { } from 'react';
import { Tag, TagLabel, Flex, VStack, Heading } from '@chakra-ui/react';

const options = ['Music', 'Movies', 'Sports', 'Travel', 'Cooking', 'Reading', 'Gaming', 'Art', 'Fashion', 'Fitness', 'Photography', 'Dance', 'Politics', 'Technology', 'Science', 'History', 'Nature', 'Animals', 'Food', 'Cars', 'Business', 'Education', 'Health', 'Lifestyle', 'Beauty', 'DIY', 'Home', 'Gardening', 'Parenting', 'Relationships', 'Spirituality', 'Religion', 'Culture', 'Languages', 'News', 'Entertainment', 'Comedy', 'Finance', 'Shopping', 'Social Media', 'Other'];

function InterestTags(
    { selectedOptions, setSelectedOptions }
) {
    const handleSelect = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        } else if (selectedOptions.length < 5) {
            setSelectedOptions([...selectedOptions, option]);
        } else {
            alert('You can only select up to 5 interests');
        }
    };

    return (
        <VStack gap={'50px'}>
            <Heading size={'md'}>
                Select up to 5 relevent areas for your survey
            </Heading>
            <Flex gap="5px" flexWrap={
                "wrap"
            }>
                {options.map((option) => (
                    <Tag
                        _hover={
                            {
                                bg: "#dbd9ff",
                                color: "brand.darkPurple",
                                cursor: "pointer",
                            }
                        }
                        size="lg"
                        key={option}

                        variant={selectedOptions.includes(option) ? "solid" : "outline"}
                        colorScheme={selectedOptions.includes(option) ? 'purple' : 'purple'}
                        onClick={() => handleSelect(option)}
                    >
                        <TagLabel>{option}</TagLabel>
                    </Tag>
                ))}
            </Flex>
        </VStack>
    );
}

export default InterestTags;
