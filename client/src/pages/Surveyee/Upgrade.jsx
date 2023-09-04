import React from 'react';
import { Box, Grid, GridItem, Button, ButtonGroup, Heading, Flex, UnorderedList, ListItem } from '@chakra-ui/react';

const pricingData = [
  {
    name: 'Free',
    price: '$0',
    features: ['Fill Surveys up to 200 points a month ', 'Share surveys with others', 'View Previously filled surveys','Select any coupon from the rewards based on points'],
  },
  {
    name: 'Basic',
    price: '$5/user/month',
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
  },
  {
    name: 'Pro',
    price: '$15/user/month',
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
  },
];

const Upgrade = () => {
  const style = {
    width: '100%',
    overflow: 'auto',
    height: '100%',
    paddingBottom: '20px',
  };

  return (
    <Box style={style}>
<Heading as="h1" size="lg" mb={4} align='center'>
        Choose a Plan that works for you
      </Heading>      <Grid templateColumns='repeat(3, 1fr)' gap={6}>
        {pricingData.map((plan, index) => (
          <GridItem key={index} w='100%' bg='white' p={4} borderRadius='lg' borderWidth='1px' borderColor='gray.300'>
            <Flex direction='column' align='center'>
              <Heading as='h2' size='md' mb={2}>
                {plan.name}
              </Heading>
              <p textAlign='center' mt={5} mb={10}>{plan.price}</p>
              <UnorderedList mt={4} ml={4} align='left'>
                {plan.features.map((feature, featureIndex) => (
                  <ListItem key={featureIndex}>{feature}</ListItem>
                ))}
              </UnorderedList>
              <Button mt={10} rounded="md" bg="#805AD5" color="white">Select</Button>
            </Flex>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Upgrade;
