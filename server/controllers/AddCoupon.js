import Coupons from '../models/Coupons.js';
import ImageKit from "imagekit";
import dotenv from 'dotenv';
import upload from '../middleware/upload.js';
import multer from 'multer';
import axios from 'axios';


dotenv.config();
export const GetCoupons = async (_, res) => {
    try {
        const coupon = await Coupons.find();
        res.status(200).json(coupon);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const CreateCoupon = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }else {
        console.log(req.file);
    }
    var imagekit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.IMAGEKIT_URL
    });

    const imageFile = req.file;
    const imageUploadRes = imagekit.upload({
        file: imageFile.buffer.toString("base64"),
        fileName: imageFile.originalname,
        folder: "/couponImages",
        transformation:[
            {
                "height": "300",
                "width": "300"
            }
        ],
    });

    const coupon = req.body;
    if (
        !coupon.CouponName ||
        !coupon.CouponCode ||
        !coupon.Description ||
        !coupon.StartDate ||
        !coupon.Points ||
        !coupon.EndDate ||
        !coupon.Status ||
        !coupon.Count ||
        !coupon.CompanyName
    ) {
        return res.status(400).json({ message: 'Please fill all the fields' });
    }
    const newCoupon = new Coupons({
        CouponName: coupon.CouponName,
        CouponCode: coupon.CouponCode,
        Description: coupon.Description,
        StartDate: coupon.StartDate,
        Points : coupon.Points ,
        EndDate: coupon.EndDate,
        Status: coupon.Status,
        Count: coupon.Count,
        CompanyName: coupon.CompanyName,
        CouponImage: imageUploadRes.url,
    });

    try {
        await newCoupon.save();
        res.status(201).json(newCoupon);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
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
            Count: req.body.Count,
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