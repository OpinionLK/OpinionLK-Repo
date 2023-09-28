import {
    Flex,
    Heading,
    Card,
    CardHeader,
    CardBody,
    Button,
    IconButton,
    FormControl,
    Input,
    VStack,
    Box,
    Alert,
    AlertIcon,
    FormLabel,
    HStack,
    Stack,
    Divider,
    CardFooter,
  } from '@chakra-ui/react';
  
  import React, { useEffect, useState } from 'react';
  import { CloseIcon } from '@chakra-ui/icons';
  import Modal from 'react-modal';
  import axios from 'axios';
  import AddComManager from './AddComManager'
  import AddCoupon from '../Components/AddCoupon'
  
  
  const QuickActions = () => {
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
  