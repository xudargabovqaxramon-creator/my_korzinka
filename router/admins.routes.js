const express = require("express")
const {updated_admin,get_all} = require("../controller/admins.controller")
const admincheking = require("../middleware/admincheck")


const adminsRouter = express.Router()

adminsRouter.post("/updated_admin/:id",admincheking,  updated_admin)
adminsRouter.get("/get_all",admincheking, get_all)


module.exports = adminsRouter