import User from "../models/User.js";
import { Surveys } from "../models/Surveys.js";

import jwt from 'jsonwebtoken';

export const getAllSurveys = async (req, res) => {
    try {
        const surveys = await Surveys.find().limit(5).sort({ 'created_date': -1 });
        res.status(200).json(surveys);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const userData = async (req, res) => {
    // get token from header
    const token = req.headers.authorization.split(' ')[1];
    console.log('Received client data request:', token);

    // check if token is verified
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // verify token
    const { id } = jwt.verify(token, 'test');
    console.log(id);



    if (!id) {
        return res.status(400).json({ error: 'Server Error' });
    }
    let user = await User.findOne({ _id: id });
    res.status(200).json({
        id: user._id, firstname: user.firstName, lastname: user.lastName, email: user.email
    });
};

