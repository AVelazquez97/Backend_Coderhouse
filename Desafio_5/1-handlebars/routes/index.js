const express = require("express")
const productRoutes = require("./productRoutes")
const rootRoute = require("./rootRoute")

module.exports = (app) => {
    app.use('/productos', productRoutes)
    app.use('/', rootRoute)
}