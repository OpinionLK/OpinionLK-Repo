import React from "react";
import {
    Heading,
    Card,
    CardHeader,
    CardBody,
    VStack,
    Flex,
} from '@chakra-ui/react'
import { Line } from 'react-chartjs-2';


const UserManagementGraph = () => {
    const state = {
        labels: ['Jan', 'Feb', 'Mar',
            'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'User coSurveys Surveys unt',
                fill: false,
                lineTension: 0.5,
                backgroundColor: '#fff',
                borderColor: '#4318FF',
                borderWidth: 3,
                data: [1, 20, 30, 70, 50, 60, 40, 80, 90, 100, 110, 120]

            },
            {
                label: 'Predicted User count',
                fill: false,
                lineTension: 0.5,
                backgroundColor: '#fff',
                borderColor: '#FF0000',
                borderWidth: 3,
                data: [5, 20, 40, 70, 60, 60, 60, 89, 100, 110, 120, 130]
            }
        ]
    }

    return (
        <Card borderRadius={'20px'} width={'100%'}>
            <CardHeader>
                <Heading size={'md'}>User Management</Heading>
            </CardHeader>
            <hr />
            <CardBody>
                <VStack>
                    <Flex width={'100%'} h={'300px'} justifyContent={'center'}>
                        <Line
                            data={state}
                            options={{
                                title:{
                                    display:true,
                                    text:'Average Rainfall per month',
                                    fontSize:20
                                },
                                legend:{
                                    display:true,
                                    position:'right'
                                }
                            }}
                            
                        />
                    </Flex>
                    <Flex>

                    </Flex>
                </VStack>
            </CardBody>
        </Card>
    )
}

export default UserManagementGraph