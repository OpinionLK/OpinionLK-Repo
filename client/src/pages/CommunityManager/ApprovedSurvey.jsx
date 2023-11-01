import {
    Text,
    Box,
  } from '@chakra-ui/react';
  
  import ApprovedSurveyList from '../../components/CommunityManager/ViewApprovedSurvey';

  function ApprovedSurvey(){
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
            <Text  pt={15} pb={15} pl={25} color={'black'} fontSize="2xl">
              Supervisor Revision Requests
            </Text>
            <Box p={5}>
              <ApprovedSurveyList></ApprovedSurveyList>
            </Box>
          </Box>
            </Box>


</Box>


        </>
      );

  }
  export default ApprovedSurvey;