const Contenedor = require("./claseContenedor");

const productos = new Contenedor('./productos.txt');

productos.getAll()
.then(items => console.table(items))
.catch(error => console.log(error))

setTimeout(()=>{
    productos.save({ title: 'Gorras Rosa', price: 100, thumbnail: "url_1" })
    .then(id => console.log(`El id ingresado fue: ${id}`))
    .catch(error => console.log(error))
}, 100)

setTimeout(()=>{
    productos.save({ title: 'Remera Billabong', price: 400, thumbnail: "url_2"})
    .then(id => console.log(`El id ingresado fue: ${id}`))
    .catch(error => console.log(error))
}, 200)

setTimeout(()=>{
    productos.save({ title: 'Zapatillas Negras', price: 300, thumbnail: "url_3" })
    .then(id => console.log(`El id ingresado fue: ${id}`))
    .catch(error => console.log(error))
}, 300)

setTimeout(()=>{
    productos.getAll()
    .then(items => console.table(items))
    .catch(error => console.log(error))
}, 400)

setTimeout(()=>{
    productos.getById(3)
    .then(item => console.table(item))
    .catch(error => console.log(error))
}, 500)
