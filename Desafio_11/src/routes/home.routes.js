import { Router } from 'express';
import authenticationMiddleware from '../middlewares/auth/auth.middleware.js';
import path from 'path';

const router = Router();

router.get('/', authenticationMiddleware, (req, res) => {
  res.render(path.join(process.cwd(), '/src/views/layouts/home.hbs'), {
    email: req.session.email,
  });
});

export default router;