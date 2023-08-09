import express, { application } from 'express';
import {
    ClientUserData,
    OrganizationSignUp,
    ClientData,
    ClientSignUp,
    ClientLogin
} from '../controllers/clientAuthC.js';
import {requireAuth} from '../middleware/requireAuth.js'


const router = express.Router();

router.use(requireAuth)
router.post('/userdata', ClientUserData);
router.post('/signup', OrganizationSignUp);
router.post('/signup/ClientData', ClientData);
router.post('/client/signup/ClientSignUp', ClientSignUp);
router.post('/client/login/ClientLogin', ClientLogin);

export default router;