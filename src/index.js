const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
dotenv.config()

mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => {
        console.log('Connect to database success!')
    })
    .catch((err) => {
        console.log(err)
    })

const app = express()
const port = process.env.PORT || 3001
app.use(cors())
app.use(express.json());
app.use(bodyParser.json())
app.use(cookieParser());
 
routes(app)


app.listen(port, () => {
    console.log('server is running in PORT', + port)
})
