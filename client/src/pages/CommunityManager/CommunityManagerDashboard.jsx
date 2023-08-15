//import Dashboard from "../DashboardLayout";

import {
  Flex,
  Heading,
  Stack,
  useMediaQuery,
  FormControl,
  FormLabel,
  Text,
  Input,
  Checkbox,
  Button,
  Box,
  Grid,
  GridItem,
} from '@chakra-ui/react';

import Sidebar from '../../components/Layout/Sidebar';
import Topbar from '../../components/Layout/Topbar';

import StatViewCard from '../../components/CommunityManagerComponents/StatViewCard';

import AcceptRequestTable from '../../components/CommunityManager/AcceptRequestTable';
import TaskSummaryTable from '../../components/CommunityManager/TaskSummaryTable';
function CommunityManagerDashBoard() {
  return (
    <>
      <Grid
        templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
        gridTemplateRows={'50px 1fr 30px'}
        gridTemplateColumns={'150px 1fr'}
        h="200px"
        gap="2"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" area={'header'}>
          <Topbar />
        </GridItem>
        <GridItem pl="2" bg="pink.300" area={'nav'}>
          Nav
        </GridItem>

        <GridItem pl="2" area={'main'}>
          <Box d="flex" flexDir={'r'}>
            <Flex direction={'row'}>
              <Box pl={2}>
                <StatViewCard />
              </Box>
              <Box pl={2}>
                <StatViewCard />
              </Box>
              <Box pl={2}>
                <StatViewCard />
              </Box>
              <Box pl={2}>
                <StatViewCard />
              </Box>
              <Box pl={2}>
                <StatViewCard />
              </Box>
            </Flex>
            <Box>
              <Text pt={15} pb={15} color={'black'} fontSize="2xl">
                Supervisor Revision Requests
              </Text>
              <Box>
                <AcceptRequestTable />
              </Box>
            </Box>
            <Box d="flex" alignContent={"center"} flexDir={"r"}>
              <Flex direction={"row"} justifyContent={"space-around"}>
              <Box w={'600px'}>
                <Text pt={15} pb={15} color={'black'} fontSize="2xl">Task Summary</Text>
                <TaskSummaryTable/>
                
              </Box>
              <Box w={'550px'} bg={'yellow'}>
                <Text pt={15} pb={15} color={'black'} fontSize="2xl">Survey Management</Text>
              </Box>
              </Flex>
            </Box>
          </Box>
        </GridItem>

        <GridItem pl="2" bg="blue.300" area={'footer'}>
          Footer
        </GridItem>
      </Grid>
    </>
  );
}

export default CommunityManagerDashBoard;
