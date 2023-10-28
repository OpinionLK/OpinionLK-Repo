import express, {application} from 'express';
import Surveys from '../models/Surveys.js';
import {
    getAllSurveys,
    getSurveysByCreator,

    createResponse,
    createAnonResponse,
    addSurveyPoints,
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

import ImageKit from "imagekit";

const imagekit = new ImageKit(
    {
        publicKey: "public_7aXbe5pmcYJOkB3NqDzOxEMSzzc=",
        privateKey: "private_uGPBzLXF15h5fskPbPBX0gkac3Y=",
        urlEndpoint: "https://ik.imagekit.io/7i3fql4kv7/"
    }

)

const upload = multer()

import {requireAuth} from '../middleware/requireAuth.js'


const router = express.Router();

// router.use(requireAuth)

router.post('/createResponse', createResponse); //create a survey response
router.post('/createAnonResponse', createAnonResponse); //create an anonymous survey response
router.post('/addSurveyPoints', addSurveyPoints); //add points to user
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





router.post("/imageUpload", upload.single("file"), async (req, res) => {
    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;
    const surveyid = req.body.surveyid;
    
    console.log(fileName);
// console.log(fileBuffer);
  
    try {
      // Upload the file to ImageKit
      imagekit.upload({
        file :  fileBuffer, //required
        fileName : fileName,  //required
        folder : "/survey_headers",
        
    }).then(response => {

        Surveys.findOneAndUpdate({surveyid: surveyid}, {header: response.url}, {new: true}).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        })

    }).catch(error => {
        console.log(error);
    });
        res.status(200).send("Image upload successful");

    } catch (error) {
      console.error(error);
      res.status(500).send("Image upload failed");
    }
  });


export default router;