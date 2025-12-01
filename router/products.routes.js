const express = require("express")
const { get_product, one_product, put_product, product_post, delete_pd } = require("../controller/products.controller")
const userscheking = require("../middleware/userscheck")



const productsRouter = express.Router()

productsRouter.get("./get_all_pt", get_product)
productsRouter.get("./get_one_pt/:id", one_product)
productsRouter.put("./put_pt/:id",userscheking, put_product)
productsRouter.post("./add_pt",userscheking , product_post)
productsRouter.delete("./get_all_pt/:id",userscheking, delete_pd)


module.exports = productsRouter