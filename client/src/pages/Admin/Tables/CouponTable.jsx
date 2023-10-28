import { useState, useEffect, useRef } from 'react';
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
    Heading,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import UpdateCoupon from '../Components/UpdateCoupons';
import axios from 'axios';


const CouponTable = () => {

  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    id: null
  });

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
    useEffect(() => {
        fetchCoupons();
    }, []);

    // Update Coupon
    const [isOpen, setIsOpen] = useState(false);

    const editCoupon = (id) => {
      const coupon = coupons.find((coupon) => coupon._id === id);
      setSelectedCoupon(coupon);
      onOpen();
    };

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    const onDelete = (id) => {   //Delete coupon
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

    const cancelRef = useRef();

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

    return (
        <>
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
                                                colorScheme="purple"
                                                aria-label="Edit"
                                                icon={<EditIcon />}
                                                size={'sm'}
                                                onClick={() => editCoupon(coupon._id)}
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
                </CardBody>selectedCoupon
                </Card>
            </Stack>
            </Flex>
        </Grid>
        </Box>

        <UpdateCoupon />

        {isOpen && selectedCoupon && (
          <UpdateCoupon 
            isOpen={isOpen}
            onClose={onClose}
            coupon={selectedCoupon}
          />
        )}


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