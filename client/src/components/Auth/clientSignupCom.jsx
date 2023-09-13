import {React, useState} from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  HStack,
  VStack,
  Flex,
} from '@chakra-ui/react';
import axios from 'axios';

export const OrganizationSignUp = ({activeStep, setActiveStep, orgFormData, setOrgFormData}) => {
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrgFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {

      e.preventDefault();
      const data = new FormData(e.target);
      const orgName = data.get('orgName');
      const orgAddressLine1 = data.get('orgAddressLine1');
      const orgAddressLine2 = data.get('orgAddressLine2');
      const orgCity = data.get('orgCity');
      const orgState = data.get('orgState');
      const orgZip = data.get('orgZip');
      const orgPhone = data.get('orgPhone');
      const orgEmail = data.get('orgEmail');
      const orgWebsite = data.get('orgWebsite');



      if (!orgName || !orgAddressLine1 || !orgCity || !orgState || !orgZip || !orgPhone || !orgEmail) {
        alert('Please fill all the required fields');
        return;
      }

      if (orgPhone.length !== 10) {
        alert('Please enter a valid phone number');
        return;
      }

      if (orgZip.length !== 5) {
        alert('Please enter a valid zip code');
        return;
      }

      if (orgEmail.indexOf('@') === -1) {
        alert('Please enter a valid email');
        return;
      }

      setOrgFormData({
        orgName,
        orgAddressLine1,
        orgAddressLine2,
        orgCity,
        orgState,
        orgZip,
        orgPhone,
        orgEmail,
        orgWebsite,
      });

      console.log('Organization Data Submitted');

    setActiveStep(activeStep + 1);
      console.log("Organization Details");

    }
    
  return (
    <Stack spacing={4}>
      <form onSubmit={handleSubmit} method="POST">
        <Flex direction="column" justify="space-between" gap={'20px'}>
          <HStack spacing={4}>
            <FormControl id="orgName" isRequired>
              <FormLabel>Organization Name</FormLabel>
              <Input type="text" name='orgName' value={orgFormData.orgName || ''} onChange={handleInputChange}/>
            </FormControl>
            <FormControl id="orgWebsite">
              <FormLabel>Organization Website</FormLabel>
              <Input type="text" name='orgWebsite' value={orgFormData.orgWebsite || ''} onChange={handleInputChange}/>
            </FormControl>
          </HStack>
          <VStack spacing={4}>
            <FormControl id="orgAddress" isRequired>
              <FormLabel>Organization Address</FormLabel>
              <Input mb={'10px'} type="text" name='orgAddressLine1' value={orgFormData.orgAddressLine1 || ''} onChange={handleInputChange}/>
              <Input type="text" name='orgAddressLine2' value={orgFormData.orgAddressLine2 || ''} onChange={handleInputChange}/>
            </FormControl>
          </VStack>
          <HStack spacing={4}>
            <FormControl id="orgCity" isRequired>
              <FormLabel>Organization City</FormLabel>
              <Input type="text" name='orgCity' value={orgFormData.orgCity || ''} onChange={handleInputChange}/>
            </FormControl>
            <FormControl id="orgState" isRequired>
              <FormLabel>Organization State</FormLabel>
              <Input type="text" name='orgState' value={orgFormData.orgState || ''} onChange={handleInputChange}/>
            </FormControl>
          </HStack>
          <HStack spacing={4}>
            <FormControl id="orgZip" isRequired>
              <FormLabel>Organization Zip</FormLabel>
              <Input type="text" name='orgZip' value={orgFormData.orgZip || ''} onChange={handleInputChange}/>
            </FormControl>
            <FormControl id="orgPhone" isRequired>
              <FormLabel>Organization Phone</FormLabel>
              <Input type="number" name='orgPhone' value={orgFormData.orgPhone || ''} onChange={handleInputChange}/>
            </FormControl>
          </HStack>
          <HStack spacing={4}>
            <FormControl id="orgEmail" isRequired>
              <FormLabel>Organization Email</FormLabel>
              <Input type="email" name='orgEmail' value={orgFormData.orgEmail || ''} onChange={handleInputChange}/>
            </FormControl>
          </HStack>
            <Button
              alignSelf={'flex-end'}
              width={'100px'}
              colorScheme="blue"
              type="submit"
              // onClick={handleSubmit}
              onClick={() => setActiveStep(activeStep + 1)}
              >
              Next
            </Button>
          </Flex>
        </form>
    </Stack>
  );
};


console.log('Client Data Submitted');

