import React from "react";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Modal,
  Radio,
  RadioGroup,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Checkbox,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  FormControl,
  Menu,
  MenuButton,
  MenuList,
  FormErrorMessage,
  useDisclosure,
  Flex,
  Box,
  Select,
  VStack,
  FormLabel,
  Heading,
  IconButton,
  Textarea,
} from '@chakra-ui/react'

import { useParams } from 'react-router-dom';
import axios from 'axios';

import { useAuthContext } from '../../hooks/useAuthContext';
import { DeleteIcon } from '@chakra-ui/icons'
import {  motion } from "framer-motion";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
// eslint-disable-next-line
function CompExample() {
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true })

  return isVisible ? (
    <Alert status='success'>
      <AlertIcon />
      <Box>
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>
          Your application has been received. We will review your application
          and respond within the next 48 hours.
        </AlertDescription>
      </Box>
      <CloseButton
        alignSelf='flex-start'
        position='relative'
        right={-1}
        top={-1}
        onClick={onClose}
      />
    </Alert>
  ) : (
    <Button onClick={onOpen}>Show Alert</Button>
  )
}


const MoodOption = ({ index, register, setValue, items, fields, remove }) => {
  // eslint-disable-next-line
  const [selectedEmoji, setSelectedEmoji] = useState('grinning');
  function onClick(emoji) {
    setValue(`items.${index}.emoji`, emoji.id)
  }
  return (

    <FormControl id="text" isRequired w={'100%'}>

      <Flex flexDirection={'column'} gap={'20px'} width={'100%'}>
        <Flex gap={'10px'} width={'100%'}>
          <Menu>
            <MenuButton textAlign={'center'} as={Button} p={'0px'} variant={'solid'} colorScheme='gray' >
              <em-emoji id={items[index].emoji} set="apple" size="2em"></em-emoji>
            </MenuButton>
            <MenuList>
              <Picker data={data} onEmojiSelect={onClick} />
            </MenuList>
          </Menu>
          <Input width={'100%'} placeholder={`Option ${index + 1}`} name={`EmojiOption ${index}`} {...register(`items.${index}.option`, { required: true })} />
          {fields.length > 2 && (
            <IconButton type="button" onClick={() => remove(index)} icon={<DeleteIcon />} />

          )}
        </Flex>
      </Flex>
    </FormControl>
  )
}
const FailAlert = () => {
  return (
    <Alert status='error'>
      <AlertIcon />
      <AlertTitle>Your browser is outdated!</AlertTitle>
      <AlertDescription>Your Chakra experience may be degraded.</AlertDescription>
    </Alert>
  )
}

