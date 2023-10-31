import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Modal,
  RadioGroup,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Button,
  Input,
  Text,
  FormControl,
  Menu,
  MenuButton,
  ModalBody,
  ModalFooter,
  Checkbox,
  Radio,
  MenuList,
  useDisclosure,
  Flex,
  Box,
  Select,
  VStack,
  FormLabel,
  Heading,
  IconButton,
  Textarea,
} from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import axios from "axios";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useAuthContext } from "../../hooks/useAuthContext";
// eslint-disable-next-line
function QuestionForm({ onUpdateContent, questionID, refreshdata, mode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { surveyid } = useParams();
  const { user } = useAuthContext();


  const { register, control, handleSubmit, watch, reset, setValue } = useForm({
    defaultValues: {
      question: "",
      responseType: "",
      textPlaceholder: "",
      items: [{ option: "" }, { option: "" }, { option: "" }, { option: "" }],
    },
  });

  // watch the response type and text placeholder
  const response = watch("responseType");
  const textPlaceholder = watch("textPlaceholder");
  const items = watch("items");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  const [isQuestionLoaded, setIsQuestionLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit") {
        getQuestion();
      } else {
        setIsQuestionLoaded(true);
      }
    }
    // eslint-disable-next-line
  }, [isOpen]);


  // get the quesetion data upon opening the modal
  const getQuestion = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/api/client/getQuestion/${surveyid}/${questionID}`);
      const responseData = response.data[0];
      setValue("question", responseData.question);
      setValue("responseType", responseData.responseType);

      if (responseData.responseType === "shorttext" || responseData.responseType === "longtext") {
        setValue("textPlaceholder", responseData.textPlaceholder);
      } else if (responseData.responseType === "singlechoice" || responseData.responseType === "multiplechoice") {
        setValue("items", responseData.items);
      } else if (responseData.responseType === "mood") {
        setValue("items", responseData.items);
      }
      setIsQuestionLoaded(true);

      // console.log(responseData);
    } catch (error) {
      // console.log(error);
    }
  };


  // submit the form data to the backend  
  const onSubmit = async (data) => {


    let URL = null;
    let method = 'POST';

    if (mode === "edit") {
      URL = `http://localhost:3002/api/client/editQuestion/${surveyid}/${questionID}`;
      method = 'PUT';
    } else {
      URL = `http://localhost:3002/api/survey/addQuestion/${surveyid}`;
    }
    try {
      // eslint-disable-next-line
      const response = await axios.request({
        url: URL,
        method: method, // Use the dynamic method here
        data: { data },
        headers: { Authorization: `Bearer ${user.token}` },
      });
      refreshdata();
      onClose();
    } catch (error) {
      // console.log(error);
    }
  };

  // handle the response type change
  const handleResponseTypeChange = (event) => {
    const resetValues = {
      responseType: event.target.value,
      textPlaceholder: "",
    };

    if (event.target.value === "singlechoice" || event.target.value === "multiplechoice") {
      resetValues.items = [{ option: "" }, { option: "" }, { option: "" }, { option: "" }];
    } else if (event.target.value === "mood") {
      resetValues.items = [
        { option: "", emoji: "grinning" },
        { option: "", emoji: "scream" },
        { option: "", emoji: "sleeping" },
        { option: "", emoji: "nauseated_face" },
      ];
    }

    reset(resetValues);
  };

  return (
    <>
      <IconButton aria-label={"delete"} icon={<EditIcon />} onClick={onOpen} />
      <Modal variant={"editModal"} width={"60%"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a Question</ModalHeader>
          <ModalCloseButton />
          <ModalBody alignItems={"flex-start"} justifyContent={"center"} display={"flex"}>
            {isQuestionLoaded ? (
              <Flex padding={"20px"} width={"100%"} height={"100%"} gap={"40px"} justifyContent={"center"} alignItems={"flex-start"}>
                <form style={{ width: "50%", height: "100%" }} onSubmit={handleSubmit(onSubmit)}>
                  <VStack gap={"10px"} alignItems={"flex-start"} justifyContent={"flex-start"}>
                    <label htmlFor="question">Question:</label>
                    <Input {...register("question", { required: true })} />

                    <label htmlFor="responseType">Response Type:</label>
                    <Select {...register("responseType", { required: true })} onChange={handleResponseTypeChange}>
                      <option value="">--Please choose an option--</option>
                      <option value="shorttext">Text Response</option>
                      <option value="longtext">Long Text Response</option>
                      <option value="mood">Mood Scale</option>
                      <option value="singlechoice">Single Choice</option>
                      <option value="multiplechoice">Multiple Choice</option>
                    </Select>

                    {response === "shorttext" && (
                      // <motion.div key={"shorttext"} initial={{ opacity: 0, width: "100%" }} animate={{ opacity: 1, transition: { duration: 0.3 } }} exit={{ opacity: 0, transition: { duration: 0.3 } }}>
                      <FormControl>
                        <Flex gap={"10px"}>
                          <Flex flexDirection={"column"} width={"100%"}>
                            <FormLabel>Input Placeholder</FormLabel>
                            <Input {...register(`textPlaceholder`, { required: true })} defaultValue={textPlaceholder} />
                          </Flex>
                        </Flex>
                      </FormControl>
                      // </motion.div>
                    )}

                    {response === "longtext" && (
                      // <motion.div key={"longtext"} initial={{ opacity: 0, width: "100%" }} animate={{ opacity: 1, width: "100%", transition: { duration: 0.3 } }} exit={{ opacity: 0, transition: { duration: 0.3 } }}>
                      <FormControl>
                        <Flex gap={"10px"}>
                          <Flex flexDirection={"column"} width={"100%"}>
                            <FormLabel>TextArea Placeholder</FormLabel>
                            <Input {...register(`textPlaceholder`, { required: true })} defaultValue={textPlaceholder} />
                          </Flex>
                        </Flex>
                      </FormControl>
                      // </motion.div>
                    )}

                    {(response === "singlechoice" || response === "multiplechoice") && (
                      // <motion.div
                      //   key={response}
                      //   initial={{ opacity: 0, width: "100%" }}
                      //   animate={{ opacity: 1 }}
                      //   exit={{ opacity: 0, transition: { duration: 0.3 } }}
                      //   width={"100%"}
                      // >
                      <>
                        <VStack gap={"20px"} alignItems={"flex-start"} mt={"30px"} width={"100%"}>
                          <Text>Options</Text>
                          {fields.map((field, index) => (
                            <Flex alignItems={"center"} width={"100%"} gap={"20px"} key={field.id}>
                              <Input {...register(`items.${index}.option`, { required: true })} placeholder={`Option ${index + 1}`} />
                              {fields.length > 2 && <IconButton aria-label={
                                "delete"
                              } type="button" onClick={() => remove(index)} icon={<DeleteIcon />} />}
                            </Flex>
                          ))}
                        </VStack>
                        <Button mt={"20px"} type="button" variant={"outline"} onClick={() => append({ option: "" })}>
                          Add Another Option
                        </Button>
                      </>
                      // </motion.div>
                    )}

                    {response === "mood" && (
                      // <motion.div
                      //   key="mood"
                      //   initial={{ opacity: 0, width: "100%" }}
                      //   animate={{ opacity: 1 }}
                      //   exit={{ opacity: 0, transition: { duration: 0.3 } }}
                      //   width={"100%"}
                      // >
                      <>
                        <VStack gap={"20px"} alignItems={"flex-start"} mt={"30px"} width={"100%"}>
                          <Text>Options</Text>
                          {fields.map((field, index) => (
                            <Box width={"100%"} key={field.id}>
                              <MoodOption index={index} register={register} setValue={setValue} items={items} remove={remove} fields={fields} />
                            </Box>
                          ))}
                        </VStack>
                        <Button mt={"20px"} type="button" onClick={() => append({ option: "", emoji: "scream" })}>
                          Add Emoji Option
                        </Button>
                      </>
                      // </motion.div>
                    )}

                    <Button mt={"20px"} colorScheme="messenger" type="submit">
                      Save Changes
                    </Button>
                  </VStack>
                </form>



                {/* Previe Sectionw */}

                <VStack width={"50%"} gap={"30px"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
                  <Heading as={"h2"} size={"md"}>
                    Preview
                  </Heading>
                  <Flex border={"1px"} borderColor={"brand.purple"} backgroundColor={"#FBFBFB"} height={"auto"} width={"90%"} justifyContent={"center"} alignItems={"center"} borderRadius={"2xl"} flexDirection={"column"}>
                    <Flex alignItems={"center"} justifyContent={"flex-start"} padding={"20px"} width={"100%"}>
                      {/* preview for short text response */}
                      {response === "shorttext" && <Input placeholder={textPlaceholder} width={"100%"} />}

                      {/* preview for the long text response */}
                      {response === "longtext" && <Textarea placeholder={textPlaceholder} borderColor={"#D2D2D2"} backgroundColor={"white"} width={"100%"} variant={"outline"} colorScheme="whiteAlpha" />}

                      {/* preview for the single or multiple choice questions */}
                      {(response === "singlechoice" || response === "multiplechoice") && (
                        <Flex flexDirection={"column"}>
                          <RadioGroup defaultValue="1">
                            {items.map((item, index) => (
                              <Flex gap={"10px"} key={index}>
                                {response === "singlechoice" && (
                                  <Radio value={index} backgroundColor={"white"}>
                                    <Text>{!item.option ? `Option ${index + 1}` : item.option}</Text>
                                  </Radio>
                                )}
                                {response === "multiplechoice" && (
                                  <Checkbox>
                                    <Text>{!item.option ? `Option ${index + 1}` : item.option}</Text>
                                  </Checkbox>
                                )}
                              </Flex>
                            ))}
                          </RadioGroup>
                        </Flex>
                      )}
                      {/* Preview for mood response questions */}
                      {response === "mood" && (
                        <MoodPreview items={items} />
                      )}
                    </Flex>
                  </Flex>
                </VStack>
              </Flex>
            ) : (
              <Text>Loading...</Text>
            )}
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

// Component for mood option creation

const MoodOption = ({ index, register, setValue, items, fields, remove }) => {


  const onClick = (emoji) => {
    setValue(`items.${index}.emoji`, emoji.id);
  };

  return (
    <FormControl id={`EmojiOption${index}`} isRequired w={"100%"}>
      <Flex flexDirection={"column"} gap={"20px"} width={"100%"}>
        <Flex gap={"10px"} width={"100%"}>
            <em-emoji id={items[index].emoji} set="apple" size="2em"></em-emoji>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton textAlign={"center"} as={Button} p={"0px"} variant={"solid"} colorScheme="gray">
                </MenuButton>
                <MenuList>
                  {isOpen ?
                    (<Picker
                      data={data} onEmojiSelect={onClick} />)

                    : null
                  
                }
                </MenuList>
              </>
            )}

          </Menu>
          <Input
            width={"100%"}
            placeholder={`Option ${index + 1}`}
            name={`EmojiOption  ${index}`}
            {...register(`items.${index}.option`, { required: true })}
          />
          {fields.length > 2 && (
            <IconButton type="button" onClick={() => remove(index)} icon={<DeleteIcon />} />
          )}
        </Flex>
      </Flex>
    </FormControl>
  );
};

// Component handling mood preview

const MoodPreview = ({ items }) => {
  return (
    <Flex gap={"10px"} wrap={"wrap"}>
      {items.map((item, index) => (
        <Flex key={index} flexDirection={"column"} gap={"10px"}
        >
          <Flex gap={"0px"} height={"100px"} width={"100px"} backgroundColor={"white"} justifyContent={"center"} alignItems={"center"} boxShadow={"lg"} border={"1px"} borderColor={"gray"} borderRadius={"lg"} flexDirection={"column"}>
            <Flex fontSize="60px" lineHeight={"65px"}>
              <em-emoji id={items[index].emoji} set="apple" size=""></em-emoji>
            </Flex>
            <Text noOfLines={1} width={"90%"} textAlign={"center"}>
              {!item.option ? `Option ${index + 1}` : item.option}
            </Text>
          </Flex>
        </Flex>
      ))}
    </Flex>
  )
}



export default QuestionForm;
