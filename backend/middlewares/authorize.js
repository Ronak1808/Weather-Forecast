//This middleware authenticates whether the token is correct or not 
const express = require('express');
const { JWT_SECRET } = require('../data');
const jwt = require('jsonwebtoken');
const authorize = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        res.status(400).json({"error" : "Empty Token"});
        return;
    }
    try{
        const data = jwt.verify(token, JWT_SECRET);
        req.body.username = data.username;
        req.body.email = data.email;
        next();
    }catch(e){
        res.status(400).json({"error" : "Invalid Token"});
        return;
    }
}
module.exports = {authorize};