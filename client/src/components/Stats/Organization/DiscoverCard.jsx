import React from 'react'

// import './style.css'

import { 
    Card, 
    Text,
    Box,
    Button,
    Image,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import cover1 from '../../../images/cover1.png'
import cover2 from '../../../images/cover2.jpg'
// import cover3 from '../../../images/cover3.webp'
import cover4 from '../../../images/cover4.jpg'

// import discover from '../../../images/dash-image.png'
import gradient from '../../../images/gradient.png'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const StatCard = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [cover1, cover2, cover4];
    const texts = [
      "Text for cover1",
      "Text for cover2",
      "Text for cover4",
    ];

    const components = [
        <Box
        >
          <Text
            position="absolute"
            top="20%"
            left="26%"
            transform="translate(-50%, -50%)"
            color="white"
            fontSize="25px"
            ml={-3}
          >
            Explore New Possibilities
          </Text>
       
          <Text
            position="absolute"
            top="35%"
            left="18%"
            transform="translate(-50%, -50%)"
            color="white"
            fontSize="15px"
            ml={5}
          >
            Make Every Moment Memorable
          </Text>
       
          <Button 
            position="absolute"
            top="70%"
            left="6%"
            color='#000'
            bg='#fff'
            variant='solid'
          >
            Start Your Journey
          </Button>
        </Box>,
        <Box

        >
          <Text
            position="absolute"
            top="20%"
            left="26%"
            transform="translate(-50%, -50%)"
            color="white"
            fontSize="25px"
          >
            Connect with Your Audience
          </Text>
       
          <Text
            position="absolute"
            top="35%"
            left="18%"
            transform="translate(-50%, -50%)"
            color="white"
            fontSize="15px"
          >
            Make Every Interaction Count
          </Text>
       
          <Button 
            position="absolute"
            top="70%"
            left="6%"
            color='#000'
            bg='#fff'
            variant='solid'
          >
            Get Started
          </Button>
        </Box>,
        <Box
        >
          <Text
            position="absolute"
            top="20%"
            left="26%"
            transform="translate(-50%, -50%)"
            color="white"
            fontSize="25px"
            ml={-5}
          >
            Discover New Horizons
          </Text>
       
          <Text
            position="absolute"
            top="35%"
            left="18%"
            transform="translate(-50%, -50%)"
            color="white"
            fontSize="15px"
            ml={-5}

          >
            Unlock Your Potential
          </Text>
       
          <Button 
            position="absolute"
            top="70%"
            left="6%"
            color='#000'
            bg='#fff'
            variant='solid'
          >
            Explore Now
          </Button>
        </Box>,
       ];
       
   
    useEffect(() => {
      const slideImage = () => {
        setCurrentIndex((currentIndex + 1) % images.length);
      };
   
      const intervalId = setInterval(slideImage, 3000);
   
      return () => {
        clearInterval(intervalId);
      };
    }, [currentIndex, images]);
   
    const currentText = texts[currentIndex];
    const currentComponent = components[currentIndex];
   
    return (
      <Card
        size='md'
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        borderRadius='20'
        mt={5}
        mr={5}
      >
        <Box
          position="relative"
          height="300px"
          overflow="hidden"
        >
          <Image
            objectFit='cover'
            src={images[currentIndex]}
            alt='discover'
          />
   
          <Image
            src={gradient}
            alt="Overlay Image"
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
          />
   
          <Box
            position="absolute"
            width="800px"
            height="300px"
            top="0%"
            left="0%"
            overflow="hidden"
          >
            <Text
              position="absolute"
              top="20%"
              left="26%"
              transform="translate(-50%, -50%)"
              color="white"
              fontSize="25px"
            >
              {/* {currentText} */}
            </Text>
            {currentComponent}
   
            {/* Rest of the component */}
          </Box>
        </Box>
      </Card>
    );
   }
   

export default StatCard