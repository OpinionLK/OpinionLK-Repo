import React, { useState, useEffect } from 'react';
import { 
    Card,
    CardHeader,
    Divider,
    Heading,
    CardBody,
    HStack,
    Input,
    Text,
    VStack,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Switch,
    Button,
    Textarea,
    useToast,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
 } from '@chakra-ui/react';
import axios from 'axios';


const SurveySettings = () => {
    

    // state for package 1
    const [package1, setPackage1] = useState({
        description: 'Starter',
        price: 0,
        costPerResponse: 0,
        duration: 0,
        maxResponses: 0,
        active: false
    });

    // state for package 2
    const [package2, setPackage2] = useState({
        description: 'Premium',
        price: 0,
        costPerResponse: 0,
        duration: 0,
        maxResponses: 0,
        active: false
    });

    // state for package 3
    const [package3, setPackage3] = useState({
        description: 'Enterprise',
        price: 0,
        costPerResponse: 0,
        duration: 0,
        maxResponses: 0,
        active: false
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3002/api/admin/surveySettings');
                setPackage1(response.data[0].surveyPlans[0]);
                setPackage2(response.data[0].surveyPlans[1]);
                setPackage3(response.data[0].surveyPlans[2]);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);


    //field disabled state
    const [isDisabled, setIsDisabled] = useState(true);
    
    // ===============================================================================

    // Alert Dialog
const [surveySettingAlertOpen1, setSurveySettingAlertOpen1] = useState(false);
const surveySettingAlertClose1 = () => setSurveySettingAlertOpen1(false);

const [surveySettingAlertOpen2, setSurveySettingAlertOpen2] = useState(false);
const surveySettingAlertClose2 = () => setSurveySettingAlertOpen2(false);

const [surveySettingAlertOpen3, setSurveySettingAlertOpen3] = useState(false);
const surveySettingAlertClose3 = () => setSurveySettingAlertOpen3(false);

const confirmChange1 = async (e) => {
    e.preventDefault();
    document.getElementById('package1SaveBtn').style.display = 'block';
    document.getElementById('package1CancelBtn').style.display = 'block';
    document.getElementById('package1ChangeBtn').style.display = 'none';
    setIsDisabled(!isDisabled);
    setSurveySettingAlertOpen1(false);
}

const confirmChange2 = async (e) => {
    e.preventDefault();
    document.getElementById('package2SaveBtn').style.display = 'block';
    document.getElementById('package2CancelBtn').style.display = 'block';
    document.getElementById('package2ChangeBtn').style.display = 'none';
    setIsDisabled(!isDisabled);
    setSurveySettingAlertOpen2(false);
}

const confirmChange3 = async (e) => {
    e.preventDefault();
    document.getElementById('package3SaveBtn').style.display = 'block';
    document.getElementById('package3CancelBtn').style.display = 'block';
    document.getElementById('package3ChangeBtn').style.display = 'none';
    setIsDisabled(!isDisabled);
    setSurveySettingAlertOpen3(false);
}

const cancelRef1 = React.useRef();
const cancelRef2 = React.useRef();
const cancelRef3 = React.useRef();


    // handle change for package 1

    const handleFirstPackageChange = async (e) => {
        e.preventDefault();
        setSurveySettingAlertOpen1(true);
    }

    // handle change for package 2

    const handleSecondPackageChange = async (e) => {
        e.preventDefault();
        setSurveySettingAlertOpen2(true);
    }

    // handle change for package 3

    const handleThirdPackageChange = async (e) => {
        e.preventDefault();
        setSurveySettingAlertOpen3(true);
    }



    // ===============================================================================


// handle submit for package 1
const handleFirstPackageSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await axios.put('http://localhost:3002/api/admin/surveySettings/update', { package: package1, index: 0 });
        console.log('Data Response: ', response);
    }
    catch(err){
        console.log(err);
    }
}

// handle submit for package 2
const handleSecondPackageSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await axios.put('http://localhost:3002/api/admin/surveySettings/update', { package: package2, index: 1 });
        console.log('Data Response: ', response);
    }
    catch(err){
        console.log(err);
    }
}

