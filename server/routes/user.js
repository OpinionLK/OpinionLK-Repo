import express, { application } from 'express';
import { getAllSurveys } from '../controllers/SurveysC.js';
import { userData, surveyHistory } from '../controllers/UserC.js';


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


export default router; 