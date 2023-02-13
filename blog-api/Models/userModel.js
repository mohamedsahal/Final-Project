const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        require:true
    },
    secondName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    location: {
        type: String,
      },
      bio: {
        type: String,
      },
      work: {
        type: String,
      }
})

const userModel = mongoose.model('User',userSchema)

module.exports = userModel