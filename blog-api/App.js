const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const multer = require("multer")

const app = express()

const authRoutes = require("./Routes/authRoutes")
const blogRoutes = require("./Routes/blogRoutes")
const commentRoutes = require("./Routes/commentRoutes")



dotenv.config({path:"./.env"})
require("./server")
app.use(cors())

app.use(express.json())

app.use("/auth",authRoutes)
app.use("/comment",commentRoutes)
app.use("/blog",blogRoutes, )
app.use('/uploads', express.static('uploads'));


const PORT = 8000

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})