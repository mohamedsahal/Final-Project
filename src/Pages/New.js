import { useState } from "react";
import { newPost } from "../Utils/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function New() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  function handleFileUpload(event) {
    setFile(event.target.files[0]);
  }

  function handleOnSubmit() {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", inputs.title);
    formData.append("content", inputs.content);
    formData.append("image", file);
  
    // Check if title and content are not empty 
    if (!inputs.title || !inputs.content) {
      toast.error("Title and content are required");
      setIsLoading(false);
      return;
    }
  
    newPost(formData, file)
      .then(() => {
        toast.success("Blog posted");
        navigate("/");
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  
  

  return (
    <div className="m-auto w-1/2 mt-5 p-5 bg-white rounded-md">
      <h2 className="mb-8 text-center font-bold text-2xl">Blog post</h2>
      <input type="file" name="image" onChange={handleFileUpload} />
      <div className="my-2">
        <input
          className="text-4xl font-bold w-full"
          type="text"
          placeholder="New post title here..."
          onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
        />
      </div>
      <div className="border border-gray-100 my-3"></div>

      <textarea
        className="border w-full rounded-md p-2 my-2"
        rows="10"
        placeholder="Blog content"
        onChange={(e) => setInputs({ ...inputs, content: e.target.value })}
      ></textarea>
      <div className="flex justify-end ">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleOnSubmit}
          disabled={isLoading} // disable the button while loading
        >
          {isLoading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}

export default New;
