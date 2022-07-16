import { Router } from 'express'
import { ChargeController } from '../controllers/chargeController/chargeController'

const chargeDataBaseRouter = Router()

const multer = require('multer')
const multerUpload = multer({ dest: 'uploads/' })

const chargeController = new ChargeController()

chargeDataBaseRouter.post('/api/upload/charge', multerUpload.single("excel"), chargeController.handle)

export { chargeDataBaseRouter }