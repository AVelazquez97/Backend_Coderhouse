const express = require("express")
const productRoutes = require("./productRoutes")
const rootRoute = require("./rootRoute")

module.exports = (app) => {
    app.use('/api/ingresarProducto', express.static('public'))
    app.use('/api/productos', productRoutes)
    app.use('/', rootRoute)
}