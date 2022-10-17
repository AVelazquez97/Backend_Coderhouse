import { Router } from 'express';
import loginController from '../../controllers/auth/login.controller.js';
import passport from '../../passport/passport-local.js';

const router = Router();

/* ---------------------------- inicio de sesión ---------------------------- */
<<<<<<< HEAD
router.get('/login',  loginController.getLogin);
=======
router.get('/login', loginController.getLogin);
>>>>>>> 17010ff2cf077b8d6fc60c63c333bb34b7bb398b

router.post(
  '/login',
  passport.authenticate('login', {
    failureRedirect: '/auth/faillogin',
    passReqToCallBack: true,
  }),
  loginController.postLogin
);

router.get('/faillogin', loginController.getFailLogin);

export default router;
