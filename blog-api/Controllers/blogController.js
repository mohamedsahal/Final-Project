const Blog = require("../Models/blogModel")
const User = require("../Models/userModel");



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
    const blog = await Blog.findById(id).populate("user")
    res.status(200).json({blog})
    }catch(e){
        res.status(400).json({message:"Could not get the blog"})
    }
   
}

exports.userBlogs = async(req,res)=>{
    try {
        const {id} = req.user
        const blogs = await Blog.find({user:id})
        res.status(200).json({blogs})
        
    } catch (e) {
        res.status(400).json({message:"Could not find  blog"})
        
    }


}

exports.saveBlog = async(req,res)=>{
    try{
        const user = await User.findById(req.user.id);
        // checking if all inputs are filled of
        if (user.location == null || user.bio == null || user.work == null) {
            
          return res
            .status(401)
            .json({ message: "please compelete your profile first" });
            
        }
     
        req.body.user = req.user.id;
      
    //save blog
    await Blog.create(req.body);
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