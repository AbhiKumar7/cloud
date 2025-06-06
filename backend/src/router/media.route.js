import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { verifyuser } from "../middleware/auth.middleware.js";
import {
  deleteImageById,
  getAllImage,
  getImageById,
  updatedImageById,
  uploadImage,
} from "../controller/media.controller.js";
let router = Router();

router
  .route("/uploadImage/:albumId")
  .post(
    upload.fields([{ name: "avatar", maxCount: 10 }]),
    verifyuser,
    uploadImage
  );
router.route("/getimage").get(verifyuser, getAllImage);
router.route("/getimagebyid/:albumId").get(verifyuser, getImageById);
router.route("/deleteimagebyid/:imageId").delete(verifyuser, deleteImageById);
router.route("/updatebyId/:imageId").put(verifyuser, updatedImageById);

export default router;
