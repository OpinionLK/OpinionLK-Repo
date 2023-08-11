import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  HStack,
  useSteps,
} from '@chakra-ui/react';
import axios from 'axios';

export const OrganizationSignUp = () => {
  const { setActiveStep } = useSteps();

  

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Organization Details");
        const data = new FormData(e.target);
        const orgName = data.get('orgName');
        const orgAddress = data.get('orgAddress');
        const orgCity = data.get('orgCity');
        const orgState = data.get('orgState');
        const orgZip = data.get('orgZip');
        const orgPhone = data.get('orgPhone');
        const orgEmail = data.get('orgEmail');
        const orgWebsite = data.get('orgWebsite');
        
        const response = await axios.post('http://localhost:3002/api/client/signup', {
            orgName,
            orgAddress,
            orgCity,
            orgState,
            orgZip,
            orgPhone,
            orgEmail,
            orgWebsite,
          }, {
            headers: { 'Content-Type': 'application/json' },
          });
          
        const json = await response.json();
        console.log('User created successfully');
        console.log(json);
    }
    

  return (
    <Stack spacing={4}>
        <form onSubmit={handleSubmit} method="POST">
      <HStack spacing={4}>
        <FormControl id="orgName" isRequired>
          <FormLabel>Organization Name</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl id="orgAddress" isRequired>
          <FormLabel>Organization Address</FormLabel>
          <Input type="text" />
        </FormControl>
      </HStack>
      <HStack spacing={4}>
        <FormControl id="orgCity" isRequired>
          <FormLabel>Organization City</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl id="orgState" isRequired>
          <FormLabel>Organization State</FormLabel>
          <Input type="text" />
        </FormControl>
      </HStack>
      <HStack spacing={4}>
        <FormControl id="orgZip" isRequired>
          <FormLabel>Organization Zip</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl id="orgPhone" isRequired>
          <FormLabel>Organization Phone</FormLabel>
          <Input type="text" />
        </FormControl>
      </HStack>
      <HStack spacing={4}>
        <FormControl id="orgEmail" isRequired>
          <FormLabel>Organization Email</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl id="orgWebsite">
          <FormLabel>Organization Website</FormLabel>
          <Input type="text" />
        </FormControl>
      </HStack>
      <Button
        colorScheme="blue"
        type="submit"
        onClick={() => setActiveStep((prevStep) => prevStep + 1)}
      >
        Next
      </Button>
        </form>
    </Stack>
  );
};

export const ClientData = () => {
    const { setActiveStep } = useSteps();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const firstName = data.get('firstName');
        const lastName = data.get('lastName');
        const position = data.get('position');
        const department = data.get('department');
        const phone = data.get('phone');
        const nic = data.get('nic');

        const response = await axios.post('http://localhost:3002/api/client/signup/ClientData/', {
            firstName,
            lastName,
            position,
            department,
            phone,
            nic,
          }, {
            headers: { 'Content-Type': 'application/json' },
          });
          
        const json = await response.json();
        console.log('User created successfully');
        console.log(json);
    }
    
  return (
    <Stack spacing={4}>
        <form onSubmit={handleSubmit} method="POST">
      <HStack spacing={4}>
        <FormControl id="firstName" isRequired>
          <FormLabel>First Name</FormLabel>
          <Input name="firstName" type="text" />
        </FormControl>
        <FormControl id="lastName" isRequired>
          <FormLabel>Last Name</FormLabel>
          <Input name="lastName" type="text" />
        </FormControl>
      </HStack>
      <HStack spacing={4}>
        <FormControl id="position" isRequired>
            <FormLabel>Position</FormLabel>
            <Input name="position" type="text" />
        </FormControl>
        <FormControl id="department" isRequired>
            <FormLabel>Department</FormLabel>
            <Input name="department" type="text" />
        </FormControl>
        </HStack>
        <HStack spacing={4}>
        <FormControl id="phone" isRequired>
            <FormLabel>Phone</FormLabel>
            <Input name="phone" type="text" />
        </FormControl>
        <FormControl id="nic" isRequired>
            <FormLabel>NIC</FormLabel>
            <Input name="nic" type="text" />
        </FormControl>
        </HStack>
      <Button colorScheme="blue" type="submit" onClick={() => setActiveStep((prevStep) => prevStep + 1)}>
        Next
      </Button>
        </form>
    </Stack>
  );
};

export const ClientSignUp = () => {
    const { setActiveStep } = useSteps();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const email = data.get('email');
        const password = data.get('password');

        const response = await axios.post('http://localhost:3002/api/client/signup/ClientSignUp/', {
            email,
            password,
          }, {
            headers: { 'Content-Type': 'application/json' },
          });
          
        const json = await response.json();
        console.log('User created successfully');
        console.log(json);
    }

  return (
    <Stack spacing={4}>
        <form onSubmit={handleSubmit} method="POST">
        <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input name="email" type="text" />
        </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input name="password" type="password" />
      </FormControl>

      <Button colorScheme="blue" type="submit" onClick={() => setActiveStep((prevStep) => prevStep + 1)}>
        Sign Up
      </Button>
        </form>
    </Stack>
  );
};
