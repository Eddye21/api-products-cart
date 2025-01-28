import fs from "fs/promises";
import random from "random";

class ProductManager {
    constructor(pathFile) {
        this.products = [];
        this.pathFile = pathFile;
    }

    async addProduct (product) {
        
        try {
            if(this.products.some(existingProduct => existingProduct.code === product.code)) return "Code alredy exist"
            
            product.id = random.int(1, 100)

            if(product.stock > 0) {
                product.status = true 
            } else {
                product.status = false
            }
                
            this.products.push(product)

            await fs.writeFile(this.pathFile, JSON.stringify(this.products, null, 2), "utf-8");

            
        }catch (error) {
            throw new Error(error)
        }
            
        return ("Product added", this.products)        
    }
            
    async getProducts() {
        try {
            const fileData = await fs.readFile(this.pathFile, "utf-8");
            const data = JSON.parse(fileData)
            return data
        } catch (error) {
            throw new Error("Error to read file")
        }
    }

    async getProductById(id) {

        try {
            const data = await fs.readFile(this.pathFile, "utf-8")
            const dataParse = JSON.parse(data)
    
            const product = dataParse.find((product) => product.id === id)
            if (!product) {return { error: "Id not available" }}
            return product
            
        } catch (error) { 
            throw new Error("Error to find product")            
        }
    }

    async setProductById (id, products) {

        try {
            const data = await fs.readFile(this.pathFile, "utf-8");
            const dataParse = JSON.parse(data);
            
            const index = dataParse.findIndex((product) => product.id === id)
            if(index === -1 ) return "Error id not valid"
            
            dataParse[index] = { ...dataParse[index], ...products}
            
            await fs.writeFile(this.pathFile, JSON.stringify(dataParse, null, 2), "utf-8")
            
            return dataParse
        } catch (error) {
            throw new Error("Error to edit product")
        }
    }

    async deleteProductById(id) {

        try {
            const data = await fs.readFile(this.pathFile, "utf-8")
            const dataParse = JSON.parse(data)
    
            const filterProduct = dataParse.filter((product) => product.id !== id)
            if (filterProduct.length === dataParse.length) return ("ID not available" )
            
            await fs.writeFile(this.pathFile, JSON.stringify(filterProduct, null, 2), "utf-8")
    
            return filterProduct
        } catch (error) {
            throw new Error("Error to delete product")
        }
    }
}


export default ProductManager;
