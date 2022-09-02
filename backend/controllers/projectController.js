const asyncHandler = require('async-error-handler') 
const Project = require('../models/projectsModel')

// @desc Gets Projects
// @route /api/projects
// @access GET
const getProjects = asyncHandler( async (req, res) => {

    const projects = await Project.find()
     
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

    if(!project) {
        res.status(400)
        throw new Error('Project not found!')
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