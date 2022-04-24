const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


//@desc Register new USer
//@route POST /api/users
//@access Public 

const registerUser = asyncHandler(async(req, res) => {
    //get user details from req
    const {name, email, password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please enter all fields')
    }

    // check if user already exists. duplicate emails not allowed.
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    // now encrypt password
    const salt = await bcrypt.genSalt(10)
    const hashedPW = await bcrypt.hash(password, salt)

    // create user in db now
    const user = await User.create({
        name, email, password: hashedPW
    })
    // check if user created successfully
    if (user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })

    }else{
        res.status(400)
        throw new Error('Create user in db failed')
    }
})




//@desc Authenticate and login User
//@route POST /api/users/login
//@access Public 

const loginUser = asyncHandler( async(req, res) => {
    const {email, password} = req.body
    
    if(!email || !password){
        res.status(400)
        throw new Error('Please enter email and password')
    }
    // check if user is valid
    const user = await User.findOne({email})
    //compare user submitted password with encrypted password from user model
    //const validPW = await bcrypt.compare(user.password, password)
    // compare values must be in correct order . else it always fails to compare
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    }else{
        res.status(400)
        throw new Error('invalid Credentials')
    }
})




//@desc get user data
//@route GET /api/users/me
//@access Private 

const getMe = asyncHandler(async(req, res) => {
   const { _id, name, email } = await User.findById(req.user.id)
 
   res.status(200).json({
       id: _id,
       name,
       email,
   })
   // res.json({message: 'User data display'})
})


// Generate JWT token and add/append to user coll
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}
 


module.exports = {
    registerUser,
    loginUser,
    getMe,
}