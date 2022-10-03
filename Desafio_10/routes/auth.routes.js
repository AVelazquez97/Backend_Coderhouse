import { Router } from 'express';
import path from 'path';

const router = Router();

router.get('/login', (req, res) => {
  //Si se golpea a la ruta /auth/login estando previamente logueado, esta redireccionará al inicio
  const name = req.session?.name;
  if (name) {
    res.redirect('/');
  } else {
    res.sendFile(path.join(process.cwd(), '/views/login.html'));
  }
});

router.post('/login', (req, res) => {
  req.session.name = req.body.name;
  res.redirect('/');
});

router.get('/logout', (req, res) => {
  const name = req.session.name;
  if (name) {
    req.session.destroy((err) => {
      if (!err) {
        res.render(path.join(process.cwd(), '/views/layouts/logout.hbs'), {
          name,
        });
      } else {
        res.redirect('/');
      }
    });
  } else {
    res.redirect('/');
  }
});

export default router;
