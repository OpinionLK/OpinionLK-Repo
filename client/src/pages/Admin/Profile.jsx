import React from 'react';
import { Box, Flex, Image, Text, Button, Grid, Card, } from '@chakra-ui/react';
import profileImage from '../../images/profile/Profile Image.png';
import profileBackgroundImage from '../../images/profile/Background Image.png';
import profileComplete from '../../images/profile/profile-complete.png';
import './customerProfile2.css';
import DocumentScanner from './DocumentScanner';

const Admindashboard = () => {
  return (
    <Box>
        <Box >
          <Flex className="profileMain" mb={'20px'}>
            <Grid className="grid_tl" templateColumns="repeat(3, 1fr)" gap={'20px'}>
              <Card className="card_tl" borderRadius={'20PX'} w={'auto'}>
              <Box className="medium-profile">
              <Box className="background1">
                <Image
                  className="background-image-icon"
                  alt=""
                  src={profileBackgroundImage}
                />
              </Box>
              <Box className="user">
                <Text className="adam-cole">Adam Cole</Text>
                <Text className="product-designer">Product Designer</Text>
              </Box>
              <Flex className="features">
                <Flex className="followers">
                  <Text className="b">274</Text>
                  <Text className="following">Following</Text>
                </Flex>
                <Flex className="followers1">
                  <Text className="k">9.7k</Text>
                  <Text className="following">Followers</Text>
                </Flex>
                <Flex className="followers3">
                  <Text className="b1">17</Text>
                  <Text className="surveys">Surveys</Text>
                </Flex>
              </Flex>
              <Image className="avatar-icon" alt="" src={profileImage} />
              </Box>
              </Card>

              <Card className="card_tr" borderRadius={'20PX'} width={'100%'}>
              <Box className="large-dropzone2" width={'520px'}>
              
              <DocumentScanner />
            </Box>
              </Card>  
            </Grid>
          </Flex>

          <Flex className="large-check-table-parent">
          <Grid className="grid_bl" templateColumns="repeat(2, 1fr)" gap={'20px'} width={'100%'}>
            <Card className="card_bl" borderRadius={'20PX'}>
            <Box className="large-check-table" width={'100%'}>
              <Text className="title3">Personal Information</Text>
              <Box className="content">
                <Box className="education">
                  <Text className="first-name">First name</Text>
                  <Text className="adam">Adam</Text>
                </Box>
                <Box className="languages">
                  <Text className="first-name">Second name</Text>
                  <Text className="adam">Cole</Text>
                </Box>
                <Box className="department">
                  <Text className="gender">Gender</Text>
                  <Text className="adam">Male</Text>
                </Box>
                <Box className="work-history">
                  <Text className="first-name">Date of birth</Text>
                  <Text className="adam">20 July 1986</Text>
                </Box>
                <Box className="organization">
                  <Text className="nationality">Nationality</Text>
                  <Text className="polish">Polish</Text>
                </Box>
                <Box className="birthday">
                  <Text className="first-name">Occupation</Text>
                  <Text className="adam">Engineer</Text>
                </Box>
              </Box>
              <Box className="content1">
                <Box className="department">
                  <Text className="first-name">Education</Text>
                  <Text className="adam">Stanford University</Text>
                </Box>
                <Box className="languages1">
                  <Text className="first-name">Languages</Text>
                  <Text className="adam">English, Spanish, Italian</Text>
                </Box>
                <Box className="organization">
                  <Text className="first-name">City</Text>
                  <Text className="adam">Budapest</Text>
                </Box>
                <Box className="work-history1">
                  <Text className="educational-level">Educational level:</Text>
                  <Text className="adam">MSc</Text>
                </Box>
              </Box>
            </Box>
            </Card>


            <Card className="card_br" borderRadius={'20PX'}>
            <Box className="large-check-table1">
              <Box className="title4">
                <Text className="change-your-password">
                  Additional Information
                </Text>
              </Box>
              <Box className="description">
                <Text className="as-we-live">
                  {/* As we live, our hearts turn colder. Cause pain is what we go
                  through as we become older. We get insulted by others, lose
                  trust for those others. We get back stabbed by friends. It
                  becomes harder for us to give others a hand. We get our heart
                  broken by people we love, even that we give them all... */}
                  For enhance the experience in OpinionLk we are collecting some
                  additional information about you, your background and your
                  interests. This will helps to improve the suggestions more accurate 
                  and make you feel better when you using OpinionLK. Those information 
                  will may be public but will not use in any commercial activities.
                </Text>
              </Box>
              <Box className="content2">
                <Box className="education3">
                  <Text className="first-name">Education</Text>
                  <Text className="adam">Stanford University</Text>
                </Box>
                <Box className="languages3">
                  <Text className="first-name">Languages</Text>
                  <Text className="adam">English, Spanish, Italian</Text>
                </Box>
                <Box className="department2">
                  <Text className="first-name">Department</Text>
                  <Text className="adam">Product Design</Text>
                </Box>
                <Box className="work-history2">
                  <Text className="first-name">Work History</Text>
                  <Text className="adam">Google, Facebook</Text>
                </Box>
                <Box className="organization1">
                  <Text className="first-name">Organization</Text>
                  <Text className="adam">Simmmple Web LLC</Text>
                </Box>
                <Box className="birthday1">
                  <Text className="first-name">Birthday</Text>
                  <Text className="adam">20 July 1986</Text>
                </Box>
              </Box>
            </Box>
            </Card>
          </Grid>
          </Flex>
        </Box>
        </Box>
  );
};

export default Admindashboard;
