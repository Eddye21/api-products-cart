import express from "express"
import productRouter from "./routes/product.routes.js"
import cartRouter from "./routes/cart.routes.js"

const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)


app.listen(port, () => {
    console.log("Server online in port : 8080 url : http://localhost:8080 ")
})