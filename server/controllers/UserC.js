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
            id: user._id, firstname: user.firstName, lastname: user.lastName, email: user.email, profilePicture: user.profilePicture, points: user.points
        });
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }

};


export const surveyHistory = async (req, res) => {
    try {
        // const authHeader = req.headers.authorization;
        // if (!authHeader || !authHeader.startsWith('Bearer ')) {
        //     return res.status(401).json({ error: 'Unauthorized' });
        // }
        // const token = authHeader.split(' ')[1];
        // const { id } = jwt.verify(token, 'test');
 
        const id = req.query.id;
        let user = await User.findOne({ _id: id });
        console.log(user);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        let surveys = await Surveys.find({ responses: { $elemMatch: { userID: user._id } } });

        // Map the surveys to the desired format
        let surveyHistory = surveys.map(survey => {
            const response = survey.responses.find(response => response.userID === user._id);
            return {
                surveyName: survey.surveyName,
                surveyDescription: survey.surveyDescription,
                dateSubmitted: response.dateSubmitted,
                reward: response.reward,
            };
        });
        
        res.status(200).json(surveyHistory);
    }
    catch (error) {
        console.log(error);
    }
};


