const express = require('express');
const mongoose = require('mongoose');
const {user} = require('../Model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRETKEY );
}

module.exports.VerifyUser = asyncHandler(async(req,res)=>{
    console.log(req.body);
    const{email,password} = req.body;
    const user1 = await user.findOne({email:email});
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }
    if(user1 && (await bcrypt.compare(password,user1.password))){
        console.log("user login succesful");
        res.status(200).json({message:"User Found",
            _id : user1.id,
            username: user1.username,
            email : user1.email,
            password: user1.password,
            token: generateToken(user1._id)
        });
    }
    else {
        res.status(400).json({message:"Wrong email or password"});
    }
});

module.exports.RegisterUser =  asyncHandler(async(req,res) => {
    console.log(req.body);
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }
    const exists = await user.findOne({email});
    if(exists){
        res.status(400);
        throw new Error("User Exits/ Email already used!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password,salt);
    const user1 = await user.create({
        username:username,
        email:email,
        password:hashPass,
        books:[]
    });

    if(user1){
        res.status(200).json({message:"User generated",
            _id : user1.id,
            username: user1.username,
            email : user1.email,
            password: user1.password,
            token: generateToken(user1._id)
        })
    }else {
        res.status(400)
        throw new Error("Error ingratiating user")
    }
})
