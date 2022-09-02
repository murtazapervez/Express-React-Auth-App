const asyncHandler = require('async-error-handler') 

// @desc Gets Projects
// @route /api/projects
// @access GET
getProjects = asyncHandler( async (req, res) => {
    res.json({message:'Get Projects'})
})


// @desc Add Project
// @route /api/projects
// @access POST
setProject = asyncHandler( async (req, res) => {

    if(!req.body.text){
        res.status(400)
        throw new Error('Text is required');
    }

    console.log(req.body);
    res.json({message:'Set Project'})
})


// @desc Update Project
// @route /api/project/:id
// @access PUT
updateProject = asyncHandler( async (req, res) => {
    res.json({message:'Update Project'})
})


// @desc Delete Project
// @route /api/project/:id
// @access DELETE
deleteProject = asyncHandler( async (req, res) => {
    res.json({message:'Delete Project'})
})



module.exports = {
    getProjects,
    setProject,
    updateProject,
    deleteProject
}