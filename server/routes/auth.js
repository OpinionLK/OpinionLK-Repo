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

import {
    ClientSignUp,
    ClientLogin
} from '../controllers/clientAuthC.js';

import{
    Getmembers,
    Savemember,
    Updatemember,
    Deletemember
}from '../controllers/AddMemberC.js';

console.log('auth.js');


const router = express.Router();
router.post('/signup', SignUp);
router.post('/login', Login);


router.post('/client/signup', ClientSignUp);
router.post('/client/login', ClientLogin);

router.get('/getmembers', Getmembers);
router.post('/savemember', Savemember);
router.put('/updatemember/:id', Updatemember);
router.delete('/deletemember/:id', Deletemember);

export default router;