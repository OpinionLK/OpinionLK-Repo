import React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import { useAuthContext } from '../../hooks/useAuthContext';

import {
  Heading,
  Wrap,
  Text,
} from '@chakra-ui/react'

import CouponCard from '../../components/Surveyee/CouponCard'

const Myrewards = () => {

  const [coupons, setCoupons] = useState([])

  useEffect(() => {
    const fetchCoupons = async () => {
      try{
        const response = await axios.get('http://localhost:3002/api/user/getAllCoupons')
        console.log("hello there:",response.data)
        setCoupons(response.data)
      }catch(err){
        console.log(err)
      }
    }

    fetchCoupons()
  }, [])

  const {
    user, dispatch, userData
  } = useAuthContext();

  const points = userData?.points;

  return (
    <>
      <Wrap spacing='14px'>
        {coupons ? coupons.map((coupon) => {
          return(
            <>
            <CouponCard 
              couponName={coupon.CouponName}
              couponDescription={coupon.CouponDescription}
              companyName={coupon.CompanyName}
              // need the image
              couponImage={coupon.CouponImage}
              couponPoints={coupon.Points}
              userPoints={points}

            />
            </>
          )
        }) : <Text>No Coupons Available</Text>}
      </Wrap>
    </>
  )
}

export default Myrewards