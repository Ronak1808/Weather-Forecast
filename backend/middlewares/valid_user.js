//This middle ware checks whether the details provided by the user follow the semantics 
const zod = require('zod');

const userSchema = zod.object({
    username : zod.string().min(3).max(50),
    email : zod.string().email(),
    password : zod.string().min(6)
});

function valid_user(req, res, next){
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    try{
        const data = {username, email, password};
        userSchema.parse(data);
        next();
    }catch(e){
        console.log("Invalid User Details");
        res.status(400).json({
            error : "Validation error"
        })
    }
}
module.exports = {valid_user};