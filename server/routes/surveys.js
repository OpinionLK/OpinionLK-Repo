import express, {application} from 'express';
import {Surveys} from '../models/Surveys.js';
import {
    getAllSurveys,
    getSurveysByUser,
    getSurveyByID,
    createResponse,
    ChangeSurveyState,
    createSurvey,
    getSurveyBySurveyId,
    addQuestion,
    checkEditPrivilege,
    deleteQuestion,
    getSurveytoEdit,

} from '../controllers/SurveysC.js';
import multer from 'multer';
import fs from 'fs';

const upload = multer({dest: 'uploads/surveyheader'})

import {requireAuth} from '../middleware/requireAuth.js'


const router = express.Router();

// router.use(requireAuth)
router.get('/byid', getSurveysByUser);
router.get('/fillSurvey/:surveyid', getSurveyByID);
router.post('/createResponse', createResponse);
router.get('/getbyUserId', getSurveysByUser);
router.get('/getbySurveyId/:surveyid', getSurveyBySurveyId);
router.put('/changestatus/:surveyid', ChangeSurveyState);
router.get('/all', getAllSurveys);
router.post('/create', createSurvey);
router.get('/getsurvey/:surveyid', getSurveytoEdit);
router.post('/addQuestion/:surveyid', addQuestion);
router.put('/deleteQuestion/:surveyid', deleteQuestion);
router.get('/checkeditpriviledge/:surveyid', checkEditPrivilege);

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