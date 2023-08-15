import React, {
  useState,
  useEffect
} from 'react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure, Button, FormControl, FormLabel, Input,
  Select,
  Flex, Text,
  VStack,
  Box,
  Menu,
  MenuButton,
  MenuList,
  Textarea,
  Checkbox

} from '@chakra-ui/react'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import SurveyMaker from '../survey-maker/Layout'
import axios from 'axios'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { CheckIcon } from '@chakra-ui/icons';

import { useParams } from 'react-router-dom';

const MoodOption = ({ index }) => {
  const [selectedEmoji, setSelectedEmoji] = useState('grinning');
  function onClick(emoji) {
    console.log(emoji.id)
    setSelectedEmoji(emoji.id)
  }
  return (
    <FormControl id="text" isRequired w={'100%'}>
      <Flex flexDirection={'column'} gap={'20px'}>
        <Flex gap={'10px'}>
          <Menu>
            <MenuButton textAlign={'center'} as={Button} p={'0px'} variant={'solid'} colorScheme='gray' >
              <em-emoji id={selectedEmoji} set="apple" size="2em"></em-emoji>
            </MenuButton>
            <MenuList>
              <Picker data={data} onEmojiSelect={onClick} />

            </MenuList>
          </Menu>
          <Input placeholder={`Option ${index}`} />
        </Flex>
      </Flex>
    </FormControl>
  )
}

const CheckOption = ({ index }) => {

  return (
    <FormControl id="text" isRequired w={'60%'}>
      <Flex flexDirection={'column'} gap={'20px'}>
        <Flex gap={'10px'}>
          <Input placeholder={`Option ${index}`} />
        </Flex>
      </Flex>
    </FormControl>
  )
}
const DropDownOption = ({ index }) => {

  return (
    <FormControl id="text" isRequired w={'60%'}>
      <Flex flexDirection={'column'} gap={'20px'}>
        <Flex gap={'10px'}>
          <Input placeholder={`Option ${index}`} />
        </Flex>
      </Flex>
    </FormControl>
  )
}

const AddQuestionModal = ({ onUpdateContent }) => {
  const { surveyid } = useParams();


  const [type, setType] = useState('text')
  const [showEmoji, setShowEmoji] = useState(true)
  const [moodOptionCount, setMoodOptionCount] = useState(4)
  const [DropdownOptionCount, setDropdownOptionCount] = useState(4)


  // states to store questions

  const [questionText, setQuestion] = useState('')
  const [questionType, setQuestionType] = useState('text')
  const [questionOptions, setQuestionOptions] = useState([])
  const [questionEmoji, setQuestionEmoji] = useState('')
  const [questionRequired, setQuestionRequired] = useState(false)
  const [questionPlaceholder, setQuestionPlaceholder] = useState('')


  const history = useNavigate();



  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  async function handleSubmit(e) {
    e.preventDefault();

    let question = {
      questionText: questionText,
    }
    if (questionType === 'text') {
      question.type = 'text'
      question.placeholder = questionPlaceholder
    }
    console.log(question)

    try {
      const response = await axios.post('http://localhost:3002/api/survey/addQuestion/' + surveyid, {
        question: question,
      });

      console.log(response.data);
      onUpdateContent(response.data);


      onClose();
      // Clear input fields
      setQuestion('');
      setQuestionPlaceholder('')
      history('/organisation/survey/' + response.data.surveyID + '/edit');
    } catch (error) {
      console.error('Error creating question:', error);
      // Handle error and show user-friendly message
      alert('Error creating survey. Please try again.');
    }
  }

  return (


    <>
      <Button onClick={onOpen} colorScheme='facebook'>Add Question</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a survey</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>

            <Flex width={'100%'}>

              <VStack width={'100%'} alignItems={'flex-start'} gap={'20px'}>
                <FormControl id="question" isRequired>
                  <FormLabel>Question</FormLabel>
                  <Input autoComplete="off" onChange={
                    (e) => {
                      setQuestion(e.target.value)
                    }

                  } />
                </FormControl>

                <FormControl width={'100%'} id="type" isRequired>
                  <FormLabel>Type</FormLabel>
                  <Select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
                    <option value="text">Text</option>
                    <option value="radio">Single Choice</option>
                    <option value="mood">Mood</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="dropdown">Dropdown</option>
                  </Select>
                </FormControl>


                {questionType === 'text' ? (
                  <Flex gap={'20px'} w={'100%'}>
                    <FormControl id="text" isRequired w={'100%'}>
                      <FormLabel>Input Placeholder</FormLabel>
                      <Input autoComplete="off" onChange={(e) => { setQuestionPlaceholder(e.target.value) }} />
                    </FormControl>

                    <FormControl id="text" isRequired w={'100%'}>
                      <FormLabel>Response Type</FormLabel>
                      <Select placeholder="Select type" onChange={(e) => (e.target.value)}>
                        <option value="text">Text</option>
                        <option value="email">E-mail</option>
                      </Select>
                    </FormControl>
                  </Flex>

                ) : questionType === 'multiplechoice' ? (
                  <VStack gap={'20px'} w={'100%'} flexDirection={'column'} alignItems={'flex-start'}>
                    <Text>
                      Options
                    </Text>
                    <FormControl id="text" isRequired w={'60%'} gap>
                      <Flex flexDirection={'column'} gap={'20px'}>
                        <Input placeholder='Option 1' />
                        <Input placeholder='Option 2' />
                        <Input placeholder='Option 3' />
                        <Input placeholder='Option 4' />
                      </Flex>

                    </FormControl>
                    <Button>
                      Add Another Option
                    </Button>
                  </VStack>

                ) : questionType === 'mood' ? (
                  <VStack gap={'20px'} w={'100%'} flexDirection={'column'} alignItems={'flex-start'}>
                    <Text>
                      Options
                    </Text>
                    {
                      Array.from(Array(moodOptionCount).keys()).map((item, index) => (
                        <MoodOption index={index + 1} />
                      ))
                    }
                    <Button onClick={
                      () => {
                        setMoodOptionCount(moodOptionCount + 1)
                      }
                    }>
                      Add Another Option
                    </Button>
                  </VStack>
                ) : questionType === 'checkbox' ? (
                  <VStack gap={'20px'} w={'100%'} flexDirection={'column'} alignItems={'flex-start'}>
                    <Text>
                      Options
                    </Text>
                    {
                      Array.from(Array(moodOptionCount).keys()).map((item, index) => (
                        <CheckOption index={index + 1} />
                      ))
                    }
                    <Button onClick={
                      () => {
                        setMoodOptionCount(moodOptionCount + 1)
                      }
                    }>
                      Add Another Option
                    </Button>
                  </VStack>
                ) : questionType === 'dropdown' ? (
                  <VStack gap={'20px'} w={'100%'} flexDirection={'column'} alignItems={'flex-start'}>
                    <Text>
                      Options
                    </Text>
                    {
                      Array.from(Array(DropdownOptionCount).keys()).map((item, index) => (
                        <DropDownOption index={index + 1} />
                      ))
                    }
                    <Button onClick={
                      () => {
                        setDropdownOptionCount(DropdownOptionCount + 1)
                      }
                    }>
                      Add Another Option
                    </Button>
                  </VStack>
                ) : (
                  <div></div>
                )
                }

              </VStack>

            </Flex>

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

export default AddQuestionModal