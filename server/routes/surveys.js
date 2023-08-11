import express, { application } from 'express';
import {
    getAllSurveys,
} from '../controllers/SurveysC.js';
import {requireAuth} from '../middleware/requireAuth.js'


const router = express.Router();

// router.use(requireAuth)
router.get('/all', getAllSurveys);

export default router;