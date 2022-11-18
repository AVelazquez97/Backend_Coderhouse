import express from 'express';
import { Server as httpServer } from 'http';
import { Server as ioServer } from 'socket.io';
import Sockets from './sockets.js';

const app = express();
const serverHTTP = new httpServer(app);
const io = new ioServer(serverHTTP);

/* ----------------------------- socket settings ---------------------------- */
Sockets(io);

/* -------------------------- middlewares settings -------------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

/* ----------------------------- server settings ---------------------------- */
const PORT = process.env.port || 8080;
const server = serverHTTP.listen(PORT, (error) => {
  if (error) throw new Error(`Error en servidor ${error}`);
  console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});
