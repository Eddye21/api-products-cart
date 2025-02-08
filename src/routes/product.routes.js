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
        res.status(500).send({message: "Error to get products"})
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
        res.status(500).send({message: "Error to get item"})
    }
})

productRouter.post("/", async(req, res) => {
    try {
        const productsAgred = req.body
    
        const add = await productManager.addProduct(productsAgred)
    
        res.status(201).json(add)
        
    } catch (error) {
        res.status(500).send({message: `Error to post new products ${error}`})
    }
    
})

productRouter.put("/:pid", async(req, res) => {
    try {
        const pid = parseInt(req.params.pid)
        const updateProduct = req.body
        
        const update = await productManager.setProductById(pid, updateProduct)
        
        if(!update){
            return res.status(400).send({message: "Error id not available"})}
        res.status(201).send(update)
        
    } catch (error) {
        res.status(500).send({message: "Error to edit item"})
    }
})

productRouter.delete("/:pid", async(req, res) => {
    const pid = parseInt(req.params.pid)
    const productDelete = await productManager.deleteProductById(pid)

    res.status(201).send({message: "Succes to delete item"})

    
    try {
    } catch (error) {
        res.status(500).send({message: "Error to delete item"})
    }
})

export default productRouter