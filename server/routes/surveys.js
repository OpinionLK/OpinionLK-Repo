import express, { application } from 'express';
import {
    getAllSurveys,
    createSurvey,
    getSurvey,
    addQuestion,
    deleteQuestion
} from '../controllers/SurveysC.js';
import {requireAuth} from '../middleware/requireAuth.js'


const router = express.Router();

// router.use(requireAuth)
router.get('/all', getAllSurveys);
router.post('/create', createSurvey);
router.get('/getsurvey/:surveyid', getSurvey); 
router.post('/addQuestion/:surveyid', addQuestion);
router.put('/deleteQuestion/:surveyid', deleteQuestion);


export default router;