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
        res.render("vista", {
            products,
            hayProductos: products.length
        });
    } catch (error) {
        res.render("vista", {
            error
        });
    }
})

// Ruta que recibe un producto apartir de un form en la raiz, lo agrega al archivo y lo devuelve con su id asignado
productRouter.post('/', async (req, res) => {
    let {title, price, thumbnail} = req.body
    if(title && price && thumbnail){
        //si los tres campos del form están completos, se procede a ingresar el producto
        price = parseFloat(price)
        try {
            const id = await productos.save({ title, price, thumbnail})
            res.redirect('/')
        } catch (error) {
            res.json({error})
        }
    }else{
        res.json( {error:"Algunos campos quedaron vacíos. Intenta nuevamente."} )
    }
})

module.exports = productRouter