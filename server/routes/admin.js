import express, { application } from 'express';
import upload from '../middleware/upload.js';
import {
    GetCoupons,
    CreateCoupon,
    UpdateCoupon,
    DeleteCoupon
} from '../controllers/AddCoupon.js';

const router = express.Router();


router.get('/coupons', GetCoupons);
router.post('/coupons/add', upload.single('CouponImage'), CreateCoupon);
router.put('/coupons/update/:id', UpdateCoupon);
router.delete('/coupons/delete/:id', DeleteCoupon);

export default router;