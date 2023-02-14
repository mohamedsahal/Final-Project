import {CiEdit} from "react-icons/ci"
import {MdOutlineDelete} from "react-icons/md"
import { useState,useEffect } from "react"
import { getUsersblogs,deleteBlog } from "../Utils/Api"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



function BlogList(){
    const navigate = useNavigate();
    function handleOnEdit(id){
        navigate(`/edit/${id}`);
    }
    const [blogs,setBlogs] = useState([])
    
    useEffect(()=>{
        getUsersblogs()
        .then((res)=>{
            setBlogs(res.data.blogs)
        }).catch((e)=>{
            console.log(e)
        })

    },[])

    function handleOnDelete(id) {
      deleteBlog(id)
        .then((res) => {
          toast.success(res.data.message);
          getUsersblogs()
            .then((res) => {
              setBlogs(res.data.blogs);
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          toast.error(e.response.data.message);
        });
    }
    

    return(
    <div className="mt-5">
       <table className="table-auto w-full">
        <thead>
            <tr className="text-left h-10 text-sm">
            <th>Blog Title</th>
            <th>Edit</th>
            <th>Delete</th>
            </tr>
        </thead>
        <tbody>
        {blogs.map((blog) => {
  return (
    <tr className="border-y h-10">
      <td>{blog.title}</td>
      <td>
        <CiEdit
          className="text-blue-800 cursor-pointer"
          onClick={() => handleOnEdit(blog._id)}
        />
      </td>
      <td>
        <MdOutlineDelete className="text-red-500 cursor-pointer" 
        onClick={() => handleOnDelete(blog._id)}
        />
      </td>
    </tr>
  );
})}
        </tbody>
        </table>
    </div>
    )
}

export default BlogList;