// handle submit for package 3
const handleThirdPackageSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await axios.put('http://localhost:3002/api/admin/surveySettings/update', { package: package3, index: 2 });
        console.log('Data Response: ', response);
    }
    catch(err){
        console.log(err);
    }
}

// ===============================================================================

// handle cancel for package 1
const cancelFirst = async (e) => {
    e.preventDefault();
    document.getElementById('package1SaveBtn').style.display = 'none';
    document.getElementById('package1CancelBtn').style.display = 'none';
    document.getElementById('package1ChangeBtn').style.display = 'block';
    setIsDisabled(!isDisabled);
} 

const saveFirst = async (e) => {
    e.preventDefault();
    document.getElementById('package1SaveBtn').style.display = 'none';
    document.getElementById('package1CancelBtn').style.display = 'none';
    document.getElementById('package1ChangeBtn').style.display = 'block';
    handleFirstPackageSubmit(e);
    showToast('Successfully Updated');
    setIsDisabled(!isDisabled);
}

const cancelSecond = async (e) => {
    e.preventDefault();
    document.getElementById('package2SaveBtn').style.display = 'none';
    document.getElementById('package2CancelBtn').style.display = 'none';
    document.getElementById('package2ChangeBtn').style.display = 'block';
    setIsDisabled(!isDisabled);
}

const saveSecond = async (e) => {
    e.preventDefault();
    document.getElementById('package2SaveBtn').style.display = 'none';
    document.getElementById('package2CancelBtn').style.display = 'none';
    document.getElementById('package2ChangeBtn').style.display = 'block';
    handleSecondPackageSubmit(e);
    showToast('Successfully Updated');
    setIsDisabled(!isDisabled);
}

const cancelThird = async (e) => {
    e.preventDefault();
    document.getElementById('package3SaveBtn').style.display = 'none';
    document.getElementById('package3CancelBtn').style.display = 'none';
    document.getElementById('package3ChangeBtn').style.display = 'block';
    setIsDisabled(!isDisabled);
}

const saveThird = async (e) => {
    e.preventDefault();
    document.getElementById('package3SaveBtn').style.display = 'none';
    document.getElementById('package3CancelBtn').style.display = 'none';
    document.getElementById('package3ChangeBtn').style.display = 'block';
    handleThirdPackageSubmit(e);
    showToast('Successfully Updated');
    setIsDisabled(!isDisabled);
}

const toast = useToast();
function showToast(status) {
    toast({
        title: `${status} `,
        status: status,
        isClosable: true,
    });
}

