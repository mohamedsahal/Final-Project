import BlogCard from "../Components/BlogCard"
import SideBar from "../Components/SideBar"
import ListCard from "../Components/ListCard"
import { useEffect, useState } from "react"
import { getAllBlogs } from "../Utils/Api"

function Home(){
    const [blogs,setBlogs] = useState([])
    useEffect(() =>{
        getAllBlogs().then((res)=>{
            setBlogs(res.data.blogs)
            
        }).catch((e)=>{
            console.log(e)

        })
        
    })
    return (
        <div className="flex justify-between space-x-5 mt-5">
           <SideBar/>
            <div className="flex-1">
               {blogs.map((blog)=> <BlogCard data={blog} />)}
            </div>
            <div className="basis-1/4">
                <div className="bg-slate-50 py-2 rounded-md">
                    <div className="flex justify-between items-center px-5 py-2">
                        <h3 className="font-bold">Listings</h3>
                        <small className="text-blue-700 font-semibold">See all</small>
                    </div>
                    <ListCard/>
                    
                </div>
            </div>
        </div>
    )
}

export default Home


