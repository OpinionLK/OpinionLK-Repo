import React from 'react';
import {
    Tag,
    TagLabel,
    TagLeftIcon,
    TagRightIcon,
    TagCloseButton,
} from '@chakra-ui/react'


const status = (status) => {
    let color = 'gray'
    if(status?.status === 'active'){
        color = 'blue'
    }
    else if(status?.status === 'approved'){
        color = 'green'
    }
    else if(status?.status === 'rejected'){
        color = 'red'
    }
    else if(status?.status === 'pending'){
        color = 'orange'
    }
    else{
        color = 'gray'
    }
    console.log(status)
    return (
        <Tag fontWeight={'bold'} colorScheme={color} variant="solid"
        >{status.status?.toUpperCase()}</Tag>
    )
}

export default status