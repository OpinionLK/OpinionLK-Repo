import jwt from 'jsonwebtoken';

import { Surveys, Mood, Choice, Text } from '../models/Surveys.js';


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
        const surveys = await Surveys.find().limit(5).sort({ 'created_date': -1 });
        res.status(200).json(surveys);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const checkEditPrivilege = async (req, res) => {
    const { surveyid } = req.params;
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // verify token
    const { _id } = jwt.verify(token, 'test');

    try {
        const survey = await Surveys.find({ surveyID: surveyid });
        console.log(survey.creatorID);
        console.log(_id);
        if (survey.creatorID !== id) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        res.status(200).json({ message: "Authorized" });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }



}

export const getSurveysByUser = async (req, res) => {

    // get token from header
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // verify token
    const { id } = jwt.verify(token, 'test');

    // const
    try {
        const surveys = await Surveys.find({ creatorID: id }).limit(5).sort({ 'created_date': -1 });
        res.status(200).json(surveys);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createSurvey = async (req, res) => {

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

export const getSurveytoEdit = async (req, res) => {
    const { surveyid } = req.params;
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    // verify token
    const { id } = jwt.verify(token, 'test');

    try {
        const survey = await Surveys.find({ surveyID: surveyid });
        console.log(survey[0].creatorID);
        console.log(id);
        // console.log(token);
        if (survey[0].creatorID !== id) {
            console.log(survey);
            return res.status(401).json({ error: 'Unauthorized' });
        }
        console.log(survey);
        res.status(200).json(survey);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addQuestion = async (req, res) => {
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



    // switch (data.responseType) {
    //     case 'shorttext':
    //         QuestionSchema = new Text(data);
    //         break;
    //     case 'longtext':
    //         QuestionSchema = new Text(data);
    //         break;
    //     case 'singlechoice':
    //         QuestionSchema = new Choice(data);
    //         break;
    //     case 'multiplechoice':
    //         QuestionSchema = new Choice(data);
    //         break;
    //     case 'mood':
    //         QuestionSchema = new Mood(data);
    //         console.log(QuestionSchema);
    //         break;
    //     default:
    //         console.log("Invalid response type");
    //         QuestionSchema = new Text(data);
    //         break;
    // }

    try {

        const resp = await Surveys.updateOne(
            { surveyID: surveyid },
            { $push: { questions: data } },
            { new: true }
        );
        console.log(resp);
        res.status(200).json({
            message: "Question added successfully.",
            resp: resp
        });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const deleteQuestion = async (req, res) => {
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


