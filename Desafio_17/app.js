import express, { json } from 'express';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { default as MongoStore } from 'connect-mongo';
import { COOKIES_SECRET, SESSION_SECRET, MONGO_URL } from './src/config/index.js';
import passport from './src/middlewares/passport/passport-local.js';
import requestsLogger from './src/middlewares/reqLogger.middleware.js'

/* ---------------------------- routes importing ---------------------------- */
import fakerRouter from './src/routes/productsTest.routes.js';
import randomsRouter from './src/routes/randoms.routes.js';
import infoRouter from './src/routes/info.routes.js';
import homeRouter from './src/routes/home.routes.js';
import authRouter from './src/routes/auth/index.routes.js';
import notFoundRouter from './src/routes/404.notFound.routes.js';

const app = express();

/* -------------------------- middlewares settings -------------------------- */
app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(COOKIES_SECRET));
app.use(express.static('public'));
app.use(requestsLogger);

/* -------------------------- template engine settings -------------------------- */
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: './src/views/layouts',
    partialsDir: './src/views/partials/',
  })
);
app.set('view engine', 'hbs');
app.set('views', './src/views');

/* ---------------------------- session settings ---------------------------- */
app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    rolling: true,
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
      collection: 'sessions',
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    cookie: {
      maxAge: 600000,
    },
  })
);

/* ---------------------------- passport settings --------------------------- */
app.use(passport.initialize());
app.use(passport.session());

/* -------------------------- routes settings -------------------------- */
app.use(homeRouter);
app.use('/api', fakerRouter);
app.use('/api', randomsRouter);
app.use('/info', infoRouter);
app.use('/auth', authRouter);
app.use(notFoundRouter);

export default app;
