const User = require("../Models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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
const token = jwt.sign({
    id: findUser.id,
    email: findUser.email
}, process.env.JWT_SECRET, {expiresIn:"1d"})


    res.status(200).json({message:"You have logged in",token})
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


exports.protect =  (req,res,next)=>{
    try{
      const token = req.headers.authorization;
        if(!token){
            return res.status(401).json({ message: "You've not log in " });
        }

        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
           
            if (err) {
              return res.status(400).json({ message: "Please log in again " });
            }
      
            
            req.user = {
              id: decoded.id,
              email: decoded.email,
            };
         
          });

    } catch (e) {
        res.status(401).json({ message: e });
      }
      next();
    };
    