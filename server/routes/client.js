import express, { application } from 'express';
import {
    ClientUserData
} from '../controllers/clientAuthC.js';
import {requireAuth} from '../middleware/requireAuth.js'


const router = express.Router();

router.use(requireAuth)
router.post('/userdata', ClientUserData);

export default router;