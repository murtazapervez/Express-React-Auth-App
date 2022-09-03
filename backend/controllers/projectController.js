const asyncHandler = require('express-async-handler')
const Project = require('../models/projectsModel')
const User = require('../models/usersModel');


// @desc Gets Projects
// @route /api/projects
// @access GET
const getProjects = asyncHandler( async (req, res) => {

    const projects = await Project.find({user: req.user.id})
     
    res.json({message:'', data: projects})
})


// @desc Add Project
// @route /api/projects
// @access POST
const setProject = asyncHandler(async (req, res) => {

    if(!req.body.text){
        res.status(400)
        throw new Error('Text is required');
    }

    const project = await Project.create({
        text : req.body.text,
        user : req.user.id, 
    }) 

    res.status(200).json({message:'Project Set Successfully!', data: project})
})


// @desc Update Project
// @route /api/project/:id
// @access PUT
const updateProject = asyncHandler( async (req, res) => {

    const _id = req.params.id;
    
    const project = await Project.findById(_id)

    if(!project) {
        res.status(400)
        throw new Error('Project not found!')
    }

    if(project.user.toString() == req.user.id) {
        res.status(400)
        throw new Error('User not authorized!')
    }
    
    const updatedProject = await Project.findByIdAndUpdate(_id, req.body, {
        new:true
    }) 

    res.status(200).json({message:'Project Updated Successfully!', data: updatedProject})
})


// @desc Delete Project
// @route /api/project/:id
// @access DELETE
const deleteProject = asyncHandler( async (req, res) => {

    const _id = req.params.id;
    
    const project = await Project.findById(_id)

    if(!project || project.user.toString() == req.user.id) {
        res.status(400)
        throw new Error('Project not found!')
    }


    if(project.user.toString() == req.user.id) {
        res.status(400)
        throw new Error('User not authorized!')
    }

    await project.remove();

    res.json({message:'Project Deleted', data: _id})
})



module.exports = {
    getProjects,
    setProject,
    updateProject,
    deleteProject
}