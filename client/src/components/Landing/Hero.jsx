import React from 'react'
import {
  Flex,
  Text,
  useMediaQuery,
  Stack,
  Box,
  useColorModeValue,
  Button,
  Image
} from '@chakra-ui/react'

import Clip from '../../images/clip.png'
import Check from '../../images/checkbox.png'
import Clip2 from '../../images/clipp2.png'
import { motion } from 'framer-motion'

const Hero = () => {
  const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');

  return (
    <>
      {isLargerThanLG ? (
        <>
          <motion.div
            initial={{ opacity: 0, y: '-100px' }}
            animate={{ y: '0', opacity: 1 }}
            transition={{
              ease: "easeOut", delay: '0.8'
              , duration: 0.5
            }}

          >
            <Image src={Clip} alt="clip" position="absolute" top="20" right="20%" zIndex="-1" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: '-100px' }}
            animate={{ y: '0', opacity: 1 }}
            transition={{
              ease: "easeOut", delay: '0.5'
              , duration: 0.5
            }}

          >
            <Image src={Check} alt="check" position="absolute" top="30vh" left="15vw" zIndex="-1" />
          </motion.div>
          <motion.div
            
            initial={{ opacity: 0, y: '-50px' }}
            animate={{ y: '0', opacity: 1 }}
            transition={{
              ease: "easeOut", delay: '1'
              , duration: 0.5
            }}
            >

            <Image src={Clip2} alt="clip2" position="absolute" top={'65vh'} right="40vw" zIndex="-1" />
            </motion.div>

        </>
      ) : null}

      <Flex

        alignItems="center"
        w="full"
        px={isLargerThanLG ? '16' : '6'}
        py="16"
        minHeight="90vh"
        justifyContent="center"

        color={'brand.textBlack'}

        flexDirection={isLargerThanLG ? 'column' : 'column'}
      >

        <Text fontSize={isLargerThanLG ? '7xl' : '6xl'}
          fontWeight="700"
          textAlign="center"

          color={useColorModeValue('brand.textBlack', 'white')}

          mb="4">
          Opinions Pay Off!
        </Text>
        <Text fontSize={isLargerThanLG ? '3xl' : '    xl'}
          fontWeight="  200"
          textAlign="center"
          mb="4"
          // color={'brand.textBlack'}
          color={useColorModeValue('brand.textBlack', 'white')}
        >
          Get Rewarded, One Survey at a Time!
        </Text>
        <Stack direction='row' spacing={4}>
          <Button size='lg' colorScheme='purple'>
            Get Started
          </Button>
          <Button size='lg' colorScheme='green'>

            Learn More          </Button>
        </Stack>
      </Flex>
    </>
  )

}

export default Hero