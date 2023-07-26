import React from 'react'

import { useParams } from 'react-router-dom';


const Survey = () => {
    const { id } = useParams();
  return (
    <>
    <div>survey</div>
    <div>{id}</div>
    </>
  )
}

export default Survey