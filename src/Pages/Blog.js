// import {FaRegHeart,FaRegComment,FaRegBookmark} from "react-icons/fa"
import BlogAuthor from "../Components/BlogAuthor"
import BlogContent from "../Components/BlogContent"

import { useState,useEffect } from "react"
import { useParams } from "react-router-dom";
import { getOneblog } from "../Utils/Api";

function Blog(){
  const [blog, setBlog] = useState({});
    const { id } = useParams();
    const [loading,setLoading] = useState(true)
    useEffect(() => {
      getOneblog(id)
        .then((res) => {
          setBlog(res.data.blog);
          setLoading(false)
        })
        .catch((e) => {
          console.log(e);
        });
    }, []);
    if(loading) return
    return (
        <div className="flex my-5 space-x-5">
          <BlogContent blog={blog}/>
          <BlogAuthor  user={blog.user}/>
        </div>
    )
}

export default Blog