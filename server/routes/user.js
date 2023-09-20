import express, { application } from 'express';
import {
    getAllSurveys,
} from '../controllers/SurveysC.js';

import {
    userData
} from '../controllers/UserC.js';

const router = express.Router();

router.get('/allsurveys', getAllSurveys);
router.get('/userdata', userData);


export default router; 