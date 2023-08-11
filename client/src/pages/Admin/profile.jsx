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
    const [ManagerFirstName, setManagerFirstName] = useState('');
    const[ManagerLastName, setManagerLastName] = useState('');
    const [ManagerDistrict, setManagerDistrict] = useState('');
    const [Manageraddline1, setManageraddline1] = useState('');
    const [Manageraddline2, setManageraddline2] = useState('');
    const [ManagerEmail, setManagerEmail] = useState('');
    const [ManagerPhone, setManagerPhone] = useState('');
    const [ManagerNic, setManagerNic] = useState('');

    const [member, setMember] = useState([]);
    const [updateUI, setUpdateUI] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    
    useEffect(() => {
        axios.get("http://localhost:3002/api/auth/getmembers").then((response) => {
            console.log(response.data);
            setMember(response.data);
        });
    }, [updateUI]);

    const addManager = () => {
        axios.post("http://localhost:3002/api/auth/savemember", {
            ManagerFirstName: ManagerFirstName,
            ManagerLastName : ManagerLastName,
            ManagerDistrict: ManagerDistrict,
            Manageraddline1: Manageraddline1,
            Manageraddline2: Manageraddline2,
            ManagerEmail: ManagerEmail,
            ManagerPhone: ManagerPhone,
            ManagerNic: ManagerNic
        }).then(() => {
            setManagerFirstName("");
            setManagerLastName("");
            setManagerDistrict("");
            setManageraddline1("");
            setManageraddline2("");
            setManagerEmail("");
            setManagerPhone("");
            setManagerNic("");
            setUpdateUI(prevState => !prevState);
        });
    };

    const updateManager = () => {
        axios.put(`http://localhost:3002/api/auth/updatemember/${updateId}`, {
            ManagerFirstName: ManagerFirstName,
            ManagerEmail: ManagerEmail,
            ManagerPhone: ManagerPhone,
            ManagerNic: ManagerNic
        }).then(() => {
            setUpdateUI(prevState => !prevState);
            setUpdateId(null);
            setManagerFirstName("");
        });
    };

    const deleteManager = (id) => {
        axios.delete(`http://localhost:3002/api/auth/deletemember/${id}`).then(() => {
            setUpdateUI(prevState => !prevState);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (updateId) {
            updateManager();
        } else {
            console.log("add");
            addManager();
        }
    };

    function updateMode(id, text) {
        console.log(id, text);
        setManagerFirstName(text);
        setUpdateId(id);
    }

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
                                placeholder="ManagerFirstName"
                                name="ManagerFirstName"
                                value={ManagerFirstName}
                                onChange={(e) => setManagerFirstName(e.target.value)}
                            />
                            <Input
                                type="text"
                                placeholder="ManagerLastName"
                                name="ManagerLastName"
                                value={ManagerLastName}
                                onChange={(e) => setManagerLastName(e.target.value)}
                            />
                            <Input
                                type="text"
                                placeholder="ManagerDistrict"
                                name="ManagerDistrict"
                                value={ManagerDistrict}
                                onChange={(e) => setManagerDistrict(e.target.value)}
                            />
                            <Input 
                                type="text"
                                placeholder="Manageraddline1"
                                name="Manageraddline1"
                                value={Manageraddline1}
                                onChange={(e) => setManageraddline1(e.target.value)}
                            />
                            <Input
                                type="text"
                                placeholder="Manageraddline2"
                                name="Manageraddline2"
                                value={Manageraddline2}
                                onChange={(e) => setManageraddline2(e.target.value)}
                            />
                            <Input
                                type="email"
                                placeholder="Manager Email"
                                name="ManagerEmail"
                                value={ManagerEmail}
                                onChange={(e) => setManagerEmail(e.target.value)}
                            />
                            <Input
                                type="number"
                                placeholder="Manager Phone"
                                name="ManagerPhone"
                                value={ManagerPhone}
                                onChange={(e) => setManagerPhone(e.target.value)}
                            />
                            <Input
                                type="text"
                                placeholder="Manager NIC"
                                name="ManagerNic"
                                value={ManagerNic}
                                onChange={(e) => setManagerNic(e.target.value)}
                            />
                            <Button type="submit">
                                {updateId ? "Update" : "Add"}
                            </Button>

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
                            </ul>
                        </Stack>
                    </form>
                </CardBody>
            </Card>
        </Flex>
    );
};

export default Adminprofile;
