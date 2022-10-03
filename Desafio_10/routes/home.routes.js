import { Router } from 'express';
import authenticationMiddleware from '../middlewares/auth.middleware.js';
import path from 'path';

const router = Router();

router.get('/', authenticationMiddleware, (req, res) => {
  res.render(path.join(process.cwd(), '/views/layouts/home.hbs'), {
    name: req.session.name,
  });
});

export default router;