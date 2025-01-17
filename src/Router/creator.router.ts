import express from 'express';
import { generateToken, SignIn, SignUp, updatePassword,setNewPassword,forgotPassword, verifyOTP} from '../Controller/creator.controller';
// import VerifyToken from '../Middleware/VerifyToken';

const router = express.Router();

// Define routes with their respective controllers
router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.post("/generate-token", generateToken);
router.put("/update-password", updatePassword);

router.post("/forgotpassword", forgotPassword);
router.post("/verifyOTP", verifyOTP);

router.put("/setnewpassword",setNewPassword);

export default router;