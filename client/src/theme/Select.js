import { selectAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys)

const brandPrimary = definePartsStyle({
 field: {

    border: "1px solid",
    borderColor: "#a7a0ff",

  },
  icon: {
    color: "purple.400"
  }
})

export const selectTheme = defineMultiStyleConfig({
  variants: { brandPrimary },
    defaultProps: {
        variant: 'brandPrimary',
    },
})

