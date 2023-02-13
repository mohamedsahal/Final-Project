import { useState } from "react"
import { toast } from "react-toastify"
import { signup } from "../Utils/Api"


function Signup(){
    const[inputs,setInputs] = useState({ })
    function handleOnSubmit(){
        signup(inputs)
        .then((res)=> toast.success("Accout Created"))
        .catch((e)=> toast.error(e.response.data.message))
    }
    return (
        <div className="bg-white m-auto mt-10 rounded-md p-10 w-[650px] ">
            <div className="text-center">
                <h3 className="font-bold text-2xl">Welcome to DEV Community 👩‍💻👨‍💻</h3>
                <p>DEV Community 👩‍💻👨‍💻 is a community of 989,800 amazing developers </p>
            </div>
            <div className="py-3 space-y">
                <div className="flex flex-col">
                    <span className="py-2">First Name</span>
                    <input className="border border-gray-300 p-2 rounded-md" type="text" onChange={(e)=>setInputs({...inputs,firstName:e.target.value})}/>
                </div>
                <div className="flex flex-col">
                    <span className="py-2">Second Name</span>
                    <input className="border border-gray-300 p-2 rounded-md" type="text" onChange={(e)=>setInputs({...inputs,secondName:e.target.value})}/>
                </div>
                <div className="flex flex-col">
                    <span className="py-2">Email</span>
                    <input className="border border-gray-300 p-2 rounded-md" type="text" onChange={(e)=>setInputs({...inputs,email:e.target.value})}/>
                </div>
                <div className="flex flex-col">
                    <span className="py-2">Password</span>
                    <input className="border border-gray-300 p-2 rounded-md" type="text" onChange={(e)=>setInputs({...inputs,password:e.target.value})}/>
                </div>
               
            </div>
            <div className="mt-2">
                 <button className="bg-blue-600 text-white p-3 rounded-md w-full" onClick={handleOnSubmit}>Create Account</button>
             </div>
        </div>
    )
}

export default Signup