export const ClientData = ({activeStep, setActiveStep, clientFormData, setClientFormData}) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const firstName = data.get('firstName');
        const lastName = data.get('lastName');
        const position = data.get('position');
        const department = data.get('department');
        const phone = data.get('phone');
        const nic = data.get('nic');

        if (!firstName || !lastName || !position || !department || !phone || !nic) {
          alert('Please fill all the required fields');
          return;
        }

        if (phone.length !== 10) {
          alert('Please enter a valid phone number');
          return;
        }

        const nicValidation = /^[0-9]{9}(v|V)?$/; 
        const nicValidation12 = /^[0-9]{12}$/; 

        if (!nicValidation.test(nic) && !nicValidation12.test(nic)) {
          alert('Please enter a valid NIC');
          return;
        }

        if (nic.length !== 10 && nic.length !== 12) {
          alert('Please enter a valid NIC');
          return;
        }


        setClientFormData({
          firstName,
          lastName,
          position,
          department,
          phone,
          nic,
        });

        console.log('Client Data Submitted');
        setActiveStep(activeStep + 1);

    }
    
  return (
    <Stack spacing={4}>
        <form onSubmit={handleSubmit} method="POST">
      <HStack spacing={4}>
        <FormControl id="firstName" isRequired>
          <FormLabel>First Name</FormLabel>
          <Input name="firstName" type="text" value={clientFormData.firstName || ''} onChange={handleInputChange}/>
        </FormControl>
        <FormControl id="lastName" isRequired>
          <FormLabel>Last Name</FormLabel>
          <Input name="lastName" type="text" value={clientFormData.lastName || ''} onChange={handleInputChange}/>
        </FormControl>
      </HStack>
      <HStack spacing={4}>
        <FormControl id="position" isRequired>
            <FormLabel>Position</FormLabel>
            <Input name="position" type="text" value={clientFormData.position || ''} onChange={handleInputChange}/>
        </FormControl>
        <FormControl id="department" isRequired>
            <FormLabel>Department</FormLabel>
            <Input name="department" type="text" value={clientFormData.department || ''} onChange={handleInputChange}/>
        </FormControl>
        </HStack>
        <HStack spacing={4}>
        <FormControl id="phone" isRequired>
            <FormLabel>Phone</FormLabel>
            <Input name="phone" type="text" value={clientFormData.phone || ''} onChange={handleInputChange}/>
        </FormControl>
        <FormControl id="nic" isRequired>
            <FormLabel>NIC</FormLabel>
            <Input name="nic" type="text" value={clientFormData.nic || ''} onChange={handleInputChange}/>
        </FormControl>
        </HStack>
        <HStack mt={5} spacing={4} justifyContent={'flex-end'}>
            <Button 
              alignSelf={'flex-end'} 
              colorScheme="red" 
              onClick={() => setActiveStep(activeStep - 1)}
              >
              Previous
            </Button>
            <Button
              alignSelf={'flex-end'}
              width={'100px'}
              colorScheme="blue"
              type="submit"
              onClick={() => setActiveStep(activeStep + 1)}
              >
              Next
            </Button>
          </HStack>
        </form>
    </Stack>
  );
};

export const ClientSignUp = ({setActiveStep, orgFormData, clientFormData, activeStep, clientSignUpData, setClientSignUpData}) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientSignUpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const email = data.get('email');
    const password = data.get('password');
    const confirmPassword = data.get('confirmPassword');

    if (!email || !password || !confirmPassword) {
      alert('Please fill all the required fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    setClientSignUpData({
      email,
      password,
      confirmPassword,
    });

    const response = await axios.post('http://opinionlk.azurewebsites.net:3002/api/client/signup', {
        ...orgFormData,
        ...clientFormData,
        email,
        password,
        confirmPassword,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Organization and Client Data:', orgFormData, clientFormData);
      
      console.log(response);
      const responseData = response.data; // Access parsed data directly
      console.log('User created successfully');
      console.log(responseData);
      setActiveStep((prevStep) => prevStep + 1);
  }


  return (
    <Stack spacing={4}>
        <form onSubmit={handleSubmit} method="POST">
        <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input name="email" type="text" value={clientSignUpData.email || ''} onChange={handleInputChange}/>
        </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input name="password" type="password" value={clientSignUpData.password || ''} onChange={handleInputChange}/>
      </FormControl>
      <FormControl id="confirmPassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <Input name="confirmPassword" type="password" value={clientSignUpData.confirmPassword || ''} onChange={handleInputChange}/>
      </FormControl>

      <HStack mt={5} spacing={4} justifyContent={'flex-end'}>
            <Button 
              alignSelf={'flex-end'} 
              colorScheme="red" 
              onClick={() => setActiveStep(activeStep - 1)}
              >
              Previous
            </Button>
            <Button
              alignSelf={'flex-end'}
              width={'100px'}
              colorScheme="blue"
              type="submit"
            >
              Sign Up
            </Button>
          </HStack>
        </form>
    </Stack>
  );
};
