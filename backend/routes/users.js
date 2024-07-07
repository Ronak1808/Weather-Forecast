const express = require('express');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../data');
const { valid_user } = require('../middlewares/valid_user');
const { new_user } = require('../middlewares/new_user');
const { User, FavCity } = require('../database/db');
const { login } = require('../middlewares/login');
const { authorize } = require('../middlewares/authorize');
const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const newUser = new User({username, email, password});
    await newUser.save();
    res.json("Data saved");
})

userRouter.post('/signin', login);

userRouter.post('/favs/remove/:city', authorize, async (req, res) => {
    const cityname = req.params.city;
    const username = req.body.username;
    try{
        const fav_list = await FavCity.findOneAndUpdate(
            {username : username},
            {$pull : {favorites : cityname}},
            {new : true}
        );
        if(fav_list){
            res.status(200).json({
                "data" : fav_list
            })
        }else{
            res.status(400).json({"msg" : "Something bad with server"});
        }  
    }catch(e){
        res.status(400).json({"msg" : "Something bad with server"});
    }
})
userRouter.post('/favs/add/:city', authorize, async (req, res) => {
    const cityname = req.params.city;
    const username = req.body.username;
    try{
        const fav_list = await FavCity.findOneAndUpdate(
            {username : username},
            { $addToSet : { favorites : cityname}},
            {new : true, upsert : true}
        );
        if(fav_list){
            res.status(200).json({
                "data" : fav_list
            })
        }else{
            res.status(400).json({"msg" : "Something bad with server"});
        }   
    }catch(e){
        console.log(e);
        res.status(400).json({"msg" : "Something bad with server"});
    }
})
userRouter.get('/favs', authorize,  async (req, res) => {
    const username = req.body.username;
    const data = await FavCity.find({username : username});
    res.status(200).json({
        "data" : data
    })
})
module.exports = {userRouter};