const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')
const jwt = require('jsonwebtoken')


const protect =  asyncHandler(async ( req, res, next) => {
   let token
   
   if(req.headers.authorization && req.headers.authorization.startsWith('Bearar')){
    
    try {
        token = req.headers.authorization.split(' ')[1]

        //verify token
        const decode = jwt.verify(token, process.env.JWT_SECRET)

        //Extract user from token
        req.user = await User.findById(decode.id).select('-password')

        next()

     } catch (error) {
        console.log(error)

        res.status(401)
        throw new Error('Un-Authorized')
     }
   }
   
   if (!token) {
      res.status(401)
      throw new Error('Not Authorized. Token not found')
   }
   
  })
  
  module.exports = {
    protect,
  }