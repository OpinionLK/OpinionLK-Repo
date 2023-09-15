import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  overlay: {
    // bg: 'blackAlpha.200', //change the background
  },
  dialog: {
    borderRadius: 'xl',

  },
})
const purple = definePartsStyle({

  dialog: {
    borderRadius: 'xl',

    minHeight: '70vh',
    maxWidth: '50vw',
    // bg: `purple.100`,

    // Let's also provide dark mode alternatives
    _dark: {
      bg: `purple.600`,
      color: 'white',
    },
  },
})

export const modalTheme = defineMultiStyleConfig({
  variants: { purple },
  baseStyle,
})
