const express = require("express")
const { Router } = express

const productRouter = Router()

const Contenedor = require('../claseContenedor.js')
const productos = new Contenedor('./productos.json')


/* -------------------------------- Productos ------------------------------- */

//Esta ruta devuelve todos los productos
productRouter.get('/', async (req, res) => {
    try {
        const products = await productos.getAll()
        res.json({products})
    } catch (error) {
        res.json({error})
    }
})

// Esta ruta devuelve un producto según su id
productRouter.get('/:id', async (req, res) => {
    let {id} = req.params
    id = parseInt(id)
    //Se evalúa si la conversión a int del número recibido por parámetro es posible o no
    if(!isNaN(id)){
        try {
            const product = await productos.getById(id)
            res.json(product)
        } catch (error) {
            res.json({error})
        }
    } else{
        res.json( {error:"El parámetro no es un número"} )
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
            res.json({title, price, thumbnail, id})
        } catch (error) {
            res.json({error})
        }
    }else{
        res.json( {error:"Algunos campos quedaron vacíos. Intenta nuevamente."} )
    }
})

// Ruta que recibe y actualiza un producto según su id.***
productRouter.put('/:id', async (req, res) => {
    const {id} = req.params
    const {product} = req.body
    res.json({})
})

// Ruta que elimina un producto según su id
productRouter.delete('/:id', async (req, res) => {
    let {id} = req.params
    id = parseInt(id)
    if(!isNaN(id)){
        try {
            const respuesta = await productos.deleteById(id)
            res.json(respuesta)
        } catch (error) {
            res.json({error})
        }
    } else{
        res.json( {error:"El parámetro no es un número"} )
    }  
})

module.exports = productRouter

// const {pos} = req.params

// //se elimina la palabra que se encuentre en la pos indicada, y se almacena como string para su posterior uso
// const eliminada = words.splice(pos-1, 1).join('') 
// frase = words.map(palabra => palabra).join(' ') //luego se convierte el array a un string nuevamente
// res.json({status: "ok", eliminada})