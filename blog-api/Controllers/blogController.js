const Blog = require("../Models/blogModel")

exports.blogs = async(req,res)=>{
    try{
    //get all blogs
    const blogs  = await Blog.find({})
    res.status(200).json({blogs})
    }catch(e){
    res.status(400).json({message:"Could not get blogs"})
    }
    
}

exports.blog = async(req,res)=>{
    try{
    //get one blog
    const {id} = req.params
    const blog = await Blog.findById(id)
    res.status(200).json({blog})
    }catch(e){
        res.status(400).json({message:"Could not get the blog"})
    }
   
}

exports.saveBlog = async(req,res)=>{
    try{
    //save blog
    await Blog.create(req.body)
    res.status(200).json({message:"You have created a blog"})
    }catch(e){
        res.status(400).json({message:"Oops we could not save the blog"})
    }
   
}

exports.editBlog = async(req,res)=>{
    try{
    //edit blog
    const {id} = req.params
    await Blog.findByIdAndUpdate(id,req.body)
    res.status(200).json({message:"You have edited a blog"})
    }catch(e){
        res.status(400).json({message:"Oops we could not edit your blog"})
    }
   
}

exports.deleteBlog = async(req,res)=>{
    try{
        const {id} = req.params
        await Blog.findByIdAndDelete(id)
        res.status(200).json({message:"You have deleted a blog"})
    }catch(e){
        res.status(400).json({message:"Oops we could not delete your blog"})
    }
    
}