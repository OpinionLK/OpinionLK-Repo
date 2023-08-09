import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
    Flex, 
    Heading, 
    Stack,
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    List,
 } from '@chakra-ui/react';

const Adminprofile = () => {
    // const [ManagerName, setManagerName] = useState('');
    // const [ManagerEmail, setManagerEmail] = useState('');
    // const [ManagerPhone, setManagerPhone] = useState('');
    // const [ManagerNic, setManagerNic] = useState('');

    const [member, setMember] = useState([]);
    const [updateUI, setUpdateUI] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const [userCreated, setUserCreated] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
    const ManagerName = event.target.elements.ManagerName.value;
    const ManagerEmail = event.target.elements.ManagerEmail.value;
    const ManagerPhone = event.target.elements.ManagerPhone.value;
    const ManagerNic = event.target.elements.ManagerNic.value;

    try {
        const json = await axios.post('http://localhost:3002/api/auth/savemember', {
            ManagerName,
            ManagerEmail,
            ManagerPhone,
            ManagerNic
        });
        console.log('User created successfully');
        setUserCreated(true);
    }catch (error) {
        console.log(error);
    }
};

    // useEffect(() => {
    //     axios.get("http://localhost:3002/api/auth/getmembers").then((response) => {
    //         console.log(response.data);
    //         setMember(response.data);
    //     });
    // }, [updateUI]);

    // const addManager = () => {
    //     axios.post("http://localhost:3002/api/auth/savemember", {
    //         ManagerName: ManagerName,
    //         ManagerEmail: ManagerEmail,
    //         ManagerPhone: ManagerPhone,
    //         ManagerNic: ManagerNic
    //     }).then(() => {
    //         setManagerName("");
    //         setManagerEmail("");
    //         setManagerPhone("");
    //         setManagerNic("");
    //         setUpdateUI(prevState => !prevState);
    //     });
    // };

    // const updateManager = () => {
    //     axios.put(`http://localhost:3002/api/auth/updatemember/${updateId}`, {
    //         ManagerName: ManagerName,
    //         ManagerEmail: ManagerEmail,
    //         ManagerPhone: ManagerPhone,
    //         ManagerNic: ManagerNic
    //     }).then(() => {
    //         setUpdateUI(prevState => !prevState);
    //         setUpdateId(null);
    //         setManagerName("");
    //     });
    // };

    // const deleteManager = (id) => {
    //     axios.delete(`http://localhost:3002/api/auth/deletemember/${id}`).then(() => {
    //         setUpdateUI(prevState => !prevState);
    //     });
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (updateId) {
    //         updateManager();
    //     } else {
    //         addManager();
    //     }
    // };

    // function updateMode(id, text) {
    //     console.log(id, text);
    //     setManagerName(text);
    //     setUpdateId(id);
    // }

    return (
        <Flex direction="column" align="left" justify="left" minHeight="100vh">
            <Card>
                <CardHeader>
                    <Heading size="medium">Add New Community Manager </Heading>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={4}>
                            <Input
                                type="text"
                                placeholder="ManagerName"
                                name="ManagerName"
                                // value={ManagerName}
                                // onChange={(e) => setManagerName(e.target.value)}
                            />
                            <Input
                                type="email"
                                placeholder="Manager Email"
                                name="ManagerEmail"
                                // value={ManagerEmail}
                                // onChange={(e) => setManagerEmail(e.target.value)}
                            />
                            <Input
                                type="number"
                                placeholder="Manager Phone"
                                name="ManagerPhone"
                                // value={ManagerPhone}
                                // onChange={(e) => setManagerPhone(e.target.value)}
                            />
                            <Input
                                type="text"
                                placeholder="Manager NIC"
                                name="ManagerNic"
                                // value={ManagerNic}
                                // onChange={(e) => setManagerNic(e.target.value)}
                            />
                            <Button type="submit">
                                {updateId ? "Update" : "Add"}
                            </Button>
{/* 
                            <ul>
                                {member.map((item) => (
                                    <List
                                        key={item._id}
                                        member={item}
                                        setUpdateId={setUpdateId}
                                        updateMode={updateMode}
                                        deleteManager={deleteManager}
                                    />
                                ))}
                            </ul> */}
                        </Stack>
                    </form>
                </CardBody>
            </Card>
        </Flex>
    );
};

export default Adminprofile;
