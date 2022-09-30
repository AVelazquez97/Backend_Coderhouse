import express from 'express';
import { Server as httpServer } from 'http';
import { Server as ioServer } from 'socket.io';
import Sockets from './sockets.js';
import fakerRouter from './routes/productsTest.routes.js';
import handlebars from 'express-handlebars';

const app = express();
const serverHTTP = new httpServer(app);
const io = new ioServer(serverHTTP);

/* ----------------------------- socket settings ---------------------------- */
Sockets(io);

/* -------------------------- middlewares settings -------------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

/* -------------------------- template engine settings -------------------------- */
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: './views/layouts',
    partialsDir: './views/partials/',
  })
);
app.set('view engine', 'hbs');
app.set('views', './views');

/* -------------------------- routes settings -------------------------- */
app.use('/api/productos-test', fakerRouter);

/* ----------------------------- server settings ---------------------------- */
const PORT = process.env.port || 8080;
const server = serverHTTP.listen(PORT, (error) => {
  if (error) throw new Error(`Error en el servidor: ${error}`);
  console.info(
    `Servidor HTTP escuchando en el puerto ${server.address().port}`
  );
});