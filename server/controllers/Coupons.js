import Coupons from '../models/Coupons.js'

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