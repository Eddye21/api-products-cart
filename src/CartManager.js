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
        
        const id = random.int(1, 150)
        
        
        try {nanoid
            const newCart = {id, product}
            product = newCart.product
            
            this.cart.push(newCart)

            await fs.writeFile(this.pathFile, JSON.stringify(this.cart, null, 2), "utf-8");
        }catch (error) {
            console.log(error)
            throw new Error("Error to create new cart")
        }
            
        return this.cart      
    }

    async getCartById (id) {

        const fileData = await fs.readFile(this.pathFile, "utf-8")
        const data = JSON.parse(fileData)

        const cart = data.find((cartProduct) => cartProduct.id === id)

        if(!cart) return {error: "Id is no available"}

        return cart
    }

    async addProductInCartById(cartId, productId) {
        try {
            const dataProduct = await fs.readFile("./data/products.json", "utf-8");
            const dataParse = JSON.parse(dataProduct);

            const dataCart = await fs.readFile(this.pathFile, "utf-8");
            const cartParse = JSON.parse(dataCart);

            const product = dataParse.find((product) => product.id === productId);
            if (!product) return { error: "Product not found" };

            const cartIndex = cartParse.findIndex(cart => cart.id === cartId);
            if (cartIndex === -1) return { error: "Cart not found" };

            const id = product.id;
            const quantity = product.stock;

            
            if (!cartParse[cartIndex].product) {
                cartParse[cartIndex].product = []
            }

            const existingProductIndex = cartParse[cartIndex].product.findIndex(product => product.id === productId);
        
            if (existingProductIndex !== -1) {
                cartParse[cartIndex].product[existingProductIndex].quantity += quantity;
            } else {
                const addProduct = { id, quantity };
                cartParse[cartIndex].product.push(addProduct);
        

            cartParse[cartIndex].product.push(addProduct);

            await fs.writeFile(this.pathFile, JSON.stringify(cartParse, null, 2), "utf-8")

            return cartParse[cartIndex];
            }
        } catch (error) {
            throw new Error(`Error : ${error}}`)
        }   
    }
}


export default CartManager