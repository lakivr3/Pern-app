import express from "express";
import { createProduct, getProducts,deleteProduct,getProduct,updateProduct } from "../controllers/productController.js";

const router = express.Router()

router.get("/",getProducts)
router.get("/:id",getProduct)
router.post("/",createProduct)
router.put("/:id",updateProduct)
router.delete("/:id",deleteProduct)

export default router