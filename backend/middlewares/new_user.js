//This middle ware determines whether the created user exists or not

const { User } = require("../database/db");

async function new_user(req, res, next){
    const username = req.body.username;
    const email = req.body.email;
    try{
        const withUserName = await User.find({username : username});
        const withEmail = await User.find({email : email});
        if(withUserName.length >= 1){
            res.status(400).json({error : "Username Already exists"});
            return;
        }
        if(withEmail.length >= 1){
            res.status(400).json({error : "Email Already Exists"});
            return;
        }
        next();
    }catch(e){
        console.log("Something bad happend");
        next();
    }
}
module.exports = {new_user};