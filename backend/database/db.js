const mongoose = require("mongoose");
const { mongoURI }= require('../data');

mongoose.connect(mongoURI).then(() =>{
    console.log("Database Connected ")
}, () => {
    console.log("Connection failed");
})

const userSchema = new mongoose.Schema(
    {
        username : {type : String, required : true},
        email : {type : String, required : true},
        password : {type : String, required : true}
    }
)
const FavSchema = new mongoose.Schema({
    username : {type : String, required : true},
    favorites : {type : [String], default : []}
});

const FavCity = mongoose.model('FavCity', FavSchema);
const User = mongoose.model('User', userSchema);
module.exports = {User, FavCity};