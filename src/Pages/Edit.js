import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getOneblog } from "../Utils/Api";
import { updateBlog } from "../Utils/Api";


function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState({ title: "", content: "" });

  useEffect(() => {
    getOneblog(id)
      .then((res) => {
        setBlog({ title: res.data.blog.title, content: res.data.blog.content });
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [id]);

  function handleOnChange(e) {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  }

  function handleOnSubmit(e) {
    e.preventDefault();

    updateBlog(id,blog)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/Dashboard");
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }

  return (
    <div className="m-auto w-1/2 mt-5 p-5 bg-white rounded-md">
      <h2 className="mb-8 text-center font-bold text-2xl">Edit Post</h2>
      <form onSubmit={handleOnSubmit}>
        <div className="my-2">
          <input
            className="text-4xl font-bold w-full"
            type="text"
            placeholder="New post title here..."
            name="title"
            value={blog.title}
            onChange={handleOnChange}
          />
        </div>
        <div className="border border-gray-100 my-3"></div>

        <textarea
          className="border w-full rounded-md p-2 my-2"
          rows="10"
          placeholder="Blog content"
          name="content"
          value={blog.content}
          onChange={handleOnChange}
        ></textarea>
        <div className="flex justify-end">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-md">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
