const asyncHandler = require('express-async-handler')

//@desc Get Goals
//@routes GET /apu/goals
//@access Private
const getGoals = asyncHandler( async(req, res) => {
    res.status(200).json({message : 'Get Goals'})
})

//@desc Set Goals
//@routes POST /apu/goals
//@access Private
const setGoal = asyncHandler( async(req, res) => {
    
    if(!req.body.text){
        res.status(400)
        throw new Error('pls add a text field')
    }
    res.status(200).json({message : 'Set Goals'})
})

//@desc Update Goals
//@routes PUT /apu/goals/:id
//@access Private
const updateGoal = asyncHandler (async(req, res) => {
    res.status(200).json({message : `update goal ${req.params.id}`})
})

//@desc Delete Goals
//@routes DELTE /apu/goals/:id
//@access Private
const deleteGoal = asyncHandler( async(req, res) => {
    res.status(200).json({message : `delete goal ${req.params.id}`})
})


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}