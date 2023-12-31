import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Center,
  Input,
  Flex,
  Heading,
  InputGroup,
  InputLeftElement,
  Card,
  border,
} from "@chakra-ui/react";


import { SearchIcon } from "@chakra-ui/icons";

import Pagination from "./Pagination";

function formatDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}


function ApprovedSurveyList() {
  const [surveys, setSurveys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [surveysPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  useEffect(() => {
    // Send a GET request to the server to fetch approved surveys
    axios
      .get("http://localhost:3002/api/survey/approved")
      .then((response) => {
        setSurveys(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const indexOfLastSurvey = currentPage * surveysPerPage;
  const indexOfFirstSurvey = indexOfLastSurvey - surveysPerPage;

  // Filter surveys based on the search term
  const filteredSurveys = surveys.filter((survey) =>
    survey.surveyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentSurveys = filteredSurveys.slice(
    indexOfFirstSurvey,
    indexOfLastSurvey
  );

  const totalPages = Math.ceil(filteredSurveys.length / surveysPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset page to 1 when searching
  };

  return (
    <div >
      <Flex mb={"20px"} width={"100%"} justifyContent={"space-between"} alignItems={"center"}>
        <Heading size={"md"}>List of Approved Surveys</Heading>
        <InputGroup width={"40%"}>
          <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
          <Input
            type="text"
            placeholder="Search"
            onChange={handleSearch}
            value={searchTerm}
          />
        </InputGroup>
      </Flex>
      <Card align={"center"} pt={5} borderRadius={10}>
        <Table variant="simple" colorScheme="purple">
          <TableCaption>Surveys</TableCaption>
          <Thead textColor={"brand.textDarkPurple"}>
            <Tr>
              <Th>Survey Name</Th>
              <Th>Description</Th>
              <Th>Question Count</Th>
              <Th>Responses Count</Th>
              <Th>Approval Status</Th>
              <Th>Created Date</Th>
              <Th>Expiration Date</Th>
            </Tr>
          </Thead>
          <Tbody textColor={"brand.textDarkPurple"}>
            {currentSurveys.map((survey) => (
              <Tr key={survey.surveyId}>
                <Td>{survey.surveyName}</Td>
                <Td>{survey.surveyDescription}</Td>
                <Td>{survey.questions.length}</Td>
                <Td>{survey.responses.length}</Td>
                <Td>{survey.approvalStatus}</Td>
                <Td>{formatDate(survey.created_date)}</Td>
                <Td>{formatDate(survey.expiration_date)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Card>
      <Center pt={10} pb={10}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Center>
    </div>
  );
}

export default ApprovedSurveyList;
