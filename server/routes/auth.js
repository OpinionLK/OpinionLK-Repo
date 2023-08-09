import express, { application } from 'express';
import {
    SignUp,
    Login
} from '../controllers/authC.js';

// import {
//     ClientSignUp,
//     ClientLogin,
//     OrganizationSignUp,
//     ClientData
// } from '../controllers/clientAuthC.js';

const router = express.Router();
router.post('/signup', SignUp);
router.post('/login', Login);


export default router;