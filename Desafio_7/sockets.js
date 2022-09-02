import productContainer from './apis/productContainer.js';
import msgContainer from './apis/msgContainer.js';

import option from './databases/configMariaDB.js';
import config from './databases/configSQLiteDB.js';

const productsApi = new productContainer(option, 'products');
const messagesApi = new msgContainer(config, 'messages');

const Sockets = (io) => {
  io.on('connection', async (socket) => {
    console.log(`\nUn cliente con el id: [${socket.id}] se ha conectado.`);

    // carga inicial de productos
    socket.emit('view-products', await productsApi.getAll());

    // actualizacion de productos
    socket.on('update-product', async (product) => {
      const productId = await productsApi.save(product);
      io.sockets.emit('view-products', await productsApi.getAll());
    });

    // carga inicial de mensajes
    socket.emit('view-messages', await messagesApi.getAllMessages());

    // actualizacion de mensajes
    socket.on('new-message', async (msg) => {
      msg.fyh = new Date().toLocaleString();
      await messagesApi.save(msg);
      io.sockets.emit('view-messages', await messagesApi.getAllMessages());
    });

    socket.on('disconnect', (_) => {
      console.log(`El cliente con el id: [${socket.id}] se ha desconectado.\n`);
    });
  });
};

export default Sockets;
