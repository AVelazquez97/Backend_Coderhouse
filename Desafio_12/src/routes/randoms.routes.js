import { Router } from 'express';
import { fork } from 'child_process';
const router = Router();

router.get('/randoms', (req, res) => {
  const { cant } = req.query;
  const forkedProcess = fork('./src/utils/randomNumbers.js');
  forkedProcess.send(parseInt(cant));
  forkedProcess.on('message', (randomNumbers) => {
    res.json(randomNumbers);
  });
});

export default router;