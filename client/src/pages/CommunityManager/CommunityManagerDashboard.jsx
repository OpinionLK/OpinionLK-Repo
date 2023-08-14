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
