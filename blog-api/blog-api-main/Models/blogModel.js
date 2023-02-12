//title:string
//content:string
const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    title:{
        type:String
    },
    content:{
        type:String
    }
})

const blogModel = mongoose.model("Blog",blogSchema)

module.exports = blogModel