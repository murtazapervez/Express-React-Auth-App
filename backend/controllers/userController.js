const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')
const jwt = require('jsonwebtoken')
const bycrypt = require('bcryptjs')

// @desc Register User
// @route POST /api/register
// @access public
const registerUser = asyncHandler(async (req, res) => {

    const {username , email, password} = req.body

    if(!username || !email || !password){
        res.status(400)
        throw Error('Please add all fields')
    }

    //If user exists
    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400)
        throw Error('User Already Exists')
    }

    const salt = await bycrypt.genSalt(10)
    const hashedPassword = await bycrypt.hash(password, salt)

    const user = await User.create({
        username,
        email,
        password : hashedPassword,
    })

    if(user){
        res.status(200).json({message:'User Registered Successfully.', data: user, _token: generateJWT(user.id)})
    }else{
        res.status(400).json({message:'Something went wrong.'})
    }
})


// @desc Authenticate User
// @route POST /api/login
// @access public
const login = asyncHandler( async (req, res) => {

    const {email, password} = req.body

    const user  = await User.findOne({email})
    
    if(user && (await bycrypt.compare(password, user.password))){
        return res.status(200).json({message:'User logged in Successfully.', data: user, _token: generateJWT(user.id)})
    }else{
        return res.status(400).json({message:'Invalid Credentials.'})
    }

})

// @desc Get User Data
// @route POST /api/login
// @access Private
const getUserData = asyncHandler( async (req, res) => {

    const {_id, username, email} = await User.findById(req.user.id)

    res.status(200).json({message:'Get User Data', 
        id: _id,
        name: username,
        email: email
    })
})


// Generate JWT Token
const generateJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    login,
    getUserData
}