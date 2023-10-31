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

export const updateUserData = async (req, res) => {
    const { id } = jwt.verify(token, 'test');
        console.log(id);
        if (!id) {
            return res.status(400).json({ error: 'Server Error' });
        }
    const { firstname, lastname, email, city, town, postalCode, mkt, notifications } = req.body;

  try {

    user.firstName = firstname;
    user.lastName = lastname;
    user.email = email;
    user.city = city;
    user.town = town;
    user.postal = postalCode; 
    user.mkt = mkt;
    user.notifications = notifications;

    await user.save();

    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error(err);
    console.log("error here");
    res.status(500).json({ message: 'Server error' });
  }
}


export const surveyHistory = async (req, res) => {

        const token = req.headers.authorization.split(' ')[1];
        console.log("token::",token);

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { id } = jwt.verify(token, 'test');
        console.log("user id::",id);
        
    try {
        // Get all surveys that the user has responded to
        let surveys = await Surveys.find({ responses: { $elemMatch: { userID: id } } });
        console.log("surveys: ",surveys);

        // Map the surveys to the correct format
        let surveyHistory = surveys.map(survey => {
            const response = survey.responses.find(response => response.userID === id);
            return {
                surveyName: survey.surveyName,
                surveyDescription: survey.surveyDescription,
                dateSubmitted: response.created_date,
                reward: survey.points,
            };
        });
        
        res.status(200).json(surveyHistory);
    }
    catch (error) {
        console.log(error);
    }
    
};


