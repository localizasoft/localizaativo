import { itemRoute } from "./routes/itemRoute"
import { S3Router } from "./routes/s3Router"
import { userRoute } from "./routes/userRoute"

const express = require('express')
const cors = require('cors')

const app = express()

//Disabling CORS for http's requests
app.use(cors())
app.options('*', cors())


//Converting response and payload to json
app.use(express.json())

//Adding routes
app.use(userRoute)
app.use(itemRoute)
app.use(S3Router)

export { app }