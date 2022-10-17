import { Server as httpServer } from 'http';
import { Server as ioServer } from 'socket.io';
<<<<<<< HEAD
import parseArgs from 'minimist';

=======
>>>>>>> 17010ff2cf077b8d6fc60c63c333bb34b7bb398b
import app from './app.js';
import Sockets from './sockets.js';

const serverHTTP = new httpServer(app);
const io = new ioServer(serverHTTP);

/* ----------------------------- socket settings ---------------------------- */
Sockets(io);

/* ----------------------------- server settings ---------------------------- */
<<<<<<< HEAD

const options = { default: {port: 8080 } };
const args = parseArgs(process.argv.slice(2), options);

const PORT = args.port;
=======
const PORT = process.env.port || 8080;
>>>>>>> 17010ff2cf077b8d6fc60c63c333bb34b7bb398b
const server = serverHTTP.listen(PORT, (error) => {
  if (error) throw new Error(`Error en el servidor: ${error}`);
  console.info(
    `Servidor HTTP escuchando en el puerto ${server.address().port}`
  );
});
