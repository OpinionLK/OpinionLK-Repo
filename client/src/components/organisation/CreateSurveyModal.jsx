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
  Textarea

} from '@chakra-ui/react'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

import axios from 'axios'

const CreateSurveyModal = () => {
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
        creatorID: user.id,
        surveyName: name,
        surveyDescription: description
      });

      console.log(response.data);
      alert('Survey created!');
      onClose();
      // Clear input fields
      setName('');
      setDescription('')
      history('/organisation/survey/' + response.data.surveyID + '/edit');
    } catch (error) {
      console.error('Error creating survey:', error);
      // Handle error and show user-friendly message
      alert('Error creating survey. Please try again.');
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