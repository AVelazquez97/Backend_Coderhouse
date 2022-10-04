import { Router } from 'express';
import path from 'path';

const router = Router();

/* ---------------------------- inicio de sesión ---------------------------- */
router.get('/login', (req, res) => {
  //Si se golpea a la ruta /auth/login estando previamente logueado, esta redireccionará al inicio
  const email = req.session.email;
  if (email) {
    res.redirect('/');
  } else {
    res.sendFile(path.join(process.cwd(), '/src/views/login.html'));
  }
});

router.post('/login', (req, res) => {
  req.session.email = req.body.email;
  res.redirect('/');
});

/* --------------------------- registro de usuario -------------------------- */
router.get('/signup', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/src/views/signup.html'));
});

router.post('/signup', (req, res) => {
  req.session.email = req.body.email;
  res.redirect('/');
});

/* ---------------------------- cierre de sesión ---------------------------- */
router.get('/logout', (req, res) => {
  const email = req.session.email;
  if (email) {
    req.session.destroy((err) => {
      if (!err) {
        res.render(path.join(process.cwd(), '/src/views/layouts/logout.hbs'), {
          email,
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
