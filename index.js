const express = require("express")
require("dotenv").config()
const cors = require("cors")
const userRouter = require("./router/users.routes")
const productsRouter = require("./router/products.routes")
const adminsRouter = require("./router/admins.routes")



const k_app = express()
k_app.use(cors())
k_app.use(express.json())
const PORT = process.env.PORT  || 3000

k_app.get("/", (req, res) => {
    res.status(200).json({
        message : " salom ustoz"
    })
})


// Routers
k_app.use(userRouter)
k_app.use(productsRouter)
k_app.use(adminsRouter)




k_app.listen(PORT, ()=>{
    console.log("Server is running at:", PORT);
    
})