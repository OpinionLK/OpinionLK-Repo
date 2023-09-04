import { selectAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys)

const brandPrimary = definePartsStyle({
 field: {

    border: "1px solid",
    borderColor: "#D2D2D2",
    boxShadow: "0px 3px 4px rgb(0 0 0 / 6%)",

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

