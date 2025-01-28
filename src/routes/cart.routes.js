import express from "express"
import CartManager from "../CartManager.js"

const cartRouter = express.Router()
const cartManager = new CartManager("./data/cart.json")

cartRouter.get("/", async(req, res) => {
    try {
        const cart = await cartManager.addCart([])
        
        if(cart.length === 0) return res.status(404).send({message: "Error cart is not available"})
        
        res.status(200).send(cart)
    } catch (error) {
        res.status(500).send("Error to get cart")
    }
})

cartRouter.get("/:pid", async (req, res) => {

    try {
        const pid = parseInt(req.params.pid)
        const cartId = await cartManager.getCartById(pid)
    
        if (cartId.error) { 
            return res.status(404).send({ message: cartId.error })
        }
        
        res.status(200).send(cartId)
        
    } catch (error) {
        res.status(500).send("Error to get item")
    }
})

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params

    try {
        const result = await cartManager.addProductInCartById(cid, pid); 
        if (result.error) {
            console.error(result.error);
            return res.status(404).send({ message: result.error });
        }
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send({ message: `${error.message}` });
    }
});




export default cartRouter