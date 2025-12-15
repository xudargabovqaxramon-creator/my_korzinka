const express = require("express")
require("dotenv").config()
const cors = require("cors")
const userRouter = require("./router/users.routes")
const productsRouter = require("./router/products.routes")
const adminsRouter = require("./router/admins.routes")
const multer = require("multer")
const path = require("path")

const k_app = express()
k_app.use(cors())
k_app.use(express.json())
const PORT = process.env.PORT  || 3000

k_app.get("/", (req, res) => {
    res.status(200).json({
        message : " salom ustoz"
    })
})





//   LANDSHAFT
const storage = multer.diskStorage({
  destination: "./upload/landshaft",
  filename: (req, file, cb) => {
    const uniqueName = file.fieldname + "_" + Date.now()
    const ext = path.extname(file.originalname)
    cb(null, `${uniqueName}${ext}`)
  }
})

const upload = multer({ storage })

k_app.use("/landshaft", express.static("upload/landshaft"))

k_app.post("/landshaft", upload.single("file"), (req, res) => {
  return res.status(201).json({
    filePath: "http://localhost:4001/landshaft/" + req.file.filename
  })
})



// =_----- osimliklar--------



const storagePlants = multer.diskStorage({
  destination: "./upload/plants",
  filename: (req, file, cb) => {
    const uniqueName = file.fieldname + "_" + Date.now()
    const ext = path.extname(file.originalname)
    cb(null, `${uniqueName}${ext}`)
  }
})

const upload1 = multer({ storage:storagePlants })

k_app.use("/plants", express.static("upload/plants"))

k_app.post("/plants", upload1.single("file"), (req, res) => {
  return res.status(201).json({
    filePath: "http://localhost:4001/plants/" + req.file.filename
  })
})


// -----------hayvonlar------------





const storageAnimals = multer.diskStorage({
  destination: "./upload/animal",
  filename: (req, file, cb) => {
    const uniqueName = file.fieldname + "_" + Date.now()
    const ext = path.extname(file.originalname)
    cb(null, `${uniqueName}${ext}`)
  }
})

const upload2 = multer({ storage:storageAnimals })

k_app.use("/animal", express.static("upload/animal"))

k_app.post("/animal", upload2.single("file"), (req, res) => {
  return res.status(201).json({
    filePath: "http://localhost:4001/animal/" + req.file.filename
  })
})




// ---------- kun botishi -------------







const storagesunrise= multer.diskStorage({
  destination: "./upload/sunrise",
  filename: (req, file, cb) => {
    const uniqueName = file.fieldname + "_" + Date.now()
    const ext = path.extname(file.originalname)
    cb(null, `${uniqueName}${ext}`)
  }
})

const upload3 = multer({ storage:storagesunrise })

k_app.use("/sunrise", express.static("upload/sunrise"))

k_app.post("/sunrise", upload3.single("file"), (req, res) => {
  return res.status(201).json({
    filePath: "http://localhost:4001/sunrise/" + req.file.filename
  })
})








// Routers
k_app.use(userRouter)
k_app.use(productsRouter)
k_app.use(adminsRouter)




k_app.listen(PORT, ()=>{
    console.log("Server is running at:", PORT);
    
})