const mongoose = require("mongoose")

mongoose.connect(process.env.DB)
.then(()=>{
    console.log("Connected to Database")
}).catch(()=>{
    console.log("Could not connect")
})