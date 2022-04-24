const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
//const User = require('../models/userModel')

//@desc Get Goals for the given user
//@routes GET /apu/goals
//@access Private
const getGoals = asyncHandler( async(req, res) => {
    const goals = await Goal.find({user: req.user.id})

    res.status(200).json(goals)
})

//@desc Set Goals for the user
//@routes POST /apu/goals
//@access Private
const setGoal = asyncHandler( async(req, res) => {
    
    if(!req.body.text){
        res.status(400)
        throw new Error('pls add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal)
})

//@desc Update Goals for the logged in user
//@routes PUT /apu/goals/:id
//@access Private
const updateGoal = asyncHandler (async(req, res) => {
    
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found to update')
    }

    //if not user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure logged in user matches the goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('user not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id
        ,req.body ,{
            new : true,
        })
    res.status(200).json(updatedGoal)
    //res.status(200).json({message : `update goal ${req.params.id}`})
})

//@desc Delete Goals
//@routes DELTE /apu/goals/:id
//@access Private
const deleteGoal = asyncHandler( async(req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found to delete')
    }

    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure logged in user matches the goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('user not authorized')
    }

    await goal.remove()
    res.status(200).json({id: req.params.id})

    //res.status(200).json({message : `delete goal ${req.params.id}`})
})


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}