import Koa from 'koa';
import { koaBody } from 'koa-body';
import serve from 'koa-static';
import hbs from 'koa-views-handlebars';
import CookieParser from 'koa-cookie-parser';
import path from 'path';
import requestsLogger from './src/middlewares/reqLogger.middleware.js'
import { COOKIES_SECRET, SESSION_SECRET, MONGO_URL } from './src/config/index.js';

import session from  'koa-session';
// import session from 'koa-session-store';
// import MongoStore from 'koa-session-mongo';
// import { default as MongoStore } from 'connect-mongo';
// import passport from './src/middlewares/passport/passport-local.js';
// import errorHandler from './src/middlewares/errorHandler.middleware.js';

/* ---------------------------- routes importing ---------------------------- */
import homeRouter from './src/routes/home.routes.js';
import apiRouter from './src/routes/api/index.routes.js'
import infoRouter from './src/routes/info.routes.js';
// import authRouter from './src/routes/auth/index.routes.js';
// import notFoundRouter from './src/routes/404.notFound.routes.js';

const app = new Koa();

/* -------------------------- template engine settings -------------------------- */ 
app.use(hbs(path.join(process.cwd(), '/src/views/'), {
  layoutsDir: path.join(process.cwd(), '/src/views/layouts'),
  partialDirs: path.join(process.cwd(), '/src/views/partials'),
  debug: false,
}))
  
/* -------------------------- middlewares settings -------------------------- */
app.use(CookieParser(COOKIES_SECRET));
app.use(serve(path.join(process.cwd(), '/public')));
app.use(koaBody());
app.use(requestsLogger);

/* ---------------------------- session settings ---------------------------- */
// app.use(
//   session({
//     secret: SESSION_SECRET,
//     resave: true,
//     saveUninitialized: true,
//     rolling: true,
//     store: MongoStore.create({
//       db: 'desafio20',
//       mongoUrl: MONGO_URL,
//       collection: 'sessions',
//       mongoOptions: {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       },
//     }),
//     cookie: {
//       maxAge: 600000,
//     },
//   }, app)
// );
app.keys = [SESSION_SECRET]
app.use(session({}, app))

/* ---------------------------- passport settings --------------------------- */
// app.use(passport.initialize());
// app.use(passport.session());

/* -------------------------- routes settings -------------------------- */
app.use(homeRouter.routes());
app.use(infoRouter.routes());
// app.use(apiRouter.routes());
// app.use('/auth', authRouter.routes());
// app.use(notFoundRouter.routes());

/* ------------------------------ error handler ----------------------------- */
// app.use(errorHandler);

export default app;