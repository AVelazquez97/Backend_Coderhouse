import { Server as httpServer } from 'http';
import { Server as ioServer } from 'socket.io';
import parseArgs from 'minimist';

import app from './app.js';
import Sockets from './sockets.js';

const serverHTTP = new httpServer(app);
const io = new ioServer(serverHTTP);

/* ----------------------------- socket settings ---------------------------- */
Sockets(io);

/* ----------------------------- server settings ---------------------------- */

const options = { default: {port: 8080 } };
const args = parseArgs(process.argv.slice(2), options);

const PORT = args.port;
const server = serverHTTP.listen(PORT, (error) => {
  if (error) throw new Error(`Error en el servidor: ${error}`);
  console.info(
    `Servidor HTTP escuchando en el puerto ${server.address().port}`
  );
});
