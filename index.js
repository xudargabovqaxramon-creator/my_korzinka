const express = require("express")
require("dotenv").config()
const cors = require("cors")
const userRouter = require("./router/users.routes")
const productsRouter = require("./router/products.routes")



const k_app = express()
k_app.use(cors())
k_app.use(express.json())
const PORT = process.env.PORT  || 3000



// Router
k_app.use(userRouter)
k_app.use(productsRouter)

k_app.listen(PORT, ()=>{
    console.log("Server is running at:", PORT);
    
})