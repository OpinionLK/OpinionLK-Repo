import express, { application } from 'express';
import {
    SignUp,
    SignUp2,
    Login,
    sendmail
} from '../controllers/authC.js';

import{
    Getmembers,
    Savemember,
    Updatemember,
    Deletemember,
    Usersignups, 
    TotalSurvey,
    Totalusers,
    TotalClients,
    AprovalStatus,
    Clientsignups
}from '../controllers/AddMemberC.js';

const router = express.Router();

router.post('/signup', SignUp);
router.post('/signup2', SignUp2);
router.post('/login', Login);
router.post('/sendEmail', sendmail);

router.get('/getmembers', Getmembers);
router.post('/savemember', Savemember);
router.put('/updatemember/:id', Updatemember);
router.delete('/deletemember/:id', Deletemember);

router.get('/usersignups', Usersignups);
router.post('/totalsurvey', TotalSurvey);
router.post('/totalusers', Totalusers);
router.post('/totalclients', TotalClients);
router.get('/approvalstatus',AprovalStatus);//get approval status
router.get('/clientsignups', Clientsignups);//get client signups')

export default router;