import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(inputAnatomy.keys)


const pill = definePartsStyle({
    field: {
        border: '1px solid',
        borderColor: '#D2D2D2',
        boxShadow: '0px 3px 4px rgb(0 0 0 / 6%)',
        background: '#FFF',
        _focus: {
            borderColor: 'brand.purple',
            boxShadow: "inset 0px 0px 0px 1px #1964ff, 0px 4px 8px rgb(0 78 236 / 15%)", // Add your focus box-shadow here
          },
        // borderRadius: 'full',
        // focus


        // Let's also provide dark mode alternatives
        _dark: {
            borderColor: 'gray.600',
            background: 'gray.800',
        },
    },
    addon: {
        border: '1px solid',
        borderColor: 'gray.200',
        background: 'gray.200',
        borderRadius: 'full',
        color: 'gray.500',

        _dark: {
            borderColor: 'gray.600',
            background: 'gray.600',
            color: 'gray.400',
        },
    },
})

export const inputTheme = defineMultiStyleConfig({
    defaultProps: {
        // size: 'xl',
        
        variant: 'pill',
    },
    variants: { pill },
})
