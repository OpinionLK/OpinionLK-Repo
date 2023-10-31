import {
    Text,
    Box,
  } from '@chakra-ui/react';
  

  import AcceptRequestTable from '../../components/CommunityManager/AcceptRequestTable';
  import SurveyTable from '../../components/CommunityManager/SurveyTable';


  function CommunityManagerTables(){
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
            <Text pt={15} pb={15} pl={25} color={'black'} fontSize="2xl">
              Supervisor Revision Requests
            </Text>
            <Box p={5}>
              <AcceptRequestTable />
            </Box>
          </Box>
            </Box>


            <Box d='flex' flexDir={'r'}>
              <Text pt={15} color={'black'} fontSize={'2xl'}> Survey Table</Text>
              <Box p={5}>
                <SurveyTable></SurveyTable>
              </Box>
            </Box>

</Box>


        </>
      );

  }
  export default CommunityManagerTables;