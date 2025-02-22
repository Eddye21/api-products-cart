const socket = io()

const formNewProduct = document.getElementById("formNewProduct")

formNewProduct.addEventListener("submit", (event) => {
    event.preventDefault()

    const formData = new FormData(formNewProduct)
    const productData = {}

    formData.forEach((value, key) => {
        productData[key] = value
    })

    socket.emit("new product", productData)
})

socket.on("productAdded", (newProduct) => {
    const listProducts = document.getElementById("listProducts")
    listProducts.innerHTML += `<li> ${newProduct.title} - ${newProduct.price} </li>`
})

const formDelete = document.getElementById("formDelete")
formDelete.addEventListener("submit", (event) => {
    event.preventDefault()

    const productId = document.getElementById("productId").value
    socket.emit("delete product", productId)

    document.getElementById("productId").value = ""
})

socket.on("productDeleted", (productId) => {
    const listProducts = document.getElementById("listProducts")
    const items = listProducts.getElementsByTagName("li")

    for (let i = 0; i < items.length; i++) {
        if (items[i].textContent.includes(productId)) {
            listProducts.removeChild(items[i])
            break
        }
    }
    console.log(`Producto con ID ${productId} eliminado`)
})







