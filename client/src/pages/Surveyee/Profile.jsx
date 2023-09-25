import React from 'react';
import { Box, Flex, Image, Text, Button } from '@chakra-ui/react';
import profileImage from '../../images/profile/Profile Image.png';
import profileBackgroundImage from '../../images/profile/Background Image.png';
import profileComplete from '../../images/profile/profile-complete.png';
import './customerProfile.css';
import { useAuthContext } from '../../hooks/useAuthContext';

const Profile = () => {
  const {
    user, dispatch, userData
  } = useAuthContext();

  return (
    <Box className='profile'>
      <Box className='box'>
        <Box maxW='150px' borderRadius='50%' overflow='hidden' objectfit='cover'>
          <Image src={userData?.profilePicture} />
        </Box>
        <Text as='b'>
          {userData?.firstname}
          {' '}
          {userData?.lastname}
        </Text>
        <Text as='i'>{userData?.email}</Text>
        <Box className='box2'>
          <Box className='deets'>
          <Text as='b' fontSize='36px'>34</Text>
            <Text fontSize='11px'>Surveys Completed</Text>
          </Box>
          <Box className='deets'>
          <Text as='b' fontSize='36px'>14</Text>
            <Text fontSize='11px'>Coupons Won</Text>
          </Box>
          <Box className='deets'>
          <Text as='b' fontSize='36px'>69</Text>
            <Text fontSize='11px'>Bitches acquired</Text>
          </Box>
        </Box>
      </Box>

      <Box className='recentlyfilled'>
        <Text as='b' fontSize='16px'>Recently Filled Surveys</Text>
      </Box>
    </Box>  
  );
};

export default Profile;
