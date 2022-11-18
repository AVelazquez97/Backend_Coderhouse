const express = require("express")
const { Router } = express

const productRouter = Router()

const Contenedor = require('../claseContenedor.js')
const productos = new Contenedor('./productos.json')

/* -------------------------------- Productos ------------------------------- */

//Ruta que muestra todos los productos
productRouter.get('/', async (req, res) => {
    try {
        const products = await productos.getAll()
        res.render("pages/vista", {
            products,
            hayProductos: products.length
        })
    } catch (error) {
        res.render("pages/vista", {
            error
        })
    }
})

// Ruta que recibe un producto apartir de un form en la raiz, lo agrega al archivo y lo devuelve con su id asignado
productRouter.post('/', async (req, res) => {
    let {title, price, thumbnail} = req.body
    price = parseFloat(price)

    try {
        const id = await productos.save({ title, price, thumbnail})
        res.redirect('/')
    } catch (error) {
        res.json({error})
    }
})

module.exports = productRouter