import { Router } from "express";
import { verifyuser } from "../middleware/auth.middleware.js";
import { createAlbum, deleteAlbum, getAlbumById, getAllAlbum, updateAlbum } from "../controller/album.controller.js";



let router = Router();
router.route("/createalbum").post(verifyuser, createAlbum)
router.route("/getAllalbum").get(verifyuser, getAllAlbum)
router.route("/getalbumById/:albumId").get(verifyuser, getAlbumById)
router.route("/updatealbum/:albumId").put(verifyuser, updateAlbum)
router.route("/deletealbum/:albumId").delete(verifyuser, deleteAlbum)





export default router;
