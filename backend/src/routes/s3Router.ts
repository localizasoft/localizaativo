import { Router } from "express";
import { DeleteController } from "../controllers/s3/deleteController";
import { UploadController } from "../controllers/s3/uploadController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticate";

const multer = require('multer')
const multerUpload = multer({ dest: 'uploads/' })

const S3Router = Router();

const upload = new UploadController()
const deleteItem = new DeleteController()

S3Router.post('/api/item/uploadPhoto/:id', ensureAuthenticated, multerUpload.single("image"), upload.handle);
S3Router.delete('/api/item/deletePhoto/:id', ensureAuthenticated, deleteItem.handle);

export { S3Router }