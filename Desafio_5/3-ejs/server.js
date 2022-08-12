const express =  require('express')
const routes = require("./routes/index")
const app = express() 

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
routes(app)

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, error =>{
    if(error) throw new Error(`Se ha producido un error en el servidor ${error}`)
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`)
})