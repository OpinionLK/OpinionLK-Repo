//import Dashboard from "../DashboardLayout";

import {
  Flex,
  // Heading,
  // Stack,
  // useMediaQuery,
  // FormControl,
  // FormLabel,
  Text,
  // Input,
  // Checkbox,
  // Button,
  Box,
  Card,
  Image,
  Center,
  // Grid,
  // GridItem,
} from '@chakra-ui/react';
// import Dashboard from '../DashboardLayout';
// import Sidebar from '../../components/Layout/Sidebar';
// import Topbar from '../../components/Layout/Topbar';

import StatViewCard from '../../components/CommunityManager/StatViewCard';
import AcceptRequestTable from '../../components/CommunityManager/AcceptRequestTable';
import TaskSummaryTable from '../../components/CommunityManager/TaskSummaryTable';
import SurveyManagementGrph from '../../components/CommunityManager/SurveyManagementGraph';

function CommunityManagerDashBoard() {
  const style = {
    width: '100%',
    overflow: 'auto',
    height: '100%',
    paddingBottom: '20px',
  };

  return (
    <>
      <Box style={style}>
        <Box d="flex" flexDir={'r'}>
          <Box>
     
                


          </Box>




          <Flex direction={'row'} justifyContent={"space-around"}>
            <Box pl={1}>
              <StatViewCard str={'Total Survey'} num={'335'} />
            </Box>
            <Box pl={1}>
              <StatViewCard str={'Survey Revision Requests'} num={'55'} />
            </Box>
            <Box pl={1}>
              <StatViewCard str={'New Survey'} num={'78'} />
            </Box>
            <Box pl={1}>
              <StatViewCard str={'Research Request'} num={'113'} />
            </Box>
            <Box pl={1}>
              <StatViewCard str={'Reported Survey'} num={'15'} />
            </Box>
            <Box pl={1}>
              <StatViewCard str={'Customer Help'} num={'38'} />
            </Box>
          </Flex>



          <Box>
            <Text pt={15} pb={15} pl={25} color={'black'} fontSize="2xl">
              Supervisor Revision Requests
            </Text>
            <Box p={5}>
              <AcceptRequestTable />
            </Box>
          </Box>
          <Box d="flex" alignContent={'center'} flexDir={'r'}>
            <Flex direction={'row'} justifyContent={'space-around'}>
              <Box w={'600px'}>
                <Text pt={15} pb={15} color={'black'} fontSize="2xl">
                  Task Summary
                </Text>
                <TaskSummaryTable />
              </Box>
              <Box w={'550px'} >
                <Text pt={15} pb={15} color={'black'} fontSize="2xl">
                  Survey Management
                </Text>
                <SurveyManagementGrph />
              </Box>

            </Flex>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default CommunityManagerDashBoard;
