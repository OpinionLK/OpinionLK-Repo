
import Surveys from '../models/Surveys.js';

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
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createSurvey = async (req, res) => {
    console.log(req.body);
    const survey = req.body;
    survey.creatorID = '64dba9a7bbbf7248137d5673'
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

export const getSurvey = async (req, res) => {
    const { surveyid } = req.params;
    try {
        const survey = await Surveys.find({ surveyID: surveyid });
        res.status(200).json(survey);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addQuestion = async (req, res) => {
    const { surveyid } = req.params;
    const { question } = req.body;

    question.questionID = generateCustomId();

    console.log(surveyid);
    console.log(question);

    try {
        const survey = await Surveys.findOneAndUpdate({ surveyID: surveyid }, { $push: { questions: question } }, {
            new: true,
        });
        console.log(survey);
        res.status(200).json(survey);
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
            res.status(200).json({ message: "Question deleted successfully.",
            resp: resp
        });
        }
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred." });
    }
}
