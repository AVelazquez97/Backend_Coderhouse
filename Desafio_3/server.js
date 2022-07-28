import express from 'express'
import Contenedor from './claseContenedor.js'
const app = express() 

const productos = new Contenedor('./productos.json');
app.get('/', async (req, res) => {
    res.send(`<h1 style="color:red;">Desafío 3 - Clase 6</h1>`)
}) 

app.get('/productos', async (req, res) => {
    try {
        const products = await productos.getAll()
        res.json({products})
    } catch (error) {
        res.send(`<h1 style="color:red;">${error}</h1>`)
    } 
}) 

app.get('/productoRandom', async (req, res) => {
    try {
        const randomId = Math.ceil(Math.random() * 3)
        const product = await productos.getById(randomId)
        res.json({product})
    } catch (error) {
        res.send(`<h1 style="color:red;">${error}</h1>`)
    }
})

const PORT = 8080

const server = app.listen(PORT, () =>{
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`)
})

server.on('error', error => console.log(`Error en servidor ${error}`))