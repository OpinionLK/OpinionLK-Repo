import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Text, Input, Button, Flex, Spacer, Checkbox } from '@chakra-ui/react';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function UserProfile() {
    const {
        user, dispatch, userData
    } = useAuthContext();

    const [userInputData, setUserInputData] = useState({});

    const handleInputChange = (event) => {
        setUserInputData({
        ...userInputData,
        [event.target.name]: event.target.value
        });
    };

    const handleSave = () => {
        axios.post('http://localhost:3002/api/user/updateUserData', userInputData, {
            headers: {
                "Authorization": `Bearer ${user.token}`
            },
        })
        .then(response => {
            console.log(response.data);
        })
    .catch(error => {
        console.log(userInputData);
        console.error('Error updating user data:', error);
    });
};

return (
    <Box>
        <Text fontSize="2xl">User Profile</Text>
        <Flex width='100%' height="200px" backgroundImage={"https://ik.imagekit.io/7i3fql4kv7/Backgrounds/profilebg.png?updatedAt=1698689330367"} backgroundSize="cover" direction="row" borderRadius={25} padding={25} columnGap={25} alignItems={'center'}>
            <Box width="150px" height="150px" backgroundColor="darkslategray" borderRadius={150} overflow={'hidden'}>
                <img src={userData?.profilePicture} alt="Profile" />
            </Box>
            <Text fontSize={'xl'} mr={10}  textColor={'white'}>{userData?.firstname} {userData?.lastname}</Text>
        </Flex>
        <Spacer height={30}></Spacer>
        <Box backgroundColor={'#FFF'} borderRadius={25} padding={4} >
            <Text fontSize={'xl'} mr={10}>Account Settings</Text>
            <Flex direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Flex direction={'column'} width="25%">
                    <Text textIndent={2}>First Name</Text>
                    <Input name="name" value={userData?.firstname} onChange={handleInputChange} placeholder="First Name" />
                </Flex><Flex direction={'column'} width="25%">
                    <Text textIndent={2}>Last Name</Text>
                    <Input name="name" value={userData?.lastname} onChange={handleInputChange} placeholder="Last Name" />
                </Flex><Flex direction={'column'} width="25%">
                    <Text textIndent={2}>Email Address</Text>
                    <Input name="email" value={userData?.email} onChange={handleInputChange} placeholder="Email" />
                </Flex>
            </Flex>
            <Spacer height={5}></Spacer>
            <Flex direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Flex direction={'column'} width="25%">
                    <Text textIndent={2}>City</Text>
                    <Input name="city" value={userData?.city} onChange={handleInputChange} placeholder="City" />
                </Flex><Flex direction={'column'} width="25%">
                    <Text textIndent={2}>Town</Text>
                    <Input name="town" value={userData?.town} onChange={handleInputChange} placeholder="Town" />
                </Flex><Flex direction={'column'} width="25%">
                    <Text textIndent={2}>Postal Code</Text>
                    <Input name="postalCode" value={userData?.postal} onChange={handleInputChange} placeholder="Postal Code" />
                </Flex>
            </Flex>
            <Spacer height={5}></Spacer>
            <Flex direction={'row'} columnGap={2}>
                <Checkbox name="mkt" value={userData?.mkt} onChange={handleInputChange}/>
                <Text textIndent={2}>I would like to receive marketing emails</Text>
            </Flex><Flex direction={'row'} columnGap={2}>
                <Checkbox name='notifications' value={userData?.notifications} onChange={handleInputChange}/>
                <Text textIndent={2}>I would like to receive notifications</Text>
            </Flex>
            <Spacer height={5}></Spacer>
            <Button onClick={handleSave}>Save Changes</Button>
        </Box>
    </Box>
  );
};

