import ProductManager from "./ProductManager.js"
import express from "express"

const productRouter = express.Router()
const productManager = new ProductManager()