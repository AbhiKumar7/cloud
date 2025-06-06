import { Router } from "express";

import { changePassword, getUser, login, logOut, resgisterUser } from "../controller/user.controller.js";
import { googleLogin } from "../controller/googleLogin.js";
import { verifyuser } from "../middleware/auth.middleware.js";

let router = Router();


router.route("/registeruser").post(resgisterUser);
router.route("/userLogin").post(login);
router.route("/getuser").get(verifyuser,getUser);
router.route("/userlogout").post(verifyuser, logOut);
router.route("/changepassword").put(verifyuser, changePassword);
router.route("/google").post(googleLogin);




export default router;
