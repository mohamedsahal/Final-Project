const User = require("../Models/userModel")
const bcrypt = require("bcrypt")

exports.login = async (req,res)=>{
try{
  const {email,password} = req.body
  const findUser = await User.findOne({email})
  if(!findUser) {
    return res.status(400).json({message:"Email or Password is incorrect"})  
}
    const comparePassword = await bcrypt.compare(password,findUser.password)
    console.log(comparePassword)
    if(comparePassword === false) {
        return res.status(400).json({message:"Email or Password is incorrect"})
   
  } 

    res.status(200).json({message:"You have logged in"})
}catch(e){
    res.status(400).json({message:"error"})
}
}

exports.signUp = async(req,res)=>{
try{
    const {email,password} = req.body
    const findUser = await User.findOne({email})
    if(findUser){
     return res.status(400).json({message:"Email already in use"})
    }
    const hashPasword = await bcrypt.hash(password, 10)
    req.body.password = hashPasword
 
    await User.create(req.body)
    res.status(200).json({message:"You have created a account"})
}catch(e){
    res.status(400).json({message:"Oops we couldn't save"})
    
}
}
