import express, { application } from 'express';
import { getAllSurveys } from '../controllers/SurveysC.js';
import { userData, surveyHistory, couponHistory } from '../controllers/UserC.js';
import { redeemCoupon } from '../controllers/Coupons.js';


import{
    getAllCoupons,
    getMyCoupons,
} from '../controllers/Coupons.js'

const router = express.Router();

router.get('/allsurveys', getAllSurveys);
router.get('/userdata', userData);
router.get('/getAllCoupons', getAllCoupons);
router.get('/getMyCoupons', getMyCoupons);
router.get('/surveyHistory', surveyHistory);
router.post('/redeemCoupon', redeemCoupon);
router.get('/couponHistory', couponHistory);
// router.get('/updatedUser', userData);


export default router; 