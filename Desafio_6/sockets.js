const productContainer = require('./apis/productHandler.js')
const msgContainer = require('./apis/msgHandler.js')

const productsApi = new productContainer('./data/products.json')
const messagesApi = new msgContainer('./data/messages.json')

const Sockets = (io) => {
    io.on('connection', async socket => {
        console.log(`\nUn cliente con el id: [${socket.id}] se ha conectado.`)

        // carga inicial de productos
        socket.emit('view-products', await productsApi.getAll())

        // actualizacion de productos
        socket.on('update-product', async product => {
            const productId = await productsApi.save(product)
            io.sockets.emit('view-products', await productsApi.getAll())
        })

        // carga inicial de mensajes
        socket.emit('view-messages', await messagesApi.getAllMessages());

        // actualizacion de mensajes
        socket.on('new-message', async msg => {
            msg.fyh = new Date().toLocaleString()
            await messagesApi.save(msg)
            io.sockets.emit('view-messages', await messagesApi.getAllMessages());
        })

        socket.on("disconnect", _ => {
            console.log(`El cliente con el id: [${socket.id}] se ha desconectado.\n`)
        })
    });
}

module.exports = Sockets;