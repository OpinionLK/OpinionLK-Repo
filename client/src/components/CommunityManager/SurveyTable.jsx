import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useAuthContext } from '../../hooks/useAuthContext'
import {
    Flex,
    Heading,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Skeleton,
    Table,
    Thead,
    Tbody,
    Tr,
    Tag,
    Th,
    Td,
    TableContainer,
    Button,
} from '@chakra-ui/react'
import Status from '../../components/Status.jsx';
import { useDisclosure } from '@chakra-ui/react';

const SurveyTable = ({ url }) => {
    // eslint-disable-next-line
    const { isOpen, onOpen, onClose } = useDisclosure()

    const {
        // eslint-disable-next-line
        user, dispatch, userData
    } = useAuthContext();

    const [data, setData] = useState(null);
    // eslint-disable-next-line
    const [isLoading, setIsLoading] = useState(true);
    const numRows = 5;
    const history = useNavigate();
// eslint-disable-next-line
    const [survey, setSurvey] = useState(null);

    async function onclickhandler(id) {
        history("/commanager/viewsurvey/" + id + "/")
    }

    useEffect(() => {
        console.log("Fetching data");
        fetch('http://localhost:3002/api/survey/all',
            {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${user.token}` },
            }
        )
        .then(response => {
            if (!response.ok) {
                console.error('API request failed:', response);
                throw new Error('API request failed');
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data)) {
                setData(data);
            } else {
                console.error('API response is not an array:', data);
                setData([]);
            }
            setIsLoading(false);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setData([]);
            setIsLoading(false);
        });
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Modal variant={'purple'} size={'xl'} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display={'flex'} flexDir={'column'}>

                        <Flex height={'50%'} flex={1}>
                            <Flex width={'100%'}>
                                <Heading size={'md'}>Survey Name</Heading>
                                <Tag colorScheme="green" ml={2} fontWeight={'bold'}>Active</Tag>
                            </Flex>
                            <Flex width={'100%'}>
                            </Flex>
                        </Flex>
                        <Flex height={'50%'} flex={1}>fegwgw</Flex>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <TableContainer>
                <Table variant='simple'>

                    <Thead>
                        <Tr>
                            <Th>Survey Name</Th>
                            <Th>Date Created</Th>
                            <Th># of Questions</Th>
                            <Th># of Responses</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data ? (data.map((survey) => {
                            return (
                                <Tr _hover={{
                                    bg: 'gray.100', cursor: 'pointer'
                                }}
                                    _active={{
                                        bg: 'gray.200',
                                    }}
                                    key={survey.surveyID}

                                    onClick={() => {
                                        onclickhandler(survey.surveyID)
                                    }}
                                >
                                    <Td>{survey.surveyName}</Td>
                                    <Td>{survey.created_date}</Td>
                                    <Td isNumeric>{survey.questions.length}</Td>
                                    <Td isNumeric>{survey.responses.length}</Td>
                                    <Td>
                                        <Status status={survey.approvalStatus} />
                                    </Td>


                                </Tr>)
                        })) : ([...Array(numRows)].map((_, i) => (<Tr key={i}>
                            <Td><Skeleton height={'20px'}></Skeleton></Td>
                            <Td><Skeleton height={'20px'}></Skeleton></Td>
                            <Td><Skeleton height={'20px'}></Skeleton></Td>
                            <Td><Skeleton height={'20px'}></Skeleton></Td>
                            <Td><Skeleton height={'20px'}></Skeleton></Td>
                            <Td><Skeleton height={'20px'}></Skeleton></Td>

                        </Tr>)))}

                    </Tbody>

                </Table>
            </TableContainer>
            <Button>Previous</Button>

            <Button>Next</Button>
        </>
    )
}

export default SurveyTable;