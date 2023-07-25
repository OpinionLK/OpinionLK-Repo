// theme.js

// 1. import `extendTheme` function
import "@fontsource/inter"; // Defaults to weight 400
import "@fontsource/inter/900.css"; // Specify weight
import "@fontsource/inter/700.css"; // Specify weight
// import "@fontsource/inter/400-italic.css"; // Specify weight and style

import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const config = {
    initialColorMode: "light",
    useSystemColorMode: false,

}

// }
const fonts = {
    body: "Inter",
    heading: "Inter",
    mono: "Inter",
}


const colors = {
    brand: {
      purple: '#6C63FF',
      green: '#00BFA6',
      blue: '#132450',
      textBlack: '#1E1E1E',
      darkPurple:'#4318FF'
      
    },
  }

// 3. extend the theme
const theme = extendTheme({ config,fonts, colors })

export default theme