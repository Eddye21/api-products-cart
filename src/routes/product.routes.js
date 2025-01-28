import express from "express"
import ProductManager from "./../ProductManager.js";

const productRouter = express.Router()
const productManager = new ProductManager("./data/products.json")

productRouter.get("/", async(req, res) => {
    try {
        const products = await productManager.getProducts();
    
        if(products.length === 0)return res.status(404).send({message: "Error, products not available"})
    
        res.status(200).send(products)
    } catch (error) {
        res.status(400).send(error)
    }

})

productRouter.get("/:pid", async (req, res) => {
    try {
        const pid = parseInt(req.params.pid)
        const productId = await productManager.getProductById(pid);
    
        if (productId.error) { 
            return res.status(404).send({ message: "Error to consult product"});
        }
        
        res.status(200).send(productId);
        
    } catch (error) {
        res.status(400).send("Error to get item")
    }
})

productRouter.post("/", async(req, res) => {
    
    try {
        const productsAgred = req.body
    
        const add = await productManager.addProduct(productsAgred)
    
        res.status(201).json(add)
        
    } catch (error) {
        throw new Error(`Error to consult product : ${error} `)
    }
    
})

productRouter.put("/:pid", async(req, res) => {
    try {
        const pid = parseInt(req.params.pid)
        const updateProduct = req.body
        
        const update = await productManager.setProductById(pid, updateProduct)
        
        if(!update){
            return res.status(400).send({message: "Error id not available"})}
        
    } catch (error) {
        res.status(400).send("Error to edit item")
    }
    res.status(201).send(update)
})

productRouter.delete("/:pid", async(req, res) => {

    try {
        const pid = req.params.pid
        await productManager.deleteProductById(pid)
        
        res.status(201).send({message: "Succes, delete item"})
        
    } catch (error) {
        res.status(400).send("Error to delete item")
    }
})

export default productRouter