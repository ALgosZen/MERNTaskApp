const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// next passes control to the next matching route and so on.. 
// refer to this doc http://qnimate.com/express-js-middleware-tutorial/

const protect = asyncHandler( async (req, res, next) =>{
    let token

    // if req header is auth and starts with bearer split the string and seperate the index to get decoded token so we can compare

    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ){
        try{
            //get token from header
            token = req.headers.authorization.split(' ')[1]
            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //get user from db using the id in decoded
            req.user = await User.findById(decoded.id).select('-password')
            next()

        }catch(error){
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }


})

module.exports = { protect }