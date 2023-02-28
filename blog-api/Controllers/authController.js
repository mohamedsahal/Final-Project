const User = require("../Models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.password = async (req, res) => {
  try {
    const { email, id } = req.user;

    // console.log(req.body.newPassword);
    const { oldPassword, newPassword, ConPassword } = req.body;
    const findUser = await User.findOne({ email });

    //checking if they are matching
    const checkingPassword = await bcrypt.compare(
      oldPassword,
      findUser.password
    );
    //checking if they are matching
    if (checkingPassword === false) {
      return res
        .status(400)
        .json({ message: "please correct your previous password" });
    }

    if (ConPassword !== newPassword) {
      return res.status(400).json({ message: "they're not matching" });
    }

    //hashing new password and selecting the old password from my database
    const hashNewPassword = await bcrypt.hash(newPassword, 10);
    //editing the old password
    await User.findByIdAndUpdate(id, { password: hashNewPassword }).then(() => {
      res.status(200).json({ message: "You've changed successfully " });
    });
  } catch (e) {
    res.status(400).json({ message: "Please try again" });
  }
};

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
    email: findUser.email,
    image: findUser.image
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

exports.profile = async (req, res) => {
  try {
    //finding the user id
    const findId = req.user.id;

    // Get the file path from req.file and add it to req.body
    if (req.file) {
      const imagePath = req.file.originalname;
      req.body.image = imagePath;
    }

    //finding Id and updating
    await User.findByIdAndUpdate(findId, req.body).then(() => {
      res.status(200).json({ message: "You've successfully changed your profile" });
    });
  } catch (e) {
    res.status(400).json({ message: "OOPS couldn't change your profile" });
  }
};



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
              image: decoded.image,
            };
         
          });

    } catch (e) {
        res.status(401).json({ message: e });
      }
      next();
    };
    