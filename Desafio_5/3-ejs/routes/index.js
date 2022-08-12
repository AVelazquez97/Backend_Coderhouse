const express = require("express")
const productRoutes = require("./productRoutes")

module.exports = (app) => {
    app.use('/productos', productRoutes)
}