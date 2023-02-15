//comment:string
const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({
    comment:{
        type:String
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    blog:{
        type:mongoose.Types.ObjectId,
        ref:"Blog"
    }
})

const commentModel = mongoose.model("Comment",commentSchema)

module.exports = commentModel