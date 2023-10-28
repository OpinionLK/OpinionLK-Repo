import Surveys from '../models/Surveys.js';
import jwt from 'jsonwebtoken';


export const getSurveytoEdit = async (req, res) => {
    const { surveyid } = req.params;
    try {
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
            console.log(token);
            if (survey[0].creatorID !== id) {
                console.log(survey);
                return res.status(401).json({ error: 'Unauthorized' });
            }
            // console.log(survey);
            res.status(200).json(survey);
        }
        catch (error) {
            res.status(404).json({ message: error.message });
        }
    } catch (error) {
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

