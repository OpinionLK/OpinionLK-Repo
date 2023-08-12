
import React, { useState, useEffect } from "react";

import {
    createColumnHelper,

} from "@tanstack/react-table";
import { DataTable } from "./datatable";



// const data = [
//     {
//         fromUnit: "inches",
//         toUnit: "millimetres (mm)",
//         factor: 25.4
//     },
//     {
//         fromUnit: "feet",
//         toUnit: "centimetres (cm)",
//         factor: 30.48
//     },
//     {
//         fromUnit: "inches",
//         toUnit: "millimetres (mm)",
//         factor: 25.4
//     },
//     {
//         fromUnit: "feet",
//         toUnit: "centimetres (cm)",
//         factor: 30.48
//     },
//     {
//         fromUnit: "inches",
//         toUnit: "millimetres (mm)",
//         factor: 25.4
//     },
//     {
//         fromUnit: "feet",
//         toUnit: "centimetres (cm)",
//         factor: 30.48
//     },
//     {
//         fromUnit: "inches",
//         toUnit: "millimetres (mm)",
//         factor: 25.4
//     },
//     {
//         fromUnit: "feet",
//         toUnit: "centimetres (cm)",
//         factor: 30.48
//     },
//     {
//         fromUnit: "inches",
//         toUnit: "millimetres (mm)",
//         factor: 25.4
//     },
//     {
//         fromUnit: "feet",
//         toUnit: "centimetres (cm)",
//         factor: 30.48
//     },
//     {
//         fromUnit: "inches",
//         toUnit: "millimetres (mm)",
//         factor: 25.4
//     },
//     {
//         fromUnit: "feet",
//         toUnit: "centimetres (cm)",
//         factor: 30.48
//     },
//     {
//         fromUnit: "inches",
//         toUnit: "millimetres (mm)",
//         factor: 25.4
//     },
//     {
//         fromUnit: "feet",
//         toUnit: "centimetres (cm)",
//         factor: 30.48
//     },
//     {
//         fromUnit: "inches",
//         toUnit: "millimetres (mm)",
//         factor: 25.4
//     },
//     {
//         fromUnit: "feet",
//         toUnit: "centimetres (cm)",
//         factor: 30.48
//     },
//     {
//         fromUnit: "inches",
//         toUnit: "millimetres (mm)",
//         factor: 25.4
//     },
//     {
//         fromUnit: "feet",
//         toUnit: "centimetres (cm)",
//         factor: 30.48
//     },
//     {
//         fromUnit: "inches",
//         toUnit: "millimetres (mm)",
//         factor: 25.4
//     },
//     {
//         fromUnit: "feet",
//         toUnit: "centimetres (cm)",
//         factor: 30.48
//     },
//     {
//         fromUnit: "inches",
//         toUnit: "millimetres (mm)",
//         factor: 25.4
//     },
//     {
//         fromUnit: "feet",
//         toUnit: "centimetres (cm)",
//         factor: 30.48
//     },
//     {
//         fromUnit: "inches",
//         toUnit: "millimetres (mm)",
//         factor: 25.4
//     },
//     {
//         fromUnit: "feet",
//         toUnit: "centimetres (cm)",
//         factor: 30.48
//     },
//     {
//         fromUnit: "inches",
//         toUnit: "millimetres (mm)",
//         factor: 25.4
//     },
//     {
//         fromUnit: "feet",
//         toUnit: "centimetres (cm)",
//         factor: 30.48
//     },
//     {
//         fromUnit: "inches",
//         toUnit: "millimetres (mm)",
//         factor: 25.4
//     },
//     {
//         fromUnit: "feet",
//         toUnit: "centimetres (cm)",
//         factor: 30.48
//     },
//     {
//         fromUnit: "inches",
//         toUnit: "millimetres (mm)",
//         factor: 25.4
//     },
//     {
//         fromUnit: "feet",
//         toUnit: "centimetres (cm)",
//         factor: 30.48
//     },
// ];

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor("survey-id", {
        cell: (info) => info.getValue(),
        header: "ID"
    }),
    columnHelper.accessor("surveyName", {
        cell: (info) => info.getValue(),
        header: "Name"
    }),
    columnHelper.accessor("created_date", {
        cell: (info) => info.getValue(),
        header: "Date Created"
    }),
    columnHelper.accessor("responses", {
        cell: (info) => info.getValue().length,
        header: "# of Responses",
        meta:{
            isNumeric: true 
        }
    }),
    columnHelper.accessor("created_date", {
        cell: (info) => info.getValue(),
        header: "Responses"
    })
];

const Table2 = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3002/api/survey/all')
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