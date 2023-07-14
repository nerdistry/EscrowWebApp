const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');



const isAdmin = asyncHandler(async (req, res, next) => {
    console.log(req.user);
    const {email} = req.user;
    const adminUser = await User.findOne({email});
    if(adminUser.role !== 'admin'){
       throw new Error('Not authorized, you are not an admin.');
    }
    else{
        next();
    }
});
module.exports = { isAdmin};