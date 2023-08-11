import React from 'react'
import LandingNav from '../components/LandingNav'
import {
  Box
} from '@chakra-ui/react'
import { motion } from "framer-motion"
import Hero from '../components/Landing/Hero'
import Features from '../components/Landing/Features'
import { Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react'
const Landing = () => {
  return (
    <>
     
        <LandingNav />
   
      <motion.div
        initial={{ opacity: 0, y: '50px' }}
        animate={{ y: '0', opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.5 }}
      >
        <Hero />
      </motion.div>
      <Features />

    </>
  )
}

export default Landing