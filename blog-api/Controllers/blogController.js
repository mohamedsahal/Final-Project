const path = require("path");
const Blog = require("../Models/blogModel");
const User = require("../Models/userModel");
const fs = require("fs");


exports.blogs = async (req, res) => {
  try {
    //get all blogs
    const blogs = await Blog.find({}).populate("user")
    res.status(200).json({ blogs })
  } catch (e) {
    res.status(400).json({ message: "Could not get blogs" });
  }
};

exports.blog = async (req, res) => {
  try {
    //get one blog
    const { id } = req.params;
    const blog = await Blog.findById(id).populate("user");
    const imagePath = blog.image
    blog.image = imagePath;
    res.status(200).json({ blog });
  } catch (e) {
    res.status(400).json({ message: "Could not get the blog" });
  }
};

exports.userBlogs = async (req, res) => {
  try {
    const { id } = req.user;
    const blogs = await Blog.find({ user: id });
    res.status(200).json({ blogs });
  } catch (e) {
    res.status(400).json({ message: "Could not find  blog" });
  }
};

exports.saveBlog = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.location == null || user.bio == null || user.work == null) {
      return res
        .status(401)
        .json({ message: "Please complete your profile first." });
    }

    // Get the file path from req.file and add it to req.body
    if (req.file) {
      const imagePath = req.file.originalname
      req.body.image = imagePath;
    }

    req.body.user = req.user.id;

    // Add createdAt field with current date and time
    req.body.createdAt = Date.now();

    // Save blog
    await Blog.create(req.body);

    res.status(200).json({ message: "You have created a blog." });
  } catch (e) {
    res.status(400).json({ message: "Oops, we could not save the blog." });
  }
};

exports.editBlog = async (req, res) => {
  try {
    const { id } = req.params;
    let blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    let imagePath = blog.image;
    if (req.file) {
      imagePath = req.file.originalname;
    }
    
    await Blog.findByIdAndUpdate(id, { ...req.body, image: imagePath });
    res.status(200).json({ message: "You have edited a blog" });
  } catch (e) {
    res.status(400).json({ message: "Oops we could not edit your blog" });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: "You have deleted a blog" });
  } catch (e) {
    res
      .status(400)
      .json({ message: "Oops we could not delete your blog", error: e });
  }
};
