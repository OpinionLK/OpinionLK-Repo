import User from "../models/User.js";
import Surveys from "../models/Surveys.js";

import jwt from 'jsonwebtoken';


export const userData = async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint to get user data'
    // get token from header

    const authHeader = req.headers.authorization;

    // Check if the authorization header is missing or not in the expected format
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Received client data request:', token);

    // check if token is verified
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // verify token

    try {
        const { id } = jwt.verify(token, 'test');
        console.log(id);



        if (!id) {
            return res.status(400).json({ error: 'Server Error' });
        }
        let user = await User.findOne({ _id: id });
        res.status(200).json({
            id: user._id, firstname: user.firstName, lastname: user.lastName, email: user.email
        });
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }

};

