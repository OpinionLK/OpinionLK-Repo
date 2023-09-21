import express, {application} from 'express';
import Surveys from '../models/Surveys.js';
import {
    getAllSurveys,
    getSurveysByCreator,

    createResponse,
    ChangeSurveyState,
    createSurvey,
    getSurveyBySurveyId,
    addQuestion,
    getSurveytoEdit,
    getQuestionToEdit,
    editQuestion,
    deleteQuestion,


} from '../controllers/SurveysC.js';
import multer from 'multer';
import fs from 'fs';

const upload = multer({dest: 'uploads/surveyheader'})

import {requireAuth} from '../middleware/requireAuth.js'


const router = express.Router();

// router.use(requireAuth)

router.post('/createResponse', createResponse); //create a survey response
router.get('/getbyUserId', getSurveysByCreator); //get survey by creator id
router.get('/getbySurveyId/:surveyid', getSurveyBySurveyId); //get survey by survey id
router.get('/all', getAllSurveys); //get all surveys


router.get('/getsurveytoedit/:surveyid', getSurveytoEdit); //get survey to edit
router.put('/editquestion/:surveyid/:questionid', editQuestion); //send edited question data
router.get('/getQuestion/:surveyid/:questionid', getQuestionToEdit); //get the question data for editing
router.post('/addQuestion/:surveyid', addQuestion); //add a question to the survey
router.put('/deleteQuestion/:surveyid', deleteQuestion); //delete a question
router.post('/create', createSurvey); //create a survey
router.put('/changestatus/:surveyid', ChangeSurveyState); //change survey status





router.post('/imageUpload', upload.single('image'), async (req, res) => {
    // 4
    const imageName = req.file.filename


    try{
        const survey = await Surveys.findOneAndUpdate({ surveyID: "aAZD6DLMllcc3yjh" }, { $set: { surveyImage: imageName } }, {
            new: true,
        });
    }catch(error){
        console.log(error)
    }

    console.log(imageName)
    res.send({imageName})
})



export default router;