import React from "react";
import { useState } from "react";

import {
    Flex,
    Stack,
    Heading,
    Button,
    IconButton,
    HStack,
    Input,
    FormControl,
    FormLabel,
    VStack,
    Box,
    Switch,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Image,
    Textarea,
    Icon,
    useToast
    } from '@chakra-ui/react';
    import Modal from 'react-modal';
    import { FaUpload } from 'react-icons/fa'; 
    import axios from 'axios';

const AddCoupon = () => {
    const [switchValue, setSwitchValue] = useState(false);
    
    const CloseIcon = () => (
        <svg
            width="24"
            viewBox="0 0 18 18"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
        >
            <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 7.58579L14.2929 2.29289L15.7071 3.70711L10.4142 9L15.7071 14.2929L14.2929 15.7071L9 10.4142L3.70711 15.7071L2.29289 14.2929L7.58579 9L2.29289 3.70711L3.70711 2.29289L9 7.58579Z"
            />
        </svg>
    );

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

      const [isOpen, setIsOpen] = useState(false);
      const [imageUrl, setImageUrl] = useState('');
      const toast = useToast()
      const addCoupon = new Promise((resolve, reject) => {
        setTimeout(() => resolve(200), 5000)
      });

      const openPopup = () => {
        setIsOpen(true);
      };

      const closePopup = () => {
          setIsOpen(false);
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const CouponImage = data.get('CouponImage');
        console.log(CouponImage);
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };
        
        try {
          toast.promise(addCoupon, {
            success: { title: 'Coupon added successfully', description: 'Coupons are available in the coupons table' },
            error: { title: 'Error adding coupon', description: 'Something wrong' },
            loading: { title: 'Adding new Coupon', description: 'Please wait' },
          })
          axios
            .post('http://localhost:3002/api/admin/coupons/add', data, config)
            .then((res) => {
              console.log(res.data);
              closePopup();
            })
            .catch((err) => {
              console.log(err);
              toast({
                title: "Error",
                description: "Something went wrong! Please try again later",
                status: "error",
                duration: 9000,
                isClosable: true,
              })
            });
        }
        catch (err) {
          console.log(err);
          toast({
            title: "Error",
            description: "Something went wrong! Please try again later",
            status: "error",
            duration: 9000,
            isClosable: true,
          })
        }
      };

      const handleImage = (e) => {
        const selectedImage = e.target.files[0]; // Get the selected image file
        const imageUrl = URL.createObjectURL(selectedImage); // Create a temporary URL for the selected image
        setImageUrl(imageUrl); // Update the imageUrl state
      };


      return (
        <>
        <Box display={'flex'} flexDirection={'row'} w={'100%'} justifyContent={'space-between'}>
            <Box>
            <Heading size={'sm'} fontWeight={'medium'}>Coupons</Heading>
            </Box>
            <Box>
            <HStack gap={'12px'} justifyItems={'flex-end'}>
                <Button
                    onClick={openPopup}
                    colorScheme="purple"
                    height={'30px'}
                    width={'90px'}
                >
                    Add
                </Button>
                {/* <Button
                    colorScheme="purple"
                    height={'30px'}
                    width={'90px'}
                    borderRadius={'5px'}
                    bg={'purple.500'}
                >
                    View
                </Button> */}
                </HStack>
            </Box>
        </Box>

        <Modal
          isOpen={isOpen}
          // onRequestClose={closePopup}
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
            <Stack width={'100%'}>
              <form onSubmit={handleSubmit}>
                <HStack justifyContent={'space-between'} mb={'20px'}>
                  <Heading size={'md'}>Add Coupon</Heading>
                  <IconButton
                    colorScheme="gray"
                    aria-label="Call Segun"
                    size="md"
                    icon={<CloseIcon color={'#4318FF'} />}
                    onClick={closePopup}
                  />
                </HStack>
                <hr></hr>
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
                          <Input type="file" id="upload" name="CouponImage" style={{ display: 'none'}} onChange={handleImage} />
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
        </Modal>
        </>
      );
        
}

export default AddCoupon;