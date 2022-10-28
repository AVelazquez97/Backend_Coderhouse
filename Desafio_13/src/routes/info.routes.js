import { Router } from 'express';
import { cpus } from 'os';
const router = Router();

router.get('/', (req, res) => {
  const args = process.argv.slice(2).join('; ');
  const info = {
    args, //Argumentos de entrada
    path: process.execPath, //Path de ejecución
    os: process.platform, //Nombre de la plataforma (sistema operativo)
    pid: process.pid, //Process id
    nodeVersion: process.version, //Versión de node.js
    dirPath: process.cwd(), //Carpeta del proyecto
    memoryUsage: process.memoryUsage.rss() / 2 ** 20, //Memoria total reservada (rss) en MiB
    numCPUs: cpus().length,
  };

  res.render('partials/viewInfo', {
    info,
  });
});

export default router;