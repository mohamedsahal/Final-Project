const User = require("../Models/userModel")

exports.login = (req,res)=>{
    res.status(200).json({message:"You have logged in"})
}

exports.signUp = async(req,res)=>{
try{
    await User.create(req.body)
    res.status(200).json({message:"You have created a account"})
}catch{
    res.status(400).json({message:"Oops we couldn't save"})
}
}
