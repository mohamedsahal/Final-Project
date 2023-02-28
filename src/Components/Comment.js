import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { deleteComment } from "../Utils/Api";
import { toast } from "react-toastify";

function Comment(props) {
  const defaultImage = "https://www.tech101.in/wp-content/uploads/2018/07/blank-profile-picture.png";
  const [user, setUser] = useState(null);
  

  useEffect(() => {
  
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken.id);
    }

    
  }, []);


  function handleDelete() {
    deleteComment(props.data._id)
    .then((res) => {
      toast.success(res.data.message);

    })
  .catch(error => {
    console.error(error);
    toast.error("Failed to delete comment");
  });
  }

  return (
    <div className="py-5">
      <div className="flex space-x-2">
        <div className="">
          <img
            className="h-12 w-12 rounded-full"
            src={`/uploads/${props.data.user.image}`} alt="" onError={(e) => {e.target.src = defaultImage}}
          />
        </div>
        <div className="border w-full rounded-md p-3 relative ">
          <div className="flex items-center space-x-1">
            <h2>
              {props.data.user.firstName} {props.data.user.secondName}
            </h2>
            <h2 className="text-gray-500">12 Jan</h2> 
          </div>
          <p className="text-lg py-2">{props.data.comment}</p>
          {user === props.data.user._id && (
            <div className="absolute top-3 right-0 h-16 w-16">
              <RiDeleteBin6Line className="text-red-500 cursor-pointer " onClick={handleDelete}/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
