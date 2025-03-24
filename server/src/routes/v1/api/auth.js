import express from 'express';
import { sendOtp, signin, verifyOtpAndSignup } from '../../../controller/auth/auth.controller.js';
// import { sendOtp, signin, verifyOtpAndSignup } from '../../../controller/auth/auth.controller';



const router = express.Router();

router.post('/sendotp',sendOtp);
router.post('/signup',verifyOtpAndSignup);
router.post('/signin',signin);


export default  router;