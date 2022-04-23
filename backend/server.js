const express = require('express')
const { errorHandler } = require('./handlers/errorHandler')
const app = express()

const dotenv = require('dotenv').config
const port = process.env.PORT || 5001

//following two lines json and urlencoded should be set first before the route
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', require('./routers/goalRoutes'))

// this handler must be after the route as placed above
app.use(errorHandler)

app.listen(port, () => console.log(`server listening on port : ${port}`))