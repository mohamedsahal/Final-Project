import {CiEdit} from "react-icons/ci"
import {MdOutlineDelete} from "react-icons/md"
import { useState,useEffect } from "react"
import { getUsersblogs } from "../Utils/Api"


function BlogList(){
    const [blogs,setBlogs] = useState([])
    
    useEffect(()=>{
        getUsersblogs()
        .then((res)=>{
            setBlogs(res.data.blogs)
        }).catch((e)=>{
            console.log(e)
        })

    },[])

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
            {blogs.map((blog)=>
            <tr className="border-y h-10">
            <td>{blog.title}</td>
            <td><CiEdit className="text-blue-800"/></td>
            <td><MdOutlineDelete className="text-red-500"/></td>
            </tr>
            )}
        </tbody>
        </table>
    </div>
    )
}

export default BlogList