import Coupons from '../models/Coupons.js';

export const GetCoupons = async (_, res) => {
    try {
        const coupon = await Coupons.find();
        res.status(200).json(coupon);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const CreateCoupon = async (req, res) => {
    const Coupon = req.body;
    const newCoupon = new Coupons(Coupon);
    try {
        await newCoupon.save();
        console.log(newCoupon);
        res.status(201).json(newCoupon);
    } catch (error) {
        res.status(409).json({ message: error.message });
        console.log(error);
    }
};

export const UpdateCoupon = async (req,res) => {
    try{
        const { id } = req.params;
        const couponUpdate = {
            CouponName: req.body.CouponName,
            CouponCode: req.body.CouponCode,
            Discount: req.body.Discount,
            Description: req.body.Description,
            StartDate: req.body.StartDate,
            EndDate: req.body.EndDate,
            Status: req.body.Status,
            count: req.body.count,
            CompanyName: req.body.CompanyName,
        };
        
        const updatedCoupon = await Coupons.findByIdAndUpdate(id, couponUpdate, {
            new: true, // Returns the updated document
            runValidators: true, // Run model's validation on update
        });
        if (!updatedCoupon) {
            return res.status(404).json({ error: "Coupon not found" });
        }
        console.log('Coupon updated successfully')
        return res.status(200).json({ message: "Updated successfully", updatedCoupon });
    }
    catch(error){
        console.error("Error updating coupon:", error);
        res.status(500).json({ error: "Something went wrong!"});
    }
};

export const DeleteCoupon = async (req, res)=>{
    try{
        const { id } = req.params;
        await Coupons.findByIdAndRemove(id);
        res.status(200).json({message:'Coupon deleted successfully'});
    }   
    catch(error){
        console.error("Error deleting coupon:", error);
        res.status(500).json({ error: "Something went wrong!"});
    }
};