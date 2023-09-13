
import React, { useState, useEffect } from "react";

import {
    createColumnHelper,

} from "@tanstack/react-table";
import { DataTable } from "./datatable";

import {
    Tag
} from "@chakra-ui/react";


const columnHelper = createColumnHelper();

const columns = [
  
    columnHelper.accessor("surveyName", {
        cell: (info) => info.getValue(),
        header: "Name"
    }),
    columnHelper.accessor("created_date", {
        cell: (info) => info.getValue().slice(0, 10),
        defaultSort: "desc",

        header: "Date Created"
    }),
    columnHelper.accessor("questions", {
        cell: (info) => info.getValue().length,
        header: "# of Questions",
        meta:{
            isNumeric: true 
        }
    }),
    columnHelper.accessor("responses", {
        cell: (info) => info.getValue().length,
        header: "# of Responses",
        meta:{
            isNumeric: true 
        },
        
    }),
    columnHelper.accessor("approvalStatus", {
        cell: (info) => {
            const approvalStatus = info.getValue();
    
            // Check the approval status and render the button accordingly
            if (approvalStatus === "approved") {
                return <Tag colorScheme="green">Approved</Tag>;
            } else if (approvalStatus === "pending") {
                return <Tag colorScheme="orange">Pending</Tag>;
            } else  if (approvalStatus === "draft") {
                return <Tag colorScheme="gray">Draft</Tag>;
            }
        },
        header: "Status"
    }),
    columnHelper.accessor("responses", {
        cell: (info) => info.getValue().length,
        header: "Actions",
        meta:{
            isNumeric: true 
        }

    }),
];

const Table2 = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://opinionlk.azurewebsites.net:3002/api/survey/all')
            .then(response => response.json())
            .then(data => {
                setData(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return <DataTable data={
        data
    } columns={columns} />;
}

export default Table2;