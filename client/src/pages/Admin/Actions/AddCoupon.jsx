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
    } from '@chakra-ui/react';
    import Modal from 'react-modal';
    import axios from 'axios';


const AddCoupon = () => {

    const [isSuccess, setIsSuccess] = useState(false);
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
      const openPopup = () => {
        setIsOpen(true);
      };

      const closePopup = () => {
          setIsOpen(false);
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const formData = {
          CouponName: data.get('CouponName'),
          CouponCode: data.get('CouponCode'),
          Discount: data.get('Discount'),
          Description: data.get('Description'),
          StartDate: data.get('StartDate'),
          EndDate: data.get('EndDate'),
          Status: data.get('Status'),
          count: data.get('count'),
          CompanyName: data.get('CompanyName'),
        };
        console.log(formData);
        try {
          axios.post('http://localhost:3002/api/admin/coupons/add', formData)
            .then(response => {
              console.log('Data submitted successfully:', response.data)
            });
          // alert("Successfully Added");
          closePopup();
          // window.location='/admin';
        }
        catch (err) {
          console.error('Error submitting data:', err);
        }
      }
        

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
                    colorScheme="green"
                    height={'30px'}
                    width={'90px'}
                    borderRadius={'5px'}
                    bg={'green.500'}
                >
                    Add
                </Button>
                <Button
                    colorScheme="purple"
                    height={'30px'}
                    width={'90px'}
                    borderRadius={'5px'}
                    bg={'purple.500'}
                >
                    Search
                </Button>
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
              width: '550px',
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
                <Flex
                  mb={'5px'}
                  flexDirection={'column'}
                  justifyContent={'flex-start'}
                  alignItems={'flex-end'}
                >
                  <VStack spacing={3} align="stretch" width={'100%'} my={'20px'}>
                    <FormField label="Coupon Name">
                      <Input
                        type="text"
                        placeholder="Coupon Name"
                        name="CouponName"
                        required
                      />
                    </FormField>
                    <FormField label="Coupon Code">
                      <Input
                        type="text"
                        placeholder="Coupon Code"
                        name="CouponCode"
                        required
                      />
                    </FormField>
                    <FormField label="Discount">
                      <Input
                        type="number"
                        placeholder="Discount"
                        name="Discount"
                        required
                      />
                    </FormField>
                    <FormField label="Description">
                      <Input
                        type="text"
                        placeholder="Description"
                        name="Description"
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
                      <FormField label={'count'} >
                      <Input
                        type="number"
                        placeholder="count"
                        name="count"
                        required
                      />
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
              </form>
            </Stack>
          </Flex>
        </Modal>
        </>
      );
        
}

export default AddCoupon;