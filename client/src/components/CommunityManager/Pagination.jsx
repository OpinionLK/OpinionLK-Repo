import React from "react";
import { HStack, Button,Box} from "@chakra-ui/react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Box alignContent={"center"}>
    <HStack spacing={2}>
      {pageNumbers.map((number) => (
        <Button
          key={number}
          variant={number === currentPage ? "solid" : "outline"}
          onClick={() => onPageChange(number)}
        >
          {number}
        </Button>
      ))}
    </HStack>
    </Box>
  );
}

export default Pagination;
