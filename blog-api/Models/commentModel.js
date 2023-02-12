//comment:string
const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({
    comment:{
        type:String
    }
})

const commentModel = mongoose.model("Comment",commentSchema)

module.exports = commentModel