function BasicUsage({ onUpdateContent }) {

  const { surveyid } = useParams();

  const {
    // eslint-disable-next-line
    user, dispatch, userData
  } = useAuthContext();

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { register, control, handleSubmit, watch, reset, setValue } = useForm({
    defaultValues: {
      question: "",
      responseType: "",
      textPlaceholder: "",
      items: [{ option: "" }, { option: "" }, { option: "" }, { option: "" }],
    },
  });
  const response = watch("responseType");
  // eslint-disable-next-line
  const question = watch("question");
  const textPlaceholder = watch("textPlaceholder");
  const items = watch("items");


  // async function handleSubmit(e) {
  // e.preventDefault();

  //   let question = {
  //     questionText: questionText,
  //   }
  //   if (questionType === 'text') {
  //     question.type = 'text'
  //     question.placeholder = questionPlaceholder
  //   }
  //   console.log(question)

  //   try {
  //     const response = await axios.post('http://localhost:3002/api/survey/addQuestion/' + surveyid, {
  //       question: question,
  //     });

  //     console.log(response.data);
  //     onUpdateContent(response.data);


  //     onClose();
  //     // Clear input fields
  //     setQuestion('');
  //     setQuestionPlaceholder('')
  //     history('/organisation/survey/' + response.data.surveyID + '/edit');
  //   } catch (error) {
  //     console.error('Error creating question:', error);
  //     // Handle error and show user-friendly message
  //     alert('Error creating survey. Please try again.');
  //   }
  // }

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post('http://localhost:3002/api/survey/addQuestion/' + surveyid, {
        data
      }, {
        headers: { 'Authorization': `Bearer ${user.token}` },
      }
      );
      console.log(response.data);
      onUpdateContent(response.data);
      onClose();
    }
    catch (error) {
      console.log(error);
    }

    // handle form submission here
  };

  const handleResponseTypeChange = (event) => {
    if (event.target.value === "shorttext") {
      reset({
        responseType: event.target.value,
        textPlaceholder: "",
      });
    } else if (event.target.value === "longtext") {
      reset({
        responseType: event.target.value,
        textPlaceholder: "",
      });

    } else if (event.target.value === "singlechoice") {
      reset({
        responseType: event.target.value,
        items: [{ option: "" }, { option: "" }, { option: "" }, { option: "" }],
      });
    } else if (event.target.value === "multiplechoice") {
      reset({
        responseType: event.target.value,
        items: [{ option: "" }, { option: "" }, { option: "" }, { option: "" }],
      });
    } else if (event.target.value === "mood") {
      reset({
        responseType: event.target.value,
        items: [{ option: "", emoji: "grinning" }, { option: "", emoji: "scream" }, { option: "", emoji: "sleeping" }, { option: "", emoji: "nauseated_face" }],
      });
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Add Question</Button>

      <Modal size={'full'} width={'60%'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent  >
          <ModalHeader>Add a Question</ModalHeader>
          <ModalCloseButton />
          <ModalBody alignItems={'flex-start'} justifyContent={'center'} display={'flex'}>
            <Flex width={'80%'} height={'100%'} gap={'40px'} justifyContent={'center'} alignItems={'flex-start'}>

              <form style={{ width: '50%', height: '100%' }} onSubmit={handleSubmit(onSubmit)}>
                <VStack gap={'10px'} alignItems={'flex-start'} justifyContent={'flex-start'}>
                  <label htmlFor="question">Question:</label>
                  <Input {...register("question", { required: true })} />

                  <label htmlFor="responseType">Response Type:</label>
                  <Select
                    {...register("responseType", { required: true })}
                    onChange={handleResponseTypeChange}
                  >
                    <option value="">--Please choose an option--</option>
                    <option value="shorttext">Text Response</option>
                    <option value="longtext">Long Text Response</option>
                    <option value="mood">Mood Scale</option>
                    <option value="singlechoice">Single Choice</option>
                    <option value="multiplechoice">Multiple Choice</option>
                  </Select>

                  {response === "shorttext" && (
                    <motion.div
                      key={'shorttext'}
                      width={'100%'}
                      initial={{ opacity: 0, width: '100%' }}
                      animate={{ opacity: 1, transition: { duration: 0.3 } }}
                      exit={{ opacity: 0, transition: { duration: 0.3 } }}

                    >
                      <FormControl
                      // isInvalid={errors.name}
                      >
                        <Flex gap={'10px'}>
                          <Flex flexDirection={'column'} width={'100%'}>

                            <FormLabel>Input Placholder</FormLabel>
                            <Input
                              {...register(`textPlaceholder`, { required: true })}
                              defaultValue={textPlaceholder}
                            />
                          </Flex>

                        </Flex>
                        {/* </VStack> */}
                        <FormErrorMessage>
                          {/* {errors.name && errors.name.message} */}
                        </FormErrorMessage>
                      </FormControl>
                    </motion.div>
                  )}
                  {response === "longtext" && (
                    <motion.div
                      key={'longtext'}
                      initial={{ opacity: 0, width: '100%' }}
                      animate={{ opacity: 1, width: '100%', transition: { duration: 0.3 } }}
                      exit={{ opacity: 0, transition: { duration: 0.3 } }}
                    >
                      <FormControl
                      // isInvalid={errors.name}
                      >
                        {/* <VStack gap={'10px'} mt={'30px'}> */}
                        <Flex gap={'10px'}>
                          <Flex flexDirection={'column'} width={'100%'}>

                            <FormLabel>TextArea Placholder</FormLabel>
                            <Input
                              {...register(`textPlaceholder`, { required: true })}
                              defaultValue={textPlaceholder}
                            />
                          </Flex>

                        </Flex>
                        {/* </VStack> */}
                        <FormErrorMessage>
                          {/* {errors.name && errors.name.message} */}
                        </FormErrorMessage>
                      </FormControl>
                    </motion.div>
                  )}

                  {response === "singlechoice" && (
                    <motion.div
                      key="singlechoice"
                      initial={{ opacity: 0, width: '100%' }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.3 } }}
                      width={'100%'}
                    >
                      <VStack gap={'20px'} alignItems={'flex-start'} mt={'30px'} width={'100%'}>
                        <Text>Options</Text>
                        {fields.map((field, index) => (
                          <Flex alignItems={'center'} width={'100%'} gap={'20px'} key={field.id}>

                            <Input
                              {...register(`items.${index}.option`, { required: true })}
                              placeholder={`Option ${index + 1}`}
                            // defaultValue={field.option}
                            />
                            {
                              fields.length > 2 && (
                                <IconButton type="button" onClick={() => remove(index)} icon={<DeleteIcon />} />
                              )
                            }

                          </Flex>

                        ))}
                      </VStack>
                      <Button mt={'20px'} type="button" variant={'outline'} onClick={() => append({ option: "" })}>
                        Add Another Option
                      </Button>
                    </motion.div>
                  )}
                  {response === "multiplechoice" && (
                    <motion.div
                      key="multiplechoice"
                      initial={{ opacity: 0, width: '100%' }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.3 } }}
                      width={'100%'}
                    >
                      <VStack gap={'20px'} alignItems={'flex-start'} mt={'30px'} width={'100%'}>
                        <Text>Options</Text>
                        {fields.map((field, index) => (
                          <Flex alignItems={'center'} width={'100%'} gap={'20px'} key={field.id}>

                            <Input
                              {...register(`items.${index}.option`, { required: true })}
                              placeholder={`Option ${index + 1}`}
                              defaultValue={field.option}
                            />
                            {
                              fields.length > 2 && (
                                <IconButton type="button" onClick={() => remove(index)} icon={<DeleteIcon />} />
                              )
                            }

                          </Flex>

                        ))}
                      </VStack>
                      <Button mt={'20px'} type="button" variant={'outline'} onClick={() => append({ option: "" })}>
                        Add Another Option
                      </Button>
                    </motion.div>
                  )}

                  {response === "mood" && (

                    <motion.div
                      key="mood"
                      initial={{ opacity: 0, width: '100%' }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.3 } }}
                      width={'100%'}
                    >
                      <VStack gap={'20px'} alignItems={'flex-start'} mt={'30px'} width={'100%'}>
                        <Text>Options</Text>
                        {fields.map((field, index) => (
                          <Box width={'100%'} key={field.id}>
                            <MoodOption index={index} register={register} setValue={setValue} items={items} remove={remove} fields={fields} />

                          </Box>
                        ))}
                      </VStack>
                      <Button mt={'20px'} type="button" onClick={() => append({ option: "", emoji: "scream" })}>
                        Add Emoji Option
                      </Button>
                    </motion.div>
                  )}


                  <Button mt={'20px'} colorScheme="messenger" type="submit">Save Changes</Button>
                </VStack>
              </form>
              <VStack width={'50%'} gap={'30px'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
                <Heading as={'h2'} size={'md'}>Preview</Heading>
                <Flex border={'1px'} borderColor={'brand.purple'} backgroundColor={'#FBFBFB'} height={'auto'} width={'90%'} justifyContent={'center'} alignItems={'center'} borderRadius={'2xl'} flexDirection={'column'}>
                  <Flex alignItems={'center'} justifyContent={'flex-start'} padding={'20px'} width={'100%'}>
                    {response === "shorttext" && (
                      <Input placeholder={textPlaceholder} width={'100%'} />
                    )}
                    {response === "longtext" && (
                      <Textarea placeholder={textPlaceholder} borderColor={'#D2D2D2'} backgroundColor={'white'} width={'100%'} variant={'outline'} colorScheme="whiteAlpha" />
                    )}
                    {response === "singlechoice" && (
                      <Flex flexDirection={'column'}>
                        <RadioGroup defaultValue="1">
                          {
                            items.map((item, index) => (
                              <Flex gap={'10px'}>
                                <Radio value={index} backgroundColor={'white'}>
                                  <Text>{!item.option ? `Option ${index + 1}` : item.option}</Text>
                                </Radio>
                                {/* // <li key={index}>{item.option}</li> */}
                              </Flex>
                            ))
                          }
                        </RadioGroup>
                      </Flex>
                    )}
                    {response === "multiplechoice" && (
                      <Flex flexDirection={'column'}>
                        <RadioGroup defaultValue="1">
                          {
                            items.map((item, index) => (
                              <Flex gap={'10px'}>
                                <Checkbox>
                                  <Text>{!item.option ? `Option ${index + 1}` : item.option}</Text>
                                </Checkbox>
                              </Flex>
                            ))
                          }
                        </RadioGroup>
                      </Flex>
                    )}
                    {response === "mood" && (
                      <Flex gap={'10px'} wrap={'wrap'}>
                        {
                          items.map((item, index) => (
                            <Flex>
                              <Flex gap={'0px'} height={'100px'} width={'100px'} backgroundColor={'white'} justifyContent={'center'} alignItems={'center'} boxShadow={'lg'} border={'1px'} borderColor={'gray'} borderRadius={'lg'} flexDirection={'column'}>
                                <Flex fontSize='60px' lineHeight={'65px'}>
                                  <em-emoji id={items[index].emoji} set="apple" size=""></em-emoji>
                                </Flex>
                                <Text noOfLines={1} width={'90%'} textAlign={'center'}>{!item.option ? `Option ${index + 1}` : item.option}</Text>
                              </Flex>
                            </Flex>

                          ))
                        }
                      </Flex>
                    )
                    }
                  </Flex>
                </Flex>
              </VStack>
            </Flex>
          </ModalBody>

          <ModalFooter>
            
            <FailAlert />

          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default BasicUsage;
