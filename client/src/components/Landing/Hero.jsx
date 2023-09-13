import React,
{
  useEffect
}
  from 'react'
import {
  Flex,
  Text,
  useMediaQuery,
  Stack,
  Box,
  Heading,
  Divider,
  CardFooter,
  Tag,
  ButtonGroup,
  Button,
  Image,
  Card,
  CardHeader,
  CardBody
} from '@chakra-ui/react'

import { motion, useTransform, useViewportScroll } from 'framer-motion';

import pizza from '../../assets/images/landing/pizza.jpg'
import books from '../../assets/images/landing/books.jpg'
import sports from '../../assets/images/landing/sports.jpg'
import art from '../../assets/images/landing/art.jpg'

const Hero = () => {

  const { scrollYProgress } = useViewportScroll();
  const x = useTransform(scrollYProgress, [0, 1], [10, -200]); // Change 500 to the desired scroll distance

  const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');

  useEffect(() => {
    function handleScroll() {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      {/* {isLargerThanLG ? (
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
      ) : null} */}

      <Flex

        alignItems="center"
        backgroundColor={'#132450'}
        w="full"
        px={isLargerThanLG ? '16' : '6'}
        py="16"
        minHeight="60vh"
        justifyContent="center"
        overflowX={'hidden'}
        color={'brand.textBlack'}

        flexDirection={isLargerThanLG ? 'column' : 'column'}
      >

        <Text fontSize={isLargerThanLG ? '7xl' : '6xl'}
          fontWeight="700"
          textAlign="center"

          color={'white'}

          mb="1">
          Opinions Pay Off!
        </Text>
        <Text fontSize={isLargerThanLG ? '3xl' : 'xl'}
          fontWeight="  200"
          textAlign="center"
          mb="10"

          color={'white'}
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
      <motion.div style={{ x, marginTop: '-100px', display: 'flex', gap: '30px', padding: '40px 20px' }} >
        <Card minWidth={'300px'} maxWidth='300px' size={'sm'} boxShadow={'2xl'} mb={'40px'}>

          <CardBody>
            <Image
              src={pizza}
              objectFit={'cover'}
              width={'100%'}
              height={'180px'}
              alt='pizza'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Heading size='sm'>Food Frenzy: Rate you dining experience</Heading>
              <Text fontSize={'12px'}>By Consumer Authority</Text>
              <Flex gap={'10px'}>
                <Tag variant={'outline'} colorScheme='purple'>
                  Food
                </Tag>
                <Tag variant={'outline'} colorScheme='purple'>
                  Dining
                </Tag>
                <Tag variant={'outline'} colorScheme='purple'>
                  Pizza
                </Tag>
                <Tag variant={'outline'} colorScheme='purple'>
                  Lunch
                </Tag>
              </Flex>
            </Stack>
          </CardBody>

          <CardFooter justifyContent={'flex-end'}>
            <ButtonGroup >
              <Button variant='solid' colorScheme='messenger'>
                Take Survey
              </Button>

            </ButtonGroup>
          </CardFooter>
        </Card>
        <Card minWidth={'300px'} maxWidth='300px' size={'sm'} boxShadow={'2xl'} mb={'40px'}>

          <CardBody>
            <Image
              src={art}
              objectFit={'cover'}
              width={'100%'}
              height={'180px'}
              alt='pizza'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Heading size='sm'>Art and Creativity: Your Inspirations</Heading>
              <Text fontSize={'12px'}>By MMCA Sri Lanka</Text>
              <Flex gap={'10px'}>
                <Tag variant={'outline'} colorScheme='purple'>
                  Art
                </Tag>
                <Tag variant={'outline'} colorScheme='purple'>
                  Modern
                </Tag>
                <Tag variant={'outline'} colorScheme='purple'>
                  Perspective
                </Tag>
                <Tag variant={'outline'} colorScheme='purple'>
                  Youth
                </Tag>
              </Flex>
            </Stack>
          </CardBody>

          <CardFooter justifyContent={'flex-end'}>
            <ButtonGroup >
              <Button variant='solid' colorScheme='messenger'>
                Take Survey
              </Button>

            </ButtonGroup>
          </CardFooter>
        </Card>
        <Card minWidth={'300px'} maxWidth='300px' size={'sm'} boxShadow={'2xl'} mb={'40px'}>

          <CardBody>
            <Image
              src={sports}
              objectFit={'cover'}

              width={'100%'}
              height={'180px'}
              alt='pizza'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Heading size='sm'>Fitness and Wellness Habits: Share Your Routine</Heading>
              <Text fontSize={'12px'}>By Lifetime Fitness</Text>
              <Flex gap={'10px'}>
                <Tag variant={'outline'} colorScheme='purple'>
                  Gym
                </Tag>
                <Tag variant={'outline'} colorScheme='purple'>
                  Fitness
                </Tag>
                <Tag variant={'outline'} colorScheme='purple'>
                  Perspective
                </Tag>
                <Tag variant={'outline'} colorScheme='purple'>
                  Youth
                </Tag>
              </Flex>
            </Stack>
          </CardBody>

          <CardFooter justifyContent={'flex-end'}>
            <ButtonGroup >
              <Button variant='solid' colorScheme='messenger'>
                Take Survey
              </Button>

            </ButtonGroup>
          </CardFooter>
        </Card>
        <Card minWidth={'300px'} maxWidth='300px' size={'sm'} boxShadow={'2xl'} mb={'40px'}>

          <CardBody>
            <Image
              src={books}
              objectFit={'cover'}
              width={'100%'}
              height={'180px'}
              alt='pizza'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Heading size='sm'>Bookworm's Delight: Your Reading Preferences</Heading>
              <Text fontSize={'12px'}>By Readers Inc.</Text>
              <Flex gap={'10px'}>
                <Tag variant={'outline'} colorScheme='purple'>
                  Books
                </Tag>
                <Tag variant={'outline'} colorScheme='purple'>
                  Modern                </Tag>
                <Tag variant={'outline'} colorScheme='purple'>
                  Youth
                </Tag>
                <Tag variant={'outline'} colorScheme='purple'>
                  Reading
                </Tag>
              </Flex>
            </Stack>
          </CardBody>

          <CardFooter justifyContent={'flex-end'}>
            <ButtonGroup >
              <Button variant='solid' colorScheme='messenger'>
                Take Survey
              </Button>

            </ButtonGroup>
          </CardFooter>
        </Card>
        <Card minWidth={'300px'} maxWidth='300px' size={'sm'} boxShadow={'2xl'} mb={'40px'}>

          <CardBody>
            <Image
              src={pizza}
              objectFit={'cover'}
              width={'100%'}
              height={'180px'}
              alt='pizza'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Heading size='sm'>Food Frenzy: Rate you dining experience</Heading>
              <Text fontSize={'12px'}>By Consumer Authority</Text>
              <Flex gap={'10px'}>
                <Tag variant={'outline'} colorScheme='purple'>
                  Food
                </Tag>
                <Tag variant={'outline'} colorScheme='purple'>
                  Dining
                </Tag>
                <Tag variant={'outline'} colorScheme='purple'>
                  Pizza
                </Tag>
                <Tag variant={'outline'} colorScheme='purple'>
                  Lunch
                </Tag>
              </Flex>
            </Stack>
          </CardBody>

          <CardFooter justifyContent={'flex-end'}>
            <ButtonGroup >
              <Button variant='solid' colorScheme='messenger'>
                Take Survey
              </Button>

            </ButtonGroup>
          </CardFooter>
        </Card>
        <Card minWidth={'300px'} maxWidth='300px' size={'sm'} boxShadow={'2xl'} mb={'40px'}>

          <CardBody>
            <Image
              src={pizza}
              objectFit={'cover'}
              width={'100%'}
              height={'180px'}
              alt='pizza'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Heading size='sm'>Food Frenzy: Rate you dining experience</Heading>
              <Text fontSize={'12px'}>By Consumer Authority</Text>
              <Flex gap={'10px'}>
                <Tag variant={'outline'} colorScheme='purple'>
                  Food
                </Tag>
                <Tag variant={'outline'} colorScheme='purple'>
                  Dining
                </Tag>
                <Tag variant={'outline'} colorScheme='purple'>
                  Pizza
                </Tag>
                <Tag variant={'outline'} colorScheme='purple'>
                  Lunch
                </Tag>
              </Flex>
            </Stack>
          </CardBody>

          <CardFooter justifyContent={'flex-end'}>
            <ButtonGroup >
              <Button variant='solid' colorScheme='messenger'>
                Take Survey
              </Button>

            </ButtonGroup>
          </CardFooter>
        </Card>
        <Card minWidth={'300px'} maxWidth='300px' size={'sm'} boxShadow={'2xl'} mb={'40px'}>

          <CardBody>
            <Image
              src={pizza}
              objectFit={'cover'}
              width={'100%'}
              height={'180px'}
              alt='pizza'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Heading size='sm'>Food Frenzy: Rate you dining experience</Heading>
              <Text fontSize={'12px'}>By Consumer Authority</Text>
              <Flex gap={'10px'}>
                <Tag variant={'outline'} colorScheme='purple'>
                  Food
                </Tag>
                <Tag variant={'outline'} colorScheme='purple'>
                  Dining
                </Tag>
                <Tag variant={'outline'} colorScheme='purple'>
                  Pizza
                </Tag>
                <Tag variant={'outline'} colorScheme='purple'>
                  Lunch
                </Tag>
              </Flex>
            </Stack>
          </CardBody>

          <CardFooter justifyContent={'flex-end'}>
            <ButtonGroup >
              <Button variant='solid' colorScheme='messenger'>
                Take Survey
              </Button>

            </ButtonGroup>
          </CardFooter>
        </Card>
        <Card minWidth={'300px'} maxWidth='300px' size={'sm'} boxShadow={'2xl'} mb={'40px'}>

          <CardBody>
            <Image
              src={pizza}
              objectFit={'cover'}
              width={'100%'}
              height={'180px'}
              alt='pizza'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Heading size='sm'>Food Frenzy: Rate you dining experience</Heading>
              <Text fontSize={'12px'}>By Consumer Authority</Text>
              <Flex gap={'10px'}>
                <Tag variant={'outline'} colorScheme='purple'>
                  Food
                </Tag>
                <Tag variant={'outline'} colorScheme='purple'>
                  Dining
                </Tag>
                <Tag variant={'outline'} colorScheme='purple'>
                  Pizza
                </Tag>
                <Tag variant={'outline'} colorScheme='purple'>
                  Lunch
                </Tag>
              </Flex>
            </Stack>
          </CardBody>

          <CardFooter justifyContent={'flex-end'}>
            <ButtonGroup >
              <Button variant='solid' colorScheme='messenger'>
                Take Survey
              </Button>

            </ButtonGroup>
          </CardFooter>
        </Card>


      </motion.div>
    </>
  )

}

export default Hero