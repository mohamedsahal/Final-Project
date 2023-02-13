import Comment from "./Comment"
import { UserContext } from "../Utils/UserContext";
import { useContext } from "react";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getComments } from "../Utils/Api";
import { postComment } from "../Utils/Api";

function BlogComments(){
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [comment, setComment] = useState("");
    const [Comments , setComments] = useState([])
    const token = localStorage.getItem("token");
  //fetching the comments from database using useEffect 
  useEffect(()=>{
    getComments(id).then((res)=>{
  setComments(res.data.comments)
  }).catch((e)=>[
    console.log(e)
  
  ])
  },[])
  function handleOnSubmit() {
    postComment(comment,id)
      .then((res) => {
        toast.success("posted comment");
      })
      .catch(() => {
        toast.error("Oops! could not posted ");
      });
    }
  
    return (
        <div className="border-t py-5 px-16">
            <h1 className="font-bold text-2xl">Top comment(s)</h1>
            {user && 
            <div className="py-5">
                <div className="flex space-x-2">
                <div className="h-12 w-12">               
                     <img className="rounded-full" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"/>
                </div>
                    <textarea className="border w-full rounded-md p-2" placeholder="Add to the discussion" onChange={(e) => setComment(e.target.value)}></textarea>
                </div>
                <div className="flex justify-end">
                    <button className="bg-blue-600 p-2" onClick={handleOnSubmit}>Submit</button>
                </div>
            </div>
}
      {Comments.map((comment)=> <Comment data={comment}/>)}
        </div>
    )
}

export default BlogComments