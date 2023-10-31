import {
    Box,
    Card,
    CardBody,
    CardHeader,
    TableContainer,
} from '@chakra-ui/react'
import {
    Grid,
    Flex,
    Stack,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Heading,
    Input,
} from '@chakra-ui/react';
// import Modal from 'react-modal';
// import { EditIcon, DeleteIcon, CloseIcon } from '@chakra-ui/icons';
import { useState } from 'react';
// import axios from 'axios';

const SurveyeeManager = () => {

    const [filterText, setFilterText] = useState('');

  const md = 'md';

    return (
        <>
        <Box>
        <Grid templateColumns="repeat(1, 1fr)">
            <Flex>
            <Stack width={'100%'}>
                <Card borderRadius={'20px'} width={'100%'}>
                <CardHeader  display={'flex'} flexDirection={'row'}>
                    <Heading color={'purple.900'}  size={md}>Surveyees</Heading>
                    <Box>
                      <Input
                        type='search'
                        placeholder = 'Search by Name or Email...'
                        fontSize={'14px'}
                        width={'250px'}
                        ml={'20px'}
                        px={2}
                        py={1}
                        height={'30px'}
                        borderRadius={'8px'}
                        onChange={(e) => setFilterText(e.target.value)}
                        value ={filterText}/>
                    </Box>
                </CardHeader>
                <hr></hr>
                <CardBody>
                    <TableContainer>
                    <Table variant="simple">
                        <TableCaption>
                        Imperial to metric conversion factors
                        </TableCaption>
                        <Thead>
                        <Tr>
                            <Th>Survey</Th>
                            <Th>Per Survey</Th>
                            <Th>Demography</Th>
                            <Th>Organization</Th>
                            <Th>Package</Th>
                            <Th>Type</Th>
                            <Th>Start Date</Th>
                            <Th>End Date</Th>
                            <Th>Progress</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                        <Tr>
                            <Td>inches</Td>
                            <Th>Per Survey</Th>
                            <Th>Demography</Th>
                            <Th>Organization</Th>
                            <Th>Package</Th>
                            <Th>Type</Th>
                            <Th>Start Date</Th>
                            <Th>End Date</Th>
                            <Th>Progress</Th>
                        </Tr>
                        </Tbody>
                    </Table>
                    </TableContainer>
                </CardBody>
                </Card>
            </Stack>
            </Flex>
        </Grid>
        </Box>
    </>
    )
}

export default SurveyeeManager