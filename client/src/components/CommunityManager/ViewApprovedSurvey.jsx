import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption } from "@chakra-ui/react";

function ApprovedSurveyList() {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    // Send a GET request to the server to fetch surveys
    axios.get("http://localhost:3002/api/survey/approved")
      .then((response) => {
        setSurveys(response.data);
        console.log("Received Data:", response.data); 
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      <h1>List of Surveys</h1>
      <Table variant="simple" colorScheme="purple">
        <TableCaption>Surveys</TableCaption>
        <Thead textColor={'brand.textDarkPurple'}>
          <Tr>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Approval Status</Th>
            <Th>Created Date</Th>
          </Tr>
        </Thead>
        <Tbody textColor={'brand.textDarkPurple'}>
          {surveys.map((survey) => (
            <Tr key={survey.surveyId}>
              <Td>{survey.surveyName}</Td>
              <Td>{survey.surveyDescription}</Td>
              <Td>{survey.approvalStatus}</Td>
              <Td>{new Date(survey.created_date).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

export default ApprovedSurveyList;
