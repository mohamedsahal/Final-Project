const Comment = require("../Models/commentModel")

exports.comments = async(req,res)=>{
    try{
        const comments = await Comment.find({})
        res.status(200).json({comments})
    }catch(e){
        res.status(400).json({message:"Oops theres an error fetching the comments"})
    }
}

exports.saveComment = async(req,res)=>{
    try{
        await Comment.create(req.body)
        res.status(200).json({message:"You have created a comment"})
    }catch(e){
        res.status(400).json({message:"Oops theres an error saving the comments"})
    }
    
}

exports.editComment = async(req,res)=>{
    try{
        const {id} = req.params
        await Comment.findByIdAndUpdate(id,req.body)
        res.status(200).json({message:"You have edited the comment"})
    }catch(e){
        res.status(400).json({message:"Oops theres an error saving the comments"})
    }
}

exports.deleteComment = async(req,res)=>{
    try{
        const {id} = req.params
        await Comment.findByIdAndDelete(id)
        res.status(200).json({message:"You have deleted the comment"})
    }catch(e){
        res.status(400).json({message:"Oops theres an error saving the comments"})
    }
}