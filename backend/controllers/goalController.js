const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')

//@desc Get Goals
//@routes GET /apu/goals
//@access Private
const getGoals = asyncHandler( async(req, res) => {
    const goals = await Goal.find()

    res.status(200).json(goals)
})

//@desc Set Goals
//@routes POST /apu/goals
//@access Private
const setGoal = asyncHandler( async(req, res) => {
    
    if(!req.body.text){
        res.status(400)
        throw new Error('pls add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
    })

    res.status(200).json(goal)
})

//@desc Update Goals
//@routes PUT /apu/goals/:id
//@access Private
const updateGoal = asyncHandler (async(req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found to update')
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