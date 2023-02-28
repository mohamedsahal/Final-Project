import { useState } from "react"
import { FaRegComment } from "react-icons/fa"
import { Link } from "react-router-dom"

function BlogCard(props) {
  const [imageLoaded, setImageLoaded] = useState(true);

  function handleImageError() {
    setImageLoaded(false);
  }

  return (
    <Link to={`/blog/${props.data._id}`}>
      <div className="bg-white border rounded-md mb-4">
        {imageLoaded && (
          <div>
            <img
              className="rounded-t-md"
              src={`/uploads/${props.data.image}`}
              alt="sawir"
              onError={handleImageError}
            />
          </div>
        )}
        <div className="flex space-x-3 p-6">
          <div className="h-12 w-12">
            <img
              className="rounded-full"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
              alt="sawir"
            />
          </div>
          <div className="space-y-1.5">
            <div className="leading-4">
              <h4>Mohamed ahmed</h4>
              <small className="text-gray-400">Jan 12</small>
            </div>
            <div>
              <h3 className="font-bold text-2xl hover:text-sky-600">
                {props.data.title}
              </h3>
            </div>
            <div className="flex items-center space-x-1.5">
              <FaRegComment size={15} className="text-gray-700" />
              <small className="text-gray-700">3 Comments</small>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
