// const Contenedor = require("./claseContenedor");
import Contenedor from "./claseContenedor.js";

const productos = new Contenedor('./productos.json');

const ejecutar = async (cb) => {
    try {
        const resultado = await cb
        console.log(resultado)
    } catch (error) {
        console.log(error)
    } 
}

ejecutar(productos.getAll())
ejecutar(productos.save({ title: 'Gorras Rosa', price: 100, thumbnail: "url_1" }))

setTimeout(() => {
    productos.getById(2)
        .then(item => console.table(item))
        .catch(error => console.log(error))
}, 400)

setTimeout(() => {
    productos.getById(200)
        .then(item => console.table(item))
        .catch(error => console.log(error))
}, 400)

setTimeout(() => {
    productos.getAll()
        .then(items => console.table(items))
        .catch(error => console.log(error))
}, 500)

// setTimeout(() => {
//     productos.deleteById(2)
//         .catch(error => console.log(error))
// }, 600)

setTimeout(() => {
    productos.getAll()
        .then(items => console.table(items))
        .catch(error => console.log(error))
}, 700)

// setTimeout(() => {
//     productos.deleteAll()
//         .catch(error => console.log(error))
// }, 800)

setTimeout(() => {
    productos.getAll()
        .then(items => console.table(items))
        .catch(error => console.log(error))
}, 900)