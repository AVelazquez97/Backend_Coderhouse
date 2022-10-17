import { Router } from 'express';
import logoutController from '../../controllers/auth/logout.controller.js';
import authenticationMiddleware from '../../middlewares/auth/auth.middleware.js';

const router = Router();

/* ---------------------------- cierre de sesión ---------------------------- */
<<<<<<< HEAD
router.post('/logout', authenticationMiddleware, logoutController.postLogout);
=======
router.get('/logout', authenticationMiddleware, logoutController.getLogout);
>>>>>>> 17010ff2cf077b8d6fc60c63c333bb34b7bb398b

export default router;