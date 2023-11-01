import {
    Text,
    Box,
    Flex,
    Image,
  } from '@chakra-ui/react';
  
  import SurveyList from '../../components/CommunityManager/ViewAllSurveys';


  function AllSurveyList(){
    // eslint-disable-next-line
    const style = {
        width: '100(%',
        overflow: 'auto',
        height: '100%',
        paddingBottom: '20px',
      };

      return(
        <>
  
<Box>
            <Box>
            <Box>
                
            </Box>
            <Box>
            <Text  pt={15} pb={15} pl={25} color={'black'} fontSize="2xl">
              Surveys All 
            </Text>
            <Box p={5}>
              <SurveyList/>
            </Box>
          </Box>
            </Box>


</Box>


        </>
      );

  }
  export default AllSurveyList;