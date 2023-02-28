import {MdSearch} from "react-icons/md"
import {Link} from "react-router-dom"
import { UserContext } from "../Utils/UserContext";
import { useContext } from "react";
import { useEffect,useState } from "react";
import jwtDecode from "jwt-decode";

function Header(){
    const defaultImage = "https://www.tech101.in/wp-content/uploads/2018/07/blank-profile-picture.png";
    const [image, setImage] = useState(null);
    useEffect(()=>{
        const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      setImage(decodedToken.image);
    }

    },[])
    const { user } = useContext(UserContext);
    
    return (
        <div className="flex justify-between bg-white py-4 px-20  border-b-2">
            <div className="flex items-center">
                <Link to="/">
                    <img className="h-9" src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png" alt=""/>
                </Link>
                <div className="ml-3 flex items-center border-2 px-2 rounded-md">
                    <input className="p-1.5 w-72" type="text" placeholder="Search"/>
                    <MdSearch size={25}/>
                </div>
            </div>
            {user?
          (  <div className="flex items-center">
                <Link to="/new">
                <button className="border border-blue-700 py-1.5 px-2.5 rounded-md text-blue-700">Post Blog</button>
                </Link>
                <Link to="/dashboard">
                <div className="h-10 w-10 ml-4">               
                     <img className="rounded-full" 
                     src={`/uploads/${image}`}
                     alt=""
                     onError={(e) => {e.target.src = defaultImage}}
                     />
                </div>
                </Link>
            </div>)
           :
          (  <div>
                <Link to="/login">
                <button className="mr-3">Log in</button>
                </Link>
                <Link to="/signup">
                <button className="border border-blue-700 py-1.5 px-2.5 rounded-md text-blue-700">Create Account</button>
                </Link>
            </div>)
           
        }
          
        </div>
    )
}

export default Header