//This middle ware checks whether the user is logged in or not and set the username and email in the req
const express = require('express');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../data');
const { User } = require('../database/db');

const login = async (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    if(!username && !email){
        res.status(400).json({"error" : "Credentials not provided"});
        return;
    }
    let data = null;
    if(username){
        data= await User.find({username : username, password : password});
    }else{
        data = await User.find({email : email, password : password});
    }
    if(data.length == 0){
        res.status(400).json({"error" : "Invalid Credentials"});
        return;
    }
    username = data[0].username;
    email = data[0].email;
    const token = jwt.sign({username : username, email : email}, JWT_SECRET);
    res.status(200).json({
        "msg" : "Successful Login",
        "token" : token
    });
}
module.exports = {login};