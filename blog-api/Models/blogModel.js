
const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    title:{
        type:String
    },
    content:{
        type:String
    },
    image:{
        type:String
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }

})

const blogModel = mongoose.model("Blog",blogSchema)

module.exports = blogModel
