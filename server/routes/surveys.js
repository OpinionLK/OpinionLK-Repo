import express, { application } from 'express';
import Surveys from '../models/Surveys.js';


import {
    getAllSurveys,
    getSurveysByCreator,
    getSurveyToReview,
    getQuestionCount,
    createResponse,
    createAnonResponse,
    getResponseCount,
    getQuestionToReview,
    addSurveyPoints,
    insertComment,
    ChangeSurveyState,
    createSurvey,
    getSurveyBySurveyId,
    addQuestion,
    getPlatformData,
    getSurveytoEdit,
    getQuestionToEdit,
    editQuestion,
    deleteQuestion,


} from '../controllers/SurveysC.js';
import multer from 'multer';

import ImageKit from "imagekit";

const imagekit = new ImageKit(
    {
        publicKey: "public_7aXbe5pmcYJOkB3NqDzOxEMSzzc=",
        privateKey: "private_uGPBzLXF15h5fskPbPBX0gkac3Y=",
        urlEndpoint: "https://ik.imagekit.io/7i3fql4kv7/"
    }

)

const upload = multer()

import { requireAuth } from '../middleware/requireAuth.js'


const router = express.Router();

// router.use(requireAuth)

router.post('/createResponse', createResponse); //create a survey response
router.post('/createAnonResponse', createAnonResponse); //create an anonymous survey response
router.post('/addSurveyPoints', addSurveyPoints); //add points to user
router.get('/getbyUserId', getSurveysByCreator); //get survey by creator id
router.get('/getbySurveyId/:surveyid', getSurveyBySurveyId); //get survey by survey id
router.get('/all', getAllSurveys); //get all surveys


router.get('/getsurveytoedit/:surveyid', getSurveytoEdit); //get survey to edit
router.get('/getquestiontoreview/:surveyid', getQuestionToReview); //get question to review
router.get('/getSurveyToReview/:surveyid', getSurveyToReview); //get survey to edit
router.put('/editquestion/:surveyid/:questionid', editQuestion); //send edited question data
router.get('/getQuestion/:surveyid/:questionid', getQuestionToEdit); //get the question data for editing
router.post('/addQuestion/:surveyid', addQuestion); //add a question to the survey
router.put('/deleteQuestion/:surveyid', deleteQuestion); //delete a question
router.post('/create', createSurvey); //create a survey
router.put('/changestatus/:surveyid', ChangeSurveyState); //change survey status
router.get('/getresponsecount/:surveyid', getResponseCount); //get response count
router.get('/getplatformdata', getPlatformData);
router.get('/getQuestionCount/:surveyid', getQuestionCount); //get question count

router.put('/insertComment/:surveyid', insertComment); //insert a comment




router.post("/:surveyid/imageUpload", upload.single("image"), async (req, res) => {

    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;
    const surveyid = req.params.surveyid;
console.log(surveyid);
    console.log(fileName);
    // Upload the file to ImageKit
    imagekit.upload({
        file: fileBuffer, //required
        fileName: fileName,  //required
        folder: "/survey_headers",

    }).then(async response => {

        //    update survey with image name
        const survey = await Surveys.findOneAndUpdate({ surveyID: surveyid }, { surveyImage: response.name }, {
            new: true
        }).then((survey) => {
            res.status(200).send(survey);
        }).catch(error => {
            console.log(error);
        });


    }).catch(error => {
        console.log(error);
    });

});


export default router;