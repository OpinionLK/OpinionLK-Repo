import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useAuthContext } from '../../hooks/useAuthContext'
import {
    Flex,
    Heading,
    Card,
    CardHeader,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,

    CardBody,
    Skeleton,
    Text,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Tag,
    Th,
    Td,
    IconButton,
    TableCaption,
    TableContainer,
    Button,
} from '@chakra-ui/react'

import axios from 'axios';


import { useDisclosure } from '@chakra-ui/react'



const SurveyTable = ({ url }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const {
        user, dispatch, userData
    } = useAuthContext();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const numRows = 5;
    const history = useNavigate();

    const [survey, setSurvey] = useState(null);

    async function onclickhandler(id) {
        // try {
        //     const response = await axios.get(`http://localhost:3002/api/survey//getbySurveyId/${id}`,
        //         {
        //             headers: { 'Authorization': `Bearer ${user.token}` },
        //         }
        //     )

        //         ;
        //     console.log(response.data[0])
        //     setSurvey(response.data[0])

        //     onOpen();


        // } catch (error) {
        //     console.log(error)
        // }


        history("/commanager/viewsurvey/" + id + "/")

    }

    useEffect(() => {
        fetch('http://localhost:3002/api/survey/all',
            {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${user.token}` },
            }
        )
            .then(response => response.json())
            .then(data => {
                setData(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
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
                                weonfiowen
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
                                        {survey.approvalStatus === 'draft' ? (
                                            <Tag colorScheme="facebook"
                                                fontWeight={'bold'}>Draft</Tag>) : survey.approvalStatus === 'pending' ? (
                                                    <Tag colorScheme="orange"
                                                        fontWeight={'bold'}>Pending</Tag>) : survey.approvalStatus === 'approved' ? (
                                                            <Tag colorScheme="green"
                                                                fontWeight={'bold'}>Approved</Tag>) : null}
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

export default SurveyTable