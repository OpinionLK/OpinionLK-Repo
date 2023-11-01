import Coupons from '../models/Coupons.js'
import User from '../models/User.js'
import jwt from 'jsonwebtoken';

export const getAllCoupons = async (req, res) => {
    try{
        const coupons = await Coupons.find();
        res.status(200).json(coupons);
    } catch(error) {
        res.status(404).json({ message: error.message })
    }
}

export const getMyCoupons = async (req, res) => {

}

export const redeemCoupon = async (req, res) => {
    try{
        const { _id } = req.body;
        console.log('Coupon id:',_id);
        const coupon = await Coupons.findById(_id);
        if(!coupon){
            return res.status(404).json({ message: 'Coupon not found' });
        }

        const token = req.headers.authorization.split(' ')[1];
        console.log("token::",token);

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { id } = jwt.verify(token, 'test');
        console.log("user id::",id);

        if (!id) {
            return res.status(400).json({ error: 'Server Error' });
        }

        if (coupon.Count == 0) {
            return res.status(400).json({ error: 'Coupon out of stock' });
        }

        // if (coupon.EndDate < Date.now()) {
        //     return res.status(400).json({ error: 'Coupon expired' });
        // }

        if (coupon.Points > 0) {
            let user = await User.findOne({ _id: id });
            if (user.points < coupon.Points) {
                return res.status(400).json({ error: 'Not enough points' });
            }
            user.points -= coupon.Points;
            coupon.Count--;
            // save the redeemed date

            const now = new Date();
            const nowLocal = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
            const created_date = nowLocal.toISOString().slice(0,19).replace("T", " ");

            await coupon.save();
            user.coupons.push({
                CouponID: _id,
                CouponName: coupon.CouponName,
                CouponCode: coupon.CouponCode,
                Description: coupon.Description,
                StartDate: coupon.StartDate,
                EndDate: coupon.EndDate,
                Points: coupon.Points,
                CompanyName: coupon.CompanyName,
                CouponRedeemedDate: created_date,
            });
            await user.save();
            return res.status(200).json({ message: 'Coupon redeemed successfully' });
        }

    }
    catch(error){
        res.status(404).json({ message: 'Something went wrong: ' + error.message });
    }
}
