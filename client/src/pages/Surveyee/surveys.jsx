import React, { useState } from 'react';
import {
  Divider,
  Flex,
  Text,
  Card,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  Image,
  Stack,
  Heading,
  Box,
  Input,
  Grid,
  GridItem, // Import GridItem
} from '@chakra-ui/react';

const initialSurveys = [
  {
    title: 'State of education in the country',
    description:
      'This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned spaces and for people who love a chic design with a sprinkle of vintage design.',
    price: '$450',
    imageUrl:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
  },
  {
    title: 'Washing soap or liquid ? ',
    description:
      'This sofa is perfect for modern tropical spaces, baroque inspired spaces',
    price: '$450',
    imageUrl:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
  },
  {
    title: 'Living room Sofa 3',
    description:
      'This sofa is perfect for modern tropical spaces, baroque inspired spaces',
    price: '$450',
    imageUrl:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
  },
  {
    title: 'Living room Sofa 4',
    description:
      'This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned spaces and for people who love a chic design with a sprinkle of vintage design.',
    price: '$450',
    imageUrl:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
  },
];

const Survey = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Implement your filtering logic here
  };

  return (
    <>
      <Box style={style}>
        <Heading as="h1" size="lg" mb={4} align='left'>
          Recommended Surveys
        </Heading>
        <Input
          w='80%'
          type='text'
          placeholder='Search surveys...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          mb={4}
        />
        <Grid templateColumns='repeat(4, 1fr)' gap={4}> {/* Specify the grid layout */}
          {initialSurveys.map((survey, index) => (
            <GridItem key={index}>
              <Card maxW='sm'>
                <CardBody>
                  <Image
                    src={survey.imageUrl}
                    alt={survey.title}
                    borderRadius='sm'
                  />
                  <Stack mt='6' spacing='3'>
                    <Heading size='md'>{survey.title}</Heading>
                    <Text>{survey.description}</Text>
                    <Text color='blue.600' fontSize='2xl'>
                      {survey.price}
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing='2'>
                    <Button variant='solid' bg="#805AD5" color="white">
                      Buy now
                    </Button>
                    <Button variant='ghost' bg="#805AD5" color="white">
                      Add to cart
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </>
  );
};

const style = {
  width: '100%',
  overflow: 'auto',
  height: '100%',
  paddingBottom: '20px',
};

export default Survey;
