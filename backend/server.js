const express = require('express')
const { errorHandler } = require('./handlers/errorHandler')
const app = express()
//pkg for fancy colors of print messages 
const colors = require('colors')


const dotenv = require('dotenv').config
const port = process.env.PORT || 5001

//import db connection
const connectDB = require('./config/mdb')
connectDB()

//following two lines json and urlencoded should be set first before the route
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', require('./routers/goalRoutes'))

// this handler must be after the route as placed above
app.use(errorHandler)

app.listen(port, () => console.log(`server listening on port : ${port}`))