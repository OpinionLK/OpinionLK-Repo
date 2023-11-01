import React from 'react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure, Button, FormControl, FormLabel, Input,
  Textarea,
  useToast

} from '@chakra-ui/react'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

import axios from 'axios'

const CreateSurveyModal = () => {
  // toast
  const toast = useToast();
  const history = useNavigate();

  const { user } = useAuthContext()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3002/api/survey/create', {
        surveyName: name,
        surveyDescription: description
      },
        {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        }
      );

      console.log(response.data);
      // Show success toast
      toast({
        title: 'Survey created.',
        description: 'We\'ve created your survey for you.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
      // Clear input fields
      setName('');
      setDescription('')
      history('/organisation/survey/' + response.data.surveyID + '/edit');
    } catch (error) {
      console.error('Error creating survey:', error);
      // Handle error and show user-friendly message
      toast({
        title: 'An error occurred.',
        description: 'Unable to create survey.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }

  return (
    <>
      <Button onClick={onOpen} colorScheme='facebook'>Create a Survey</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a survey</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Survey name</FormLabel>
              <Input ref={initialRef} placeholder='Survey name' onChange={
                (e) => {
                  setName(e.target.value)
                }
              } />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea placeholder='A description on what the survey is about' onChange={
                (e) => {
                  setDescription(e.target.value)
                }
              } ref={finalRef
              } />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={
              handleSubmit
            }>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateSurveyModal