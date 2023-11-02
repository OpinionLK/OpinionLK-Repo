import express, { application } from 'express';
import upload from '../middleware/upload.js';
import {
    GetCoupons,
    CreateCoupon,
    UpdateCoupon,
    DeleteCoupon
} from '../controllers/AddCoupon.js';
import {
    UpdateSurveySettings,
    GetPlatformData
} from '../controllers/SurveySettings.js';

const router = express.Router();


router.get('/coupons', GetCoupons);
router.post('/coupons/add', upload.single('CouponImage'), CreateCoupon);
router.put('/coupons/update/:id', UpdateCoupon);
router.delete('/coupons/delete/:id', DeleteCoupon);
router.get('/surveySettings', GetPlatformData);
router.put('/surveySettings/update', UpdateSurveySettings);


export default router;