// ===============================================================================

    return (
        <>
        <AlertDialog isOpen={surveySettingAlertOpen1} >
            <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bolsurveySettingAlertClosed">
                Change Starter Package Setting
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to Change Starter Package Setting?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef1} onClick={surveySettingAlertClose1}>
                  No
                </Button>
                <Button colorScheme="red" onClick={confirmChange1} ml={3}>
                  Yes
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

        <AlertDialog isOpen={surveySettingAlertOpen2}>
            <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bolsurveySettingAlertClosed">
              Change Premium Package Setting
              </AlertDialogHeader>

              <AlertDialogBody>
              Are you sure you want to Change Premium Package Setting?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef2} onClick={surveySettingAlertClose2}>
                  No
                </Button>
                <Button colorScheme="red" onClick={confirmChange2} ml={3}>
                  Yes
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

        <AlertDialog isOpen={surveySettingAlertOpen3}>
            <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bolsurveySettingAlertClosed">
               Change Enterprise Package Setting
              </AlertDialogHeader>

              <AlertDialogBody>
              Are you sure you want to Change Enterprise Package Setting?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef3} onClick={surveySettingAlertClose3}>
                  No
                </Button>
                <Button colorScheme="red" onClick={confirmChange3} ml={3}>
                  Yes
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

        {/* ===================================================================================================== */}

        <Card borderRadius={'20px'} width={'100%'}>
            <CardHeader>
                <Heading size={'md'}>Survey Settings</Heading>
            </CardHeader>
            <Divider color={'gray.300'}/>
            <CardBody>
                <Tabs variant='enclosed'colorScheme='purple' >
                    <TabList>
                        <Tab>Starter</Tab>
                        <Tab>Premium</Tab>
                        <Tab>Enterprise</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                        <form onSubmit={handleFirstPackageSubmit} method='POST'>
                            <VStack gap={2}> 
                                <HStack w={'100%'} display={'flex'} justifyContent={'space-between'}>
                                    <Text>Description </Text>
                                    <Textarea id='first' w={'50%'} type="text" placeholder="Enter Survey Cost per Response" value={package1.description} onChange={(e) => setPackage1({ ...package1, description: e.target.value })} disabled={isDisabled} _disabled={{color: 'black'}}/>
                                </HStack>
                                <HStack w={'100%'} display={'flex'} justifyContent={'space-between'}>
                                    <Text>Price </Text>
                                    <Input w={'50%'} type="number" placeholder="Enter Survey Base Cost" value={package1.price} onChange={(e) => setPackage1({ ...package1, price: e.target.value })} disabled={isDisabled} _disabled={{color: 'black'}}/>
                                </HStack>
                                {/*Cost per Response*/}
                                <HStack w={'100%'} display={'flex'} justifyContent={'space-between'}>
                                    <Text>Duration (Days) </Text>
                                    <Input w={'50%'} type="number" placeholder="Enter Survey Cost per Response" value={package1.duration} onChange={(e) => setPackage1({ ...package1, duration: e.target.value })} disabled={isDisabled} _disabled={{color: 'black'}}/>
                                </HStack>
                                <HStack w={'100%'} display={'flex'} justifyContent={'space-between'}>
                                    <Text>Max Responses </Text>
                                    <Input w={'50%'} type="number" placeholder="Enter Survey Cost per Response" value={package1.maxResponses} onChange={(e) => setPackage1({ ...package1, maxResponses: e.target.value })} disabled={isDisabled} _disabled={{color: 'black'}}/>
                                </HStack>
                                <HStack w={'100%'} display={'flex'} justifyContent={'space-between'}>
                                    <Text>Status</Text>
                                    <Switch colorScheme='purple' isChecked={package1.active} onChange={(e) => setPackage1({ ...package1, active: e.target.checked })}  size='lg' disabled={isDisabled} />
                                </HStack>
                            </VStack>

                            {/* change the display of  cancel, save buttons true and package1ChangeBtn display false when click on the package1ChangeBtn button*/}

                                <Button id='package1ChangeBtn' display={'block'} colorScheme="purple" mt={3} onClick={handleFirstPackageChange} float={'right'} size="md">Change</Button>
                                <Button id='package1SaveBtn' type='submit' display={'none'} onClick={saveFirst} colorScheme="purple" mt={3}  float={'right'} size="md">Save</Button>
                                <Button id='package1CancelBtn' display={'none'} onClick={cancelFirst} mr={3} colorScheme="gray" mt={3}  float={'right'} size="md">Cancel</Button>
                            </form>
                        </TabPanel>
                        <TabPanel>
                            <form onSubmit={handleSecondPackageSubmit} method='POST'>
                                <VStack gap={2}> 
                                    <HStack w={'100%'} display={'flex'} justifyContent={'space-between'}>
                                        <Text>Description </Text>
                                        <Textarea w={'50%'} type="text" placeholder="Enter Survey Cost per Response" value={package2.description} onChange={(e) => setPackage2({ ...package2, description: e.target.value })} disabled={isDisabled} _disabled={{color: 'black'}}/>
                                    </HStack>
                                    <HStack w={'100%'} display={'flex'} justifyContent={'space-between'}>
                                        <Text>Price </Text>
                                        <Input w={'50%'} type="number" placeholder="Enter Survey Base Cost" value={package2.price} onChange={(e) => setPackage2({ ...package2, price: e.target.value })} disabled={isDisabled} _disabled={{color: 'black'}}/>
                                    </HStack>
                                    {/*Cost per Response*/}
                                    <HStack w={'100%'} display={'flex'} justifyContent={'space-between'}>
                                        <Text>Duration (Days) </Text>
                                        <Input w={'50%'} type="number" placeholder="Enter Survey Cost per Response" value={package2.duration} onChange={(e) => setPackage2({ ...package2, duration: e.target.value })} disabled={isDisabled} _disabled={{color: 'black'}}/>
                                    </HStack>
                                    <HStack w={'100%'} display={'flex'} justifyContent={'space-between'}>
                                        <Text>Max Responses </Text>
                                        <Input w={'50%'} type="number" placeholder="Enter Survey Cost per Response" value={package2.maxResponses} onChange={(e) => setPackage2({ ...package2, maxResponses: e.target.value })} disabled={isDisabled} _disabled={{color: 'black'}}/>
                                    </HStack>
                                    <HStack w={'100%'} display={'flex'} justifyContent={'space-between'}>
                                        <Text>Status</Text>
                                        <Switch colorScheme='purple' isChecked={package2.active} onChange={(e) => setPackage2({ ...package2, active: e.target.checked })}  size='lg' disabled={isDisabled} />
                                    </HStack>
                                </VStack>
                                    
                                    {/* change the display of  cancel, save buttons true and package1ChangeBtn display false when click on the package1ChangeBtn button*/}
                                        <Button id='package2ChangeBtn' colorScheme="purple" mt={3} onClick={handleSecondPackageChange} float={'right'} size="md">Change</Button>
                                        <Button id='package2SaveBtn' type='submit' display={'none'} onClick={saveSecond} colorScheme="purple" mt={3}  float={'right'} size="md">Save</Button>
                                        <Button id='package2CancelBtn' mr={3} onClick={cancelSecond} display={'none'} colorScheme="gray" mt={3}  float={'right'} size="md">Cancel</Button>
                            </form>
                        </TabPanel>
                        <TabPanel>
                            <form onSubmit={handleThirdPackageSubmit} method='POST'>
                                <VStack gap={2}> 
                                    <HStack w={'100%'} display={'flex'} justifyContent={'space-between'}>
                                        <Text>Description </Text>
                                        <Textarea w={'50%'} type="text" placeholder="Enter Survey Cost per Response" value={package3.description} onChange={(e) => setPackage3({ ...package3, description: e.target.value })} disabled={isDisabled} _disabled={{color: 'black'}}/>
                                    </HStack>
                                    <HStack w={'100%'} display={'flex'} justifyContent={'space-between'}>
                                        <Text>Price </Text>
                                        <Input w={'50%'} type="number" placeholder="Enter Survey Base Cost" value={package3.price} onChange={(e) => setPackage3({ ...package3, price: e.target.value })} disabled={isDisabled} _disabled={{color: 'black'}}/>
                                    </HStack>
                                    {/*Cost per Response*/}
                                    <HStack w={'100%'} display={'flex'} justifyContent={'space-between'}>
                                        <Text>Duration (Days) </Text>
                                        <Input w={'50%'} type="number" placeholder="Enter Survey Cost per Response" value={package3.duration} onChange={(e) => setPackage3({ ...package3, duration: e.target.value })} disabled={isDisabled} _disabled={{color: 'black'}}/>
                                    </HStack>
                                    <HStack w={'100%'} display={'flex'} justifyContent={'space-between'}>
                                        <Text>Max Responses </Text>
                                        <Input w={'50%'} type="number" placeholder="Enter Survey Cost per Response" value={package3.maxResponses} onChange={(e) => setPackage3({ ...package3, maxResponses: e.target.value })} disabled={isDisabled} _disabled={{color: 'black'}}/>
                                    </HStack>
                                    <HStack w={'100%'} display={'flex'} justifyContent={'space-between'}>
                                        <Text>Status</Text>
                                        <Switch colorScheme='purple' isChecked={package3.active} onChange={(e) => setPackage3({ ...package3, active: e.target.checked })}  size='lg' disabled={isDisabled} />
                                    </HStack>
                                </VStack>
                                    
                                    {/* change the display of  cancel, save buttons true and package1ChangeBtn display false when click on the package1ChangeBtn button*/}
                                    <Button id='package3ChangeBtn' colorScheme="purple" mt={3} onClick={handleThirdPackageChange} float={'right'} size="md">Change</Button>
                                    <Button id='package3SaveBtn' type='submit' display={'none'} onClick={saveThird} colorScheme="purple" mt={3}  float={'right'} size="md">Save</Button>
                                    <Button id='package3CancelBtn' mr={3} display={'none'} onClick={cancelThird} colorScheme="gray" mt={3}  float={'right'} size="md">Cancel</Button>
                            </form>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </CardBody>
        </Card>
        </>
    );
    }

export default SurveySettings;