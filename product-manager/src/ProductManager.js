import fs from "fs/promises"


class ProductManager {

    constructor(pathFile){
        this.pathFile = pathFile
        this.product = []
    }

    getProducts = async() => {
        try {
            const dataFile = await fs.readFile(this.pathFile, "utf8")
            const Arraydata = JSON.parse(dataFile)
            console.log(Arraydata)
        } catch (error) {
            throw new Error("Error to read json file")
        }
    }

    addProducts = async(product) => {
        try {
            if(product.stock <= 0) {
                product.status = false
            }else{
                product.status = true
            }
            
            // if(this.product.some((productCode) => productCode.code === productCode.code)) return "Code is already exist"
            this.product.push(product)

            await fs.appendFile(this.pathFile, JSON.stringify(this.product, null, 2), "utf-8")
            return "Product added succes" + this.product

        } catch (error) {
            throw new Error("Error to add new product")
        }
    } 
}


const main = async() => {
    const newProduct = new ProductManager("./data/products.json")
    await newProduct.addProducts({
        title: "Laptop",
        description: "tecnologia",
        price: 200,
        code: "acle13",
        stock: 20,
        status: false
    })
    await newProduct.addProducts({
        title: "celular",
        description: "tecnologia",
        price: 200,
        code: "acle15",
        stock: 10,
        status: false
    })
    await newProduct.getProducts()
}

main()

export default ProductManager