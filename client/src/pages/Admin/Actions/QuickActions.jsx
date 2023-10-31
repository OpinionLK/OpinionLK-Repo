import {
    Flex,
    Heading,
    Card,
    CardHeader,
    CardBody,
    Box,
    Alert,
    AlertIcon,
    Stack,
    Divider,
    CardFooter,
  } from '@chakra-ui/react';
  
  import React, { useState } from 'react'; 
  import AddComManager from './AddComManager'
  import AddCoupon from '../Components/AddCoupon'
  
  const QuickActions = () => {
    // eslint-disable-next-line
    const [isSuccess, setIsSuccess] = useState(false);
  
    return (
      <>
          <Flex>
            <Stack width={'100%'}>
              <Card borderRadius={'20px'} width={'100%'}>
                <CardHeader>
                  <Heading size={'md'}>Quick Actions</Heading>
                </CardHeader>
                <hr></hr>
                <CardBody>

                  <Flex mb={'5px'} display={'flex'} flexDirection={'column'} gap={2}> 
                    <AddComManager />
                    <Divider />
                    <AddCoupon />
                  </Flex>

                </CardBody>
                <CardFooter>
                  {isSuccess && (
                    <Box color="green.500" mt={2} mb={2} width="50%">
                      <Alert
                        status="success"
                        variant="subtle"
                        fontSize="md"
                        borderRadius="5px"
                      >
                        <AlertIcon />
                        User created successfully.
                      </Alert>
                    </Box>
                  )}
                </CardFooter>
              </Card>
            </Stack>
          </Flex>
      </>
    );
  };
  
  export default QuickActions;
  