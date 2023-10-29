import { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardBody,
    CardHeader,
    TableContainer,
    Grid,
    Flex,
    Stack,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Input,
    Button,
    IconButton,
    HStack, 
    FormControl,
    FormLabel,
    VStack,
    Switch,
    Heading,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    NumberInput,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, CloseIcon } from '@chakra-ui/icons';
import Modal from 'react-modal';
import UpdateCoupon from '../Components/UpdateCoupons';
import axios from 'axios';


const FormField = ({ label, children }) => {
    return (
      <FormControl display="flex" alignItems="center">
        <FormLabel marginRight="1rem" width="150px">
          {label}
        </FormLabel>
        <Flex flexDirection="column" width="100%" gap="10px">
          {children}
        </Flex>
      </FormControl>
    );
  };


const CouponTable = () => {

  const [filterText, setFilterText] = useState('');
  const [coupons, setCoupons] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    id: null
  });

  const cancelRef = () => {
    return null;
  }
  
  //fetch coupon details
  const fetchCoupons = async () => {
    try {
        const res = await axios.get('http://localhost:3002/api/admin/coupons');
        const data = res.data;
        setCoupons(data);
    }
    catch (err) {
        console.error('Error fetching Coupons:', err);
    }
  } 

  //total coupon count
  const getTotalCoupons = () => {
      return coupons.length;
  }

    const md = 'md';
    const lg = "lg";

      useEffect(() => {
        fetchCoupons();
    }, []);



    const onDelete = (id) => {
        setDeleteConfirmation({
            isOpen: true,
            id: id
        });
    }

    const onDeleteConfirmationClose = () => {
        setDeleteConfirmation({
            isOpen: false,
            id: null
        });
    }

    const onDeleteConfirm = async () => {
        try {
            await axios.delete(`http://localhost:3002/api/admin/coupons/delete/${deleteConfirmation.id}`);
            fetchCoupons();
            onDeleteConfirmationClose();
        }
        catch (err) {
            console.error('Error deleting Coupon:', err);
        }
    }

    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [editedValues, setEditedValues] = useState({
      CouponImage: '',
      CouponName: '',
      CompanyName: '',
      CouponCode: '',
      Description: '',
      StartDate: '',
      EndDate: '',
      Points: '',
      Status: '',
      Count: ''

    });
    const [isOpen, setIsOpen] = useState(false);

    const onEdit = (id) => {
      const coupon = coupons.find(coupon => coupon._id === id);
      setSelectedCoupon(coupon);
      setEditedValues({
        CouponName: coupon.CouponName,
        CompanyName: coupon.CompanyName,
        Description: coupon.Description,
        CouponCode: coupon.CouponCode,
        StartDate: coupon.StartDate,
        EndDate: coupon.EndDate,
        Status: coupon.Status,
        Count: coupon.Count
      });
      setIsOpen(true);
    }
    

    const closeEditPopup = () => {
        setIsOpen(false);
    }

    const handleEditInputChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setEditedValues(prevState => ({
            ...prevState,
            [key]: value
        }));
    }
    

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
          const response = await axios.put(`http://localhost:3002/api/admin/coupons/update/${selectedCoupon._id}`, editedValues);
            const data = response.data;
            console.log(data);
            fetchCoupons();
            closeEditPopup();
        }
        catch (err) {
            console.error('Error updating Coupon:', err);
        }
    }

    const [switchValue, setSwitchValue] = useState(false);
    
    const editCoupon = () => {
      return (
        <UpdateCoupon />
      )
    }

    return (
        <>
        {/* <Modal
            isOpen={isOpen}
            onRequestClose={closeEditPopup}
            contentLabel="Example Modal"
            ariaHideApp={false}
            size={md}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    zIndex: 1000
                },
                content: {
                    width: '500px',
                    height: 'max-content',
                    margin: 'auto',
                    borderRadius: '10px',
                    padding: '20px',
                    backgroundColor: '#F8FAFC',
                    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
                }
            }} 
        >
        <Flex>
          <Stack width={'100%'}>
            <form onSubmit={handleSubmit} method='POST'>
              <HStack justifyContent={'space-between'} mb={'20px'}>
                <Heading size={'md'}>Update Coupon Details</Heading>
                <IconButton
                  colorScheme="purple"
                  borderRadius={'10px'}
                  // bg={'gray.200'}
                  color={'#fff'}
                  aria-label="Call Segun"
                  size="sm"
                  icon={<CloseIcon />}
                  onClick={closeEditPopup}
                />
              </HStack>
              <hr></hr>
              <Flex
                mb={'5px'}
                flexDirection={'column'}
                justifyContent={'flex-start'}
                alignItems={'flex-end'}
              >
                {selectedCoupon && ( // Check if selectedManager is not null
                  <VStack
                    spacing={3}
                    align="stretch"
                    width={'100%'}
                    my={'20px'}
                  >
                    <FormField label="Coupon Name">
                      <Input
                        type="text"
                        name="CouponName"
                        value={editedValues.CouponName || selectedCoupon.CouponName}
                        onChange={handleEditInputChange}
                      />
                    </FormField>
                    <FormField label="Company Name">
                        <Input
                            type="text"
                            name="CompanyName"
                            value={editedValues.CompanyName || selectedCoupon.CompanyName}
                            onChange={handleEditInputChange}
                        />
                    </FormField>
                    <FormField label="Coupon Code">
                        <Input
                            type="text"
                            name="CouponCode"
                            value={editedValues.CouponCode || selectedCoupon.CouponCode}
                            onChange={handleEditInputChange}
                        />
                    </FormField>
                    <FormField label="Description">
                        <Input
                            type="text"
                            name="Description"
                            value={editedValues.Description || selectedCoupon.Description}
                            onChange={handleEditInputChange}
                        />
                    </FormField>
                    <FormField label="Start Date">
                        <Input
                            type="datetime-local"
                            name="StartDate"
                            value={editedValues.StartDate || selectedCoupon.StartDate}
                            onChange={handleEditInputChange}
                        />
                    </FormField>
                    <FormField label="End Date">
                        <Input
                            type="datetime-local"
                            name="EndDate"
                            value={editedValues.EndDate || selectedCoupon.EndDate}
                            onChange={handleEditInputChange}
                        />
                    </FormField>
                    <FormField label="Count">
                        <NumberInput 
                            name="Count"
                            value={editedValues.Count || selectedCoupon.Count}
                            min={1} 
                            max={1000} 
                            bg={'whiteAlpha.900'} 
                            boxShadow="0 0 5px rgba(0, 0, 0, 0.1)" 
                            onChange={handleEditInputChange}
                        >
                        </NumberInput>
                    </FormField>
                    <FormField label="Status">
                        <Input
                            type="text"
                            name="Status"
                            value={editedValues.Status || selectedCoupon.Status}
                            onChange={handleEditInputChange}
                        />
                    </FormField>

                    <FormField label="Status" >
                        <Flex justifyContent="flex-end" alignItems="flex-end">
                          <Switch
                            defaultChecked={false}
                            colorScheme="green"
                            size={'lg'}
                            name="Status"
                            value={switchValue ? 'Inactive' : 'Active'}
                            onChange={setSwitchValue}
                            required
                          />
                        </Flex>
                      </FormField>
                  </VStack>
                )}

                <Button
                  name="submit"
                  align={'right'}
                  width={'100px'}
                  colorScheme="green"
                  type="submit"
                >
                  Update
                </Button>
              </Flex>
            </form>
          </Stack>
        </Flex>
        </Modal> */}
        <Box>
        <Grid templateColumns="repeat(1, 1fr)">
            <Flex overflowX="scroll">
            <Stack width={'100%'}>
                <Card borderRadius={'20px'} width={'100%'}>
                <CardHeader  display={'flex'} flexDirection={'row'}>
                    <Heading color={'purple.900'}  size={'md'}>Coupons</Heading>
                    <Box>
                      <Input
                        type='search'
                        placeholder = 'Search by Name or Email...'
                        fontSize={'14px'}
                        width={'250px'}
                        ml={'20px'}
                        px={2}
                        py={1}
                        height={'30px'}
                        borderRadius={'8px'}
                        // onChange={(e) => setFilterText(e.target.value)}
                        // value ={filterText}
                        />
                    </Box>
                </CardHeader>
                <hr></hr>
                <CardBody>
                    <TableContainer>
                    <Table variant="striped" colorScheme='gray' size={'sm'}>
                        <TableCaption>
                          Total Coupons: {getTotalCoupons()}
                        </TableCaption>
                        <Thead>
                        <Tr>
                            <Th>Coupon Name</Th>
                            <Th>Organization</Th>
                            <Th>Description</Th>
                            <Th>Code</Th>
                            <Th>Status</Th>
                            <Th>Start Date</Th>
                            <Th>End Date</Th>
                            <Th>Actions</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                            {coupons.map(coupon => (
                                <Tr key={coupon._id}>
                                    <Td>{coupon.CouponName}</Td>
                                    <Td>{coupon.CompanyName}</Td>
                                    <Td>{coupon.Description}</Td>
                                    <Td>{coupon.CouponCode}</Td>
                                    <Td>{coupon.Status}</Td>
                                    <Td>{coupon.StartDate}</Td>
                                    <Td>{coupon.EndDate}</Td>
                                    <Td>
                                        <HStack>
                                            <IconButton
                                                colorScheme="green"
                                                aria-label="Edit"
                                                icon={<EditIcon />}
                                                size={'sm'}
                                                onClick={editCoupon}
                                            />
                                            <IconButton
                                                colorScheme="red"
                                                aria-label="Delete"
                                                icon={<DeleteIcon />}
                                                size={'sm'}
                                                onClick={()=>onDelete(coupon._id)}
                                            />
                                        </HStack>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                    </TableContainer>
                </CardBody>
                </Card>
            </Stack>
            </Flex>
        </Grid>
        </Box>

        <AlertDialog
            isOpen={deleteConfirmation.isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onDeleteConfirmationClose}
          >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Manager
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to delete this manager?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onDeleteConfirmationClose}>
                  No
                </Button>
                <Button colorScheme="red" onClick={onDeleteConfirm} ml={3}>
                  Yes
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        </>
    );
}

export default CouponTable;