import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box textAlign="center" mt={10}>
      <Text fontSize="4xl" fontWeight="bold" mb={4}>
        404 - Page Not Found
      </Text>
      <Text fontSize="xl" mb={6}>
        Oops! Looks like the page you are trying to access doesn't exist.
      </Text>
      <Button colorScheme="teal" as={Link} to="/">
        Go back to Home
      </Button>
    </Box>
  );
};

export default NotFound;
