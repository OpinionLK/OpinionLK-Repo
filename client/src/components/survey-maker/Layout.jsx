import { useState } from 'react'
import {
    FormControl,
    FormLabel,
    Input,
    Select,
    Flex, Text,
    VStack,
    Button,
    Menu,
    MenuButton,
    MenuList,
} from '@chakra-ui/react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
// import { ChevronDownIcon } from '@chakra-ui/icons';
import React from 'react'

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

const Layout = () => {

    const [type, setType] = useState('text')
    // eslint-disable-next-line
    const [showEmoji, setShowEmoji] = useState(true)
    const [moodOptionCount, setMoodOptionCount] = useState(4)
    const [DropdownOptionCount, setDropdownOptionCount] = useState(4)

    return (

        <>
            <Flex width={'100%'}>
                
                    <VStack width={'100%'} alignItems={'flex-start'} gap={'20px'}>
                        <FormControl id="question" isRequired>
                            <FormLabel>Question</FormLabel>
                            <Input />
                        </FormControl>

                        <FormControl width={'100%'} id="type" isRequired>
                            <FormLabel>Type</FormLabel>
                            <Select onChange={(e) => setType(e.target.value)}>
                                <option value="text" selected='selected'>Text</option>
                                <option value="radio">Single Choice</option>
                                <option value="mood">Mood</option>
                                <option value="checkbox">Checkbox</option>
                                <option value="dropdown">Dropdown</option>
                            </Select>
                        </FormControl>


                        {type === 'text' ? (
                            <Flex gap={'20px'} w={'100%'}>
                                <FormControl id="text" isRequired w={'100%'}>
                                    <FormLabel>Input Placeholder</FormLabel>
                                    <Input />
                                </FormControl>

                                <FormControl id="text" isRequired w={'100%'}>
                                    <FormLabel>Response Type</FormLabel>
                                    <Select placeholder="Select type" onChange={(e) => setType(e.target.value)}>
                                        <option value="text" selected='selected'>Text</option>
                                        <option value="email">E-mail</option>
                                    </Select>
                                </FormControl>
                            </Flex>

                        ) : type === 'multiplechoice' ? (
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

                        ) : type === 'mood' ? (
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
                        ) : type === 'checkbox' ? (
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
                        ) : type === 'dropdown' ? (
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
        </>
    )
}

export default Layout