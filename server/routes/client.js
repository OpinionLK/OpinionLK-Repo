import express, { application } from 'express';
import {
    ClientSignUp,
    ClientData,
} from '../controllers/clientAuthC.js';

import {
    getSurveytoEdit,
    getQuestionToEdit,
    editQuestion,
} from '../controllers/ClientC.js';

import {requireAuth} from '../middleware/requireAuth.js'

const router = express.Router();


router.post('/signup', ClientSignUp);
router.get('/clientdata', ClientData);
router.get('/getsurvey/:surveyid', getSurveytoEdit);
router.put('/editquestion/:surveyid/:questionid', editQuestion);
router.get('/getQuestion/:surveyid/:questionid', getQuestionToEdit);



export default router;