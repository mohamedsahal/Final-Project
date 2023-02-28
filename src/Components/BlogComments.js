import Comment from "./Comment"
import { UserContext } from "../Utils/UserContext";
import { useContext } from "react";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getComments } from "../Utils/Api";
import { postComment } from "../Utils/Api";
import jwtDecode from "jwt-decode";

function BlogComments(props) {
  const defaultImage = "https://www.tech101.in/wp-content/uploads/2018/07/blank-profile-picture.png";
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [image, setImage] = useState(null);

  //fetching the comments from database using useEffect
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      setImage(decodedToken.image);
    }

    fetchComments();
    const intervalId = setInterval(fetchComments, 100); 
    return () => clearInterval(intervalId); 
  }, []);

  function fetchComments() {
    getComments(id)
      .then((res) => {
        setComments(res.data.comments);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function handleOnSubmit(e) {
    postComment(comment, id)
      .then(() => {
        toast.success("posted comment");
        fetchComments()
        setComment('')
      })
      .catch(() => {
        toast.error("Oops! could not posted ");
      });
  }

  return (
    <div className="border-t py-5 px-16">
      <h1 className="font-bold text-2xl">Top comment(s)</h1>
      {user && (
        <div className="py-5">
          <div className="flex space-x-2">
            <div className="h-12 w-12">
              <img
                className="rounded-full"
                src={`/uploads/${image}`}
                alt=""
                onError={(e) => {e.target.src = defaultImage}}
              />
            </div>
            <textarea
              className="border w-full rounded-md p-2"
              placeholder="Add to the discussion"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button className="bg-blue-600 p-2" onClick={handleOnSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
      {comments.map((comment) => (
        <Comment data={comment} />
      ))}
    </div>
  );
}

export default BlogComments;
