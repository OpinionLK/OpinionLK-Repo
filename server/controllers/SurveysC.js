import jwt from 'jsonwebtoken';

import Surveys from '../models/Surveys.js';
import ComManagerModel from '../models/ComManagerModel.js';
import User from '../models/User.js';
import Client from "../models/Client.js";
import PlatformData from '../models/PlatformData.js';


function generateCustomId(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charsLength = chars.length;
    let id = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charsLength);
        id += chars[randomIndex];
    }

    const timestamp = Date.now().toString(36); // Convert timestamp to base36

    return `${id}${timestamp}`;
}

// Example usage
const customId = generateCustomId();
console.log(customId);


export const getAllSurveys = async (req, res) => {
    try {
        const surveys = await Surveys.find();
        res.status(200).json(surveys);
        console.log(res.data);
    } catch (error) {
        console.log("there is error fetchin data");
        res.status(404).json({ message: error.message });
    }
}


//get approved survey list from db
export const getApprovedSurveys=async(req,res) =>{

    try{
        const pendingsurveys=await Surveys.find({approvalStatus:"approved"});
        res.status(200).json(pendingsurveys);
        console.log(res.data);
    }catch{
        console.log("there is error fetchin data");
        res.status(404).json({ message: error.message });
    }
}


export const getSurveysByCreator = async (req, res) => {
   


    // get token from header
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // verify token
    const { id } = jwt.verify(token, 'test');
    // get offset from params

    // const
    try {
        const surveys = await Surveys.find({ creatorID: id }).sort({ 'created_date': -1 });
        // get total number of surveys
        const total = await Surveys.find({ creatorID: id }).countDocuments();
        res.status(200).json({ surveys: surveys, total: total });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getSurveysForComManager = async (req, res) => {
    // #swagger.tags = ['Organisation', 'Community Manager']


    // get token from header
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // verify token
    const { id } = jwt.verify(token, 'test');
    // get offset from params

    const { status } = req.params;
    try {
        let surveys = await Surveys.find({approvalStatus:status}).sort({ 'created_date': -1 });

        for (let i = 0; i < surveys.length; i++) {
            const creator = await Client.find({ _id: surveys[i].creatorID }, { orgName: 1, _id: 0 });
            let survey = surveys[i].toObject(); // Convert to a plain JavaScript object
            survey.creatorName = creator[0].orgName;
            surveys[i] = survey; // Replace the original document with our modified object
        }

        console.log(surveys);

        const total = await Surveys.find({approvalStatus: status}).countDocuments();
        res.status(200).json({ surveys: surveys, total: total });
    } catch (error) {
        console.error(error);
    }

}

export const createResponse = async (req, res) => {
    try {
        const { surveyid, response } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        // verify token
        const { id } = jwt.verify(token, 'test');

        // console.log(surveyid);

        const responseID = generateCustomId();

        const now = new Date();
        const nowLocal = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
        const created_date = nowLocal.toISOString().slice(0,19).replace("T", " ");

        const newResponse = {
            responseID: responseID,
            userID: id,
            responses: response.responses,
            created_date: created_date,
        };
        console.log(newResponse);

        // Add the new response to the survey document in the database as an object in the responses array
        const resp = await Surveys.updateOne(
            { surveyID: surveyid },
            { $push: { responses: newResponse } },
            { new: true }
        );

        res.status(200).json({
            message: 'Response added successfully.',
            resp: resp,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error adding response.', error: error.message });
    }
}

export const createAnonResponse = async (req, res) => {
    try {
      const { surveyid, response, userTags, preQResponse } = req.body;
        
      const responseID = generateCustomId();
  
      const newResponse = {
        responseID: responseID,
        // userID: NULL,
        // flag: 1,
        preQResponses: preQResponse,
        responses: response.responses,
      };
      console.log(newResponse);

      // Add the new response to the survey document in the database as an object in the responses array
      const resp = await Surveys.updateOne(
        { surveyID: surveyid },
        { $push: { responses: newResponse } },
        { new: true }
      );
  
      res.status(200).json({
        message: 'Response added successfully.',
        responseID: responseID,
        resp: resp,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error adding response.', error: error.message });
    }
}

export const addSurveyPoints = async (req, res) => {
    // add points to a user's points where userID = id
    // points is an integer
    try {
        const { points } = req.body;

        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        // verify token
        const { id } = jwt.verify(token, 'test');

        const resp = await User.updateOne(
            { _id: id },
            { $inc: { points: points } },
            // { new: true }
        );

        res.status(200).json({
            message: 'Points added successfully.',
            resp: resp,
        });

    } catch (error) {
        res.status(500).json({ message: 'Error adding points.', error: error.message });
    }
}

export const createSurvey = async (req, res) => {
    // #swagger.tags = ['Organisation', 'Community Manager']


    // get token from header
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // verify token
    const { id } = jwt.verify(token, 'test');


    console.log(req.body);
    const survey = req.body;
    survey['creatorID'] = id;
    survey['surveyID'] = generateCustomId();


    const newSurvey = new Surveys(survey);
    try {
        await newSurvey.save();
        res.status(201).json(newSurvey);
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message });
    }
}

export const getSurveyBySurveyId = async (req, res) => {

    const { surveyid } = req.params;
    try {
        const survey = await Surveys.findOne({ surveyID: surveyid });
        res.status(200).json(survey);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }


}



export const addQuestion = async (req, res) => {
    // #swagger.tags = ['Organisation', 'Community Manager']

    const { surveyid } = req.params;
    console.log(req.body);
    const { data } = req.body;

    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // verify token
    const { id } = jwt.verify(token, 'test');
    console.log(id);

    try {
        const survey = await Surveys.find({ surveyID: surveyid });
        console.log(survey[0].creatorID);
        if (survey[0].creatorID !== id) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

    data.questionID = generateCustomId();
    console.log(surveyid);


    try {

        const resp = await Surveys.updateOne(
            { surveyID: surveyid },
            { $push: { questions: data } }
        );

        const updated = await Surveys.find({ surveyID: surveyid });


        res.status(200).json({
            message: "Question added successfully.",
            resp: updated
        });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const ChangeSurveyState = async (req, res) => {
    // #swagger.tags = ['Organisation', 'Community Manager']

    // AUTHORISE USER

    try {

        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        if (!token) {
            console.log('no token');
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // verify token

        const { id } = jwt.verify(token, 'test');

        // check if user is creator of survey

        const survey = await Surveys.find({ surveyID: req.params.surveyid });
        const commanager = await ComManagerModel.find({ _id: id });

        console.log(survey[0].creatorID);


        const { surveyid } = req.params;
        const { state } = req.body;

        if (state === 'pending') {
            const { estCost, duration, endCriteria, userTag } = req.body;
            if (endCriteria === 'duration')
                console.log('duration');
            if (endCriteria === 'responses') {
                console.log('responses');
                const { response } = req.body;
                console.log(response);
            }
            const resp = await Surveys.updateOne(
                { surveyID: surveyid },
                { $set: { approvalStatus: 'pending', estimatedCost: estCost, duration: duration, endCriteria: endCriteria, userTags: userTag } }
            );
            if (resp.Modified > 0) {
                res.status(404).json({ message: "Survey not found." });
            } else {
                res.status(200).json({
                    message: "Survey state changed successfully.",
                    data: resp

                });
            }
        }
        if (state === 'approved') {
            const resp = await Surveys.updateOne(
                { surveyID: surveyid },
                { $set: { approvalStatus: 'approved' } }
            );
            if (resp.Modified > 0) {
                res.status(404).json({ message: "Survey not found." });
            } else {
                res.status(200).json({
                    message: "Survey state changed successfully.",
                    data: resp

                });
            }
        }
        if (state === 'rejected') {
            const { rejectionComment } = req.body;
            const resp = await Surveys.updateOne(
                { surveyID: surveyid },
                { $set: { approvalStatus: 'rejected', rejectionComment: rejectionComment } }
            );
            if (resp.Modified > 0) {
                res.status(404).json({ message: "Survey not found." });
            } else {
                res.status(200).json({
                    message: "Survey state changed successfully.",
                    data: resp

                });
            }
        }
        if (state === 'suspend') {
            const resp = await Surveys.updateOne(
                { surveyID: surveyid },
                { $set: { approvalStatus: 'suspend' } }
            );
            if (resp.Modified > 0) {
                res.status(404).json({ message: "Survey not found." });
            } else {
                res.status(200).json({
                    message: "Survey state changed successfully.",
                    data: resp

                });
            }
        }

        if (state === 'active') {
            // get survey duration from db and set expiration date from time of activation
            const duration = await Surveys.find({ surveyID: surveyid }, { duration: 1, _id: 0 });
            console.log(duration);
            const expiration_date = Date.now() + duration * 86400000;
            console.log(expiration_date);
            const resp = await Surveys.updateOne(
                { surveyID: surveyid },
                { $set: { approvalStatus: 'active', expiration_date: expiration_date } }
            );
            if (resp.Modified > 0) {
                res.status(404).json({ message: "Survey not found." });
            } else {
                res.status(200).json({
                    message: "Survey state changed successfully.",
                    data: resp

                });
            }
        }



       
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred." });
    }
}


export const deleteQuestion = async (req, res) => {
    // #swagger.tags = ['Organisation', 'Community Manager']

    const { surveyid } = req.params;
    const { questionid } = req.body;
    console.log(surveyid);
    console.log(questionid);
    try {

        const resp = await Surveys.updateOne(
            { surveyID: surveyid },
            { $pull: { questions: { questionID: questionid } } },
            { new: true }
        );


        if (resp.Modified > 0) {
            res.status(404).json({ message: "Question not found." });
        } else {
            res.status(200).json({
                message: "Question deleted successfully.",
                resp: resp
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred." });
    }
}




export const getSurveytoEdit = async (req, res) => {

    // #swagger.description = 'Gets survey to edit, checks edit privileges'
    // #swagger.tags = ['Organisation', 'Community Manager']
    const { surveyid } = req.params;
    try {

        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            console.log('no token');
            return res.status(401).json({ error: 'Unauthorized' });
        }
        // verify token
        const { id } = jwt.verify(token, 'test');

        try {
            const survey = await Surveys.find({ surveyID: surveyid });
            const commanager = await ComManagerModel.find({ _id: id });
            let questionCount = await Surveys.aggregate([
                {
                    $match: { surveyID: surveyid }
                },
                {
                    $project: {
                        questionCount: { $size: "$questions" }
                    }
                }
            ])


            console.log(questionCount[0].questionCount);
            // add question count to survey object
            survey[0].questionCount = questionCount[0].questionCount;
            console.log(survey[0].questionCount);
            if (survey[0].creatorID == id || commanager) {
                console.log(survey[0]);

                return res.status(200).json(survey);
            } else {
                return res.status(401).json({ error: 'Unauthorized' });
            }
        }

        catch (error) {
            t
            res.status(404).json({ message: error.message });
        }
    } catch (error) {
        console.log('something went wrong');
        res.status(404).json({ message: error.message });
    }
}
export const getSurveyToReview = async (req, res) => {

    // #swagger.description = 'Gets survey to edit, checks edit privileges'
    // #swagger.tags = ['Organisation', 'Community Manager']
    const { surveyid } = req.params;
    try {

        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            console.log('no token');
            return res.status(401).json({ error: 'Unauthorized' });
        }
        // verify token
        const { id } = jwt.verify(token, 'test');

        try {
            const survey = await Surveys.find({ surveyID: surveyid });
            const commanager = await ComManagerModel.find({ _id: id });
            const client = await Client.find({ _id: survey[0].creatorID }, { orgName: 1, _id: 0 });
    console.log(client);
            if (survey[0].creatorID == id || commanager) {
                const { surveyid } = req.params;
                let responseCount = await Surveys.aggregate([
                    {
                        $match: { surveyID: surveyid }
                    },
                    {
                        $project: {
                            responseCount: { $size: "$responses" }
                        }
                    }
                ])
                let questionCount = await Surveys.aggregate([
                    {
                        $match: { surveyID: surveyid }
                    },
                    {
                        $project: {
                            questionCount: { $size: "$questions" }
                        }
                    }
                ])

                console.log(responseCount[0].responseCount);
                console.log(questionCount[0].questionCount);
                let response = {
                    surveyID: survey[0].surveyID,
                    surveyName: survey[0].surveyName,
                    surveyDescription: survey[0].surveyDescription,
                    surveyImage : survey[0].surveyImage,
                    surveyPoints: survey[0].points,
                    created_date: survey[0].created_date,
                    creatorName: client[0].orgName,
                    creatorID: survey[0].creatorID,
                    surveyStatus: survey[0].approvalStatus,
                    questions: survey[0].questions,
                    questionCount: questionCount[0].questionCount,
                    responseCount: responseCount[0].responseCount,
                    userTags: survey[0].userTags,
                }
                console.log(response);
                return res.status(200).json(
                    response
                );
            } else {
                return res.status(401).json({ error: 'Unauthorized' });
            }
        }
        catch (error) {
            console.log(error);
            res.status(404).json({ message: error.message });
        }
    } catch (error) {
        console.log(error);
        console.log('something went wrong');
        res.status(404).json({ message: error.message });
    }
}
export const getQuestionToReview = async (req, res) => {

    // #swagger.description = 'Gets survey to edit, checks edit privileges'
    // #swagger.tags = ['Organisation', 'Community Manager']
    const { surveyid } = req.params;
    try {

        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            console.log('no token');
            return res.status(401).json({ error: 'Unauthorized' });
        }
        // verify token
        const { id } = jwt.verify(token, 'test');

        try {
            const survey = await Surveys.find({ surveyID: surveyid });
            const commanager = await ComManagerModel.find({ _id: id });

            if (survey[0].creatorID == id || commanager) {
                console.log(survey);

                let response = {
                    questions: survey[0].questions,
                }
                return res.status(200).json(
                    response
                );
            } else {
                return res.status(401).json({ error: 'Unauthorized' });
            }
        }
        catch (error) {
            console.log(error);
            res.status(404).json({ message: error.message });
        }
    } catch (error) {
        console.log(error);
        console.log('something went wrong');
        res.status(404).json({ message: error.message });
    }
}



export const editQuestion = async (req, res) => {

    const token = req.headers.authorization.split(' ')[1];

    const questionID = req.params.questionid;
    const surveyid = req.params.surveyid;
    const data = req.body.data;

    console.log(questionID);

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    // verify token
    const { id } = jwt.verify(token, 'test');

    try {
        const survey = await Surveys.find({ surveyID: surveyid });
        // console.log(survey[0].creatorID);
        // console.log(id);
        // console.log(token);
        if (survey[0].creatorID !== id) {
            console.log(survey);
            return res.status(401).json({ error: 'Unauthorized' });
        }

        console.log(data);
        // update the question in the survey

        let updatedSurvey = null;
        // get the response type from question id

        const responseType = survey[0].questions.filter((question) => question.questionID === questionID)[0].responseType;

        console.log("A " + responseType);
        console.log("B " + data.responseType);

        if (data.responseType === responseType) {
            if (data.responseType === 'shorttext' || data.responseType === 'longtext') {
                console.log('shorttext editing');
                updatedSurvey = await Surveys.findOneAndUpdate(
                    { surveyID: surveyid, "questions.questionID": questionID },
                    {
                        $set: {
                            "questions.$.textPlaceholder": data.textPlaceholder,
                            "questions.$.question": data.question,
                            "questions.$.responseType": data.responseType,
                        }
                    },
                    { new: true }
                );
            }

            if (data.responseType === 'singlechoice') {
                updatedSurvey = await Surveys.findOneAndUpdate(
                    { surveyID: surveyid, "questions.questionID": questionID },
                    {
                        $set: {
                            "questions.$.question": data.question,
                            "questions.$.items": data.items,
                        }
                    },
                    { new: true }
                );
            }
            if (data.responseType === 'multiplechoice') {
                updatedSurvey = await Surveys.findOneAndUpdate(
                    { surveyID: surveyid, "questions.questionID": questionID },
                    {
                        $set: {
                            "questions.$.question": data.question,
                            "questions.$.items": data.items,
                        }
                    },
                    { new: true }
                );
            }
            if (data.responseType === 'mood') {
                updatedSurvey = await Surveys.findOneAndUpdate(
                    { surveyID: surveyid, "questions.questionID": questionID },
                    {
                        $set: {
                            "questions.$.question": data.question,
                            "questions.$.items": data.items,
                        }
                    },
                    { new: true }
                );
            }
            console.log(updatedSurvey);

        } else {
            if (data.responseType === 'shorttext' || data.responseType === 'longtext') {

                updatedSurvey = await Surveys.findOneAndUpdate(
                    { surveyID: surveyid, "questions.questionID": questionID },
                    {
                        $unset: {
                            "questions.$.items": 1,
                        },
                        $set: {
                            "questions.$.textPlaceholder": data.placeholder,
                            "questions.$.question": data.question,
                            "questions.$.responseType": data.responseType,
                        },
                    },
                    { new: true }
                );
            }

            if (data.responseType === 'singlechoice') {
                updatedSurvey = await Surveys.findOneAndUpdate(
                    { surveyID: surveyid, "questions.questionID": questionID },
                    {
                        $unset: {
                            "questions.$.textPlaceholder": 1,
                        },
                        $set: {
                            "questions.$.question": data.question,
                            "questions.$.items": data.items,
                            "questions.$.responseType": data.responseType,
                        }
                    },
                    { new: true }
                );
            }
            if (data.responseType === 'multiplechoice') {
                updatedSurvey = await Surveys.findOneAndUpdate(
                    { surveyID: surveyid, "questions.questionID": questionID },
                    {
                        $unset: {
                            "questions.$.textPlaceholder": 1,
                        },
                        $set: {
                            "questions.$.question": data.question,
                            "questions.$.items": data.items,
                            "questions.$.responseType": data.responseType,
                        }
                    },
                    { new: true }
                );
            }
            if (data.responseType === 'mood') {
                updatedSurvey = await Surveys.findOneAndUpdate(
                    { surveyID: surveyid, "questions.questionID": questionID },
                    {
                        $unset: {
                            "questions.$.textPlaceholder": 1,
                        },
                        $set: {
                            "questions.$.question": data.question,
                            "questions.$.items": data.items,
                            "questions.$.responseType": data.responseType,
                        }
                    },
                    { new: true }
                );
            }
            // console.log(updatedSurvey);
        }
        res.status(200).json(updatedSurvey);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getQuestionToEdit = async (req, res) => {
    const { surveyid, questionid } = req.params;
    try {
        // get question from survey
        const survey = await Surveys.find({ surveyID: surveyid });
        const question = survey[0].questions.filter((question) => question.questionID === questionid);
        res.status(200).json(question);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getResponseCount = async (req, res) => {
    const { surveyid } = req.params;
    let responseCount = await Surveys.aggregate([
        {
            $match: { surveyID: surveyid }
        },
        {
            $project: {
                responseCount: { $size: "$responses" }
            }
        }
    ])
    console.log(responseCount[0].responseCount);
}


export const insertComment = async (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    console.log(token);

    // verify token
    const { id } = jwt.verify(token, 'test');


    const { surveyid } = req.params;

    try {
        const survey = await Surveys.find({ surveyID: surveyid });
        const comment = req.body;
        const newComment = {
            commentID: generateCustomId(),
            managerID: id,
            comment: comment.comment,
            created_date: Date.now(),
        };
        const resp = await Surveys.updateOne(
            { surveyID: surveyid },
            { comments: newComment },
            { new: true }
        );
        res.status(200).json({
            message: 'Comment added successfully.',
            resp: resp,
        });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPlatformData = async (req, res) => {
    const data = await PlatformData.find({});
    res.status(200).json(data[0]);
}

export const getQuestionCount = async (req, res) => {
    const { surveyid } = req.params;
    let questionCount = await Surveys.aggregate([
        {
            $match: { surveyID: surveyid }
        },
        {
            $project: {
                questionCount: { $size: "$questions" }
            }
        }
    ])
    console.log(questionCount[0].questionCount);
    res.status(200).json(questionCount[0].questionCount);
}