import react from 'react';
import {
    Box,
    Input,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Stack,
    HStack,
    VStack,
    Heading,
    IconButton,
    Image,
    Icon,
    Textarea,
    Switch,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { FaUpload } from 'react-icons/fa';
import axios from 'axios';
import {
    Model,
} from 'react-modal';

const UpdateCoupon = () => {

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

    const [isOpen, setIsOpen] = react.useState(false);
    const [imageUrl, setImageUrl] = react.useState('');
    const [switchValue, setSwitchValue] = react.useState(false);
    const [coupons, setCoupons] = react.useState([]);

    const openPopup = () => {
        setIsOpen(true);
    }
    const closePopup = () => {
        setIsOpen(false);
    }

    const fetchCoupons = async () => {
        const response = await axios.get('http://localhost:3002/api/admin/coupons');
        setCoupons(response.data);
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        console.log(e.target.value);
    }

    

    return (
        <>
        <Box>
        <Model
            isOpen={isOpen}
            onRequestClose={closePopup}
            contentLabel="Com Manager add Modal"
            ariaHideApp={false}
            style={{
            overlay: {
                zIndex: '1000',
                backgroundColor: 'rgba(0,0,0,0.5)',
            },
            content: {
                width: '1000px',
                height: 'max-content',
                margin: 'auto',
                borderRadius: '10px',
                padding: '20px',
                backgroundColor: '#F8FAFC',
                boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
            },
            }}
        >
            <Flex>
                <Stack w={'100%'}>
                    <form onSubmit={handleUpdate} method='POST'>
                        <HStack justifyContent={'space-between'} mb={'20px'}>
                            <Heading size={'md'}>Update Coupon</Heading>
                            <IconButton
                                colorScheme="gray"
                                aria-label="Call Segun"
                                size="md"
                                icon={<CloseIcon color={'#4318FF'} />}
                                onClick={closePopup}
                            />
                        </HStack>
                        <hr />
                        <Box display={'flex'} flexDirection={'row'}>
                        <Box mr={5} pl={2} mt={5}>
                            <Box position="relative">
                            <Image 
                                src={imageUrl || 'https://picsum.photos/200/300'}
                                // fallbackSrc='https://picsum.photos/200/300'
                                height={'180px'}
                                w={'100%'} 
                                objectFit={'cover'}
                                borderRadius={5}
                                mb={5}
                            />
                            <label htmlFor="upload" style={{ position: 'absolute', bottom: 1, right: 5, cursor: 'pointer' }}>
                                <Icon as={FaUpload} color={'whiteAlpha.900'} boxSize={6} />
                                <Input type="file" id="upload" name="CouponImage" style={{ display: 'none'}} onChange={{/*handleImage*/}} />
                            </label>
                            </Box>
                            <VStack spacing={3}>
                            <FormField label="Coupon Name">
                            <Input
                                type="text"
                                placeholder="Coupon Name"
                                name="CouponName"
                                required
                            />
                            </FormField>
                            <FormField label="Description">
                            <Textarea
                                type="text"
                                placeholder="Description"
                                name="Description"
                                height={'90px'}
                                boxShadow="0 0 5px rgba(0, 0, 0, 0.1)" 
                                bg={'whiteAlpha.900'}
                                required
                            />
                            </FormField>
                            </VStack>
                        </Box>
                        <Box>
                            <Flex
                            mb={'5px'}
                            flexDirection={'column'}
                            justifyContent={'flex-start'}
                            alignItems={'flex-end'}
                            >
                            <VStack spacing={3} align="stretch" width={'100%'} my={'20px'}>

                            <FormField label="Coupon Code">
                                <Input
                                type="text"
                                placeholder="Coupon Code"
                                name="CouponCode"
                                required
                                />
                            </FormField>
                                <FormField label="Start Date">
                                <Input
                                    type="datetime-local"
                                    placeholder="Start Date"
                                    name="StartDate"
                                    required
                                />
                                </FormField>
                                <FormField label="End Date">
                                <Input
                                    type="datetime-local"
                                    placeholder="End Date"
                                    name="EndDate"
                                    required
                                />
                                </FormField>
                                <FormField label="Points Limit">
                                    <Input
                                    type="number"
                                    placeholder="2000"
                                    name="Points"
                                    required
                                    />
                                </FormField>
                                <FormField label="Status" >
                                    <Flex justifyContent="flex-end" alignItems="flex-end">
                                    <Switch
                                        defaultChecked={false}
                                        colorScheme="green"
                                        size={'lg'}
                                        name="Status"
                                        value={switchValue ? 'Active' : 'Inactive'}
                                        onChange={(e) => console.log(e.target.checked)}
                                        required
                                    />
                                    </Flex>
                                </FormField>
                                <FormField label="Count">
                                <NumberInput defaultValue={5} min={1} max={1000} bg={'whiteAlpha.900'} name="Count" boxShadow="0 0 5px rgba(0, 0, 0, 0.1)" > 
                                    <NumberInputField />
                                    <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                </FormField>
                                <FormField label="Company Name">
                                <Input
                                    type="text"
                                    placeholder="Company Name"
                                    name="CompanyName"
                                    required
                                />  
                                </FormField>


                            </VStack>
                            
                            {/*submit button*/}
                            <Flex justifyContent={'flex-end'} width={'100%'} gap={'10px'}>
                                <Button
                                name="submit"
                                align={'right'}
                                width={'100px'}
                                colorScheme="green"
                                type="Submit"
                                >
                                Add
                                </Button>
                                <Button
                                name="cancel"
                                align={'right'}
                                width={'100px'}
                                colorScheme="red"
                                type="cancel"
                                onClick={closePopup}
                                >
                                Cancel
                                </Button>
                            </Flex>
                            </Flex>
                        </Box>
                        </Box>
                    </form>

                </Stack>
            </Flex>
        </Model>
        </Box>
        </>
    )
}

export default UpdateCoupon;