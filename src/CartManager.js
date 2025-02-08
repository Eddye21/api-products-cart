import fs from "fs/promises"
import random from "random"
import ProductManager from "./ProductManager.js"

const productManager = new ProductManager()

class CartManager {
    constructor(pathFile) {
        this.pathFile = pathFile
        this.cart = []
        this.product = []
    }

    
    async addCart (product) {        
        try {
            const id = random.int(1, 150)
            const newCart = {id, product}
            product = newCart.product
            
            this.cart.push(newCart)

            await fs.writeFile(this.pathFile, JSON.stringify(this.cart, null, 2), "utf-8")
            return this.cart      
        }catch (error) {
            console.log(error)
            throw new Error("Error to create new cart")
        }
    }
    
    async getCartById (id) {
        try {
            const fileData = await fs.readFile(this.pathFile, "utf-8")
            const data = JSON.parse(fileData)
    
            const cart = data.find((cartProduct) => cartProduct.id === id)
    
            if(!cart) return "Id is no available"
    
            return cart
        } catch (error) {
            throw new Error("Error to show carts")
        }
    }
    
    async addProductInCartById(cartId, productId) {
        try {
            const dataProduct = await fs.readFile("./data/products.json", "utf-8")
            const dataParse = JSON.parse(dataProduct)
            
            const dataCart = await fs.readFile(this.pathFile, "utf-8")
            const cartParse = JSON.parse(dataCart)
            
            const product = dataParse.find((product) => product.id === parseInt(productId));
            if (!product) return "Product not found"
            
            const cartIndex = cartParse.findIndex(cart => cart.id === parseInt(cartId));
            if (cartIndex === -1) return "Cart not found"

            let quantityValue = parseInt(product.stock)
            
            const id = product.id
            let quantity = quantityValue
            
            if (!cartParse[cartIndex].product) {
                cartParse[cartIndex].product = []
            }

            if(product) {
                quantity = quantityValue += 1
            }
            
            const addProduct = {id , quantity}
            
            cartParse[cartIndex].product.push(addProduct)
            
            const index = dataParse.findIndex((product) => product.id === id)
            dataParse[index].stock = quantity

            if (index === -1) {
                return "Error: ID not valid"
            }

            await fs.writeFile("./data/products.json", JSON.stringify(dataParse, null, 2), "utf-8")
            
            await fs.writeFile(this.pathFile, JSON.stringify(cartParse, null, 2), "utf-8")
            
            return addProduct
            
        } catch (error) {
            throw new Error(`Error : ${error}`)
        }   
    }
}


export default CartManager