import express from "express"
import productRouter from "./routes/product.routes.js"
import viewsRouter from "./routes/views.routes.js"
import cartRouter from "./routes/cart.routes.js"
import ProductManager from "./ProductManager.js"
import {engine} from "express-handlebars"
import { Server } from "socket.io"
import http from "http"

//Server
const app = express()
const server = http.createServer(app)
const io = new Server(server)
const port = 8080
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
const pathProducts = "./data/products.json"
const productManager = new ProductManager(pathProducts)

//Handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./views")

//Endpoits
app.use("/", viewsRouter)
app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)

//websocket
io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado")

    socket.on("new product", async(productData) => {
        try {
            const newProduct = await productManager.addProduct(productData)
            io.emit("productAdded", newProduct)
        } catch (error) {
            console.log("Error agregando el nuevo producto")
        }
    })
    
    socket.on("delete product", async (productId) => {
        try {
            const productDeleted = await productManager.deleteProductById(parseInt(productId))
            if (productDeleted) {
                io.emit("productDeleted", productId)
            } else {
                socket.emit("productDeleted", null)
            }
        } catch (error) {
            socket.emit("productDeleted", null)
        }
    })
})

server.listen(port, () => {
    console.log("Server online in port : 8080 url : http://localhost:8080 ")
})