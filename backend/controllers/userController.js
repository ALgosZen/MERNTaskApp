//@desc Authenticate a USer
//@route POST /api/userss/login
//@access Public 

const loginUser = (req, res) => {
    res.json({message: 'Login User'})
}

//@desc Register new USer
//@route POST /api/users
//@access Public 

const registerUser = (req, res) => {
    res.json({message: 'Register User'})
}

//@desc get user data
//@route GET /api/users/me
//@access Public 

const getMe = (req, res) => {
    res.json({message: 'User data display'})
}


module.exports = {
    registerUser,
    loginUser,
    getMe,
}