import React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import { useAuthContext } from '../../hooks/useAuthContext';

import {
  Text,
  Grid,
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
    // eslint-disable-next-line
    user, dispatch, userData
  } = useAuthContext();

  const points = userData?.points;

  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={-5}>
      {coupons ? coupons.map((coupon) => {
          return(
            <>
            <CouponCard 
              couponName={coupon.CouponName}
              couponDescription={coupon.Description}
              companyName={coupon.CompanyName}
              couponImage={coupon.CouponImage}
              couponPoints={coupon.Points}
              couponCount={coupon.Count}
              userPoints={points}
            />
            </>
          )
        }) : <Text>No Coupons Available</Text>}
      </Grid>
    </>
  )
}

export default Myrewards