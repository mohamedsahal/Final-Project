//title:string
//content:string
const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    title:{
        type:String
    },
    content:{
        type:String
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }

})

const blogModel = mongoose.model("Blog",blogSchema)

module.exports = blogModel