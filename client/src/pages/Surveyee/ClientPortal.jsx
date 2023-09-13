import React from 'react'
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
  Heading

} from '@chakra-ui/react'
import { useParams } from 'react-router-dom';

const ClientPortal = () => {
  const { id } = useParams();

  return (
    <>
      <div><Text fontWeight={'semibold'}>Recommended Surveys</Text></div>
      <div>{id}</div>
      <Divider colorScheme="blackAlpha" />
      <Flex>
        <Card maxW='sm' size=''>
          <CardBody>
            <Image
              src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
              alt='Green double couch with wooden legs'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Heading size='md'>Living room Sofa</Heading>
              <Text>
                By MMCA Sri Lanka
              </Text>
              <Text color='blue.600' fontSize='2xl'>
                $450
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing='2'>
              <Button variant='solid' colorScheme='blue'>
                Buy now
              </Button>
              <Button variant='ghost' colorScheme='blue'>
                Add to cart
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </Flex>
    </>
  )
}

export default ClientPortal