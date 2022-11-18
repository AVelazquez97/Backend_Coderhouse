const express = require("express")
const { Router } = express

const rootRouter = Router()

/* ------------------------------- bienvenida ------------------------------- */
rootRouter.get('/', (req, res) => {
    const message = 'Bienvenido al desafío 4 del curso de backend de CoderHouse'
    res.send(`<h1 style="color:red;">${message}</h1>`)
})


module.exports = rootRouter