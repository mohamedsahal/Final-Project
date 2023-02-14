import axios from "axios";

let URL = "http://localhost:8000";
const token = localStorage.getItem("token")


export const getAllBlogs =()=>{
   return axios.get(`${URL}/blog`)

}

export const getOneblog =(id)=>{
    return axios.get(`${URL}/blog/${id}`)
 
 }

 export const getUsersblogs =()=>{
    return axios.get(`${URL}/blog/my`, {headers: {Authorization:token}})
 
 }

 export const login =(inputs)=>{
  
   return axios.post(`${URL}/auth/login`, inputs)

}

export const signup =(inputs)=>{
  
   return axios.post(`${URL}/auth/signup`, inputs)

}

export const newPost =(inputs)=>{
   return axios.post(`${URL}/blog`, inputs, {headers: { Authorization: token }})
}

export const getComments =(id)=>{
   return axios.get(`${URL}/comment/${id}`)

}


export const postComment =(comment,id)=>{
   return axios.post(`${URL}/comment`,
   {
     comment: comment,
     blog: id,
   },
   {
     headers: { Authorization: token },
   }
 )
}



export const updateBlog = (id, blog) => {
   return axios.put(`${URL}/blog/${id}`, blog)
 }