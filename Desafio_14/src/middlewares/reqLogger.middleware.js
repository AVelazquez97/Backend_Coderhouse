import { loggerInfo, loggerWarn } from '../../config/log4.js';

const requestsLogger = (req, res, next) => {
  res.on('finish', () => {
    const message = `Ruta: "${req.url}" | Método: "${req.method}" | Respuesta HTTP: "${res.statusCode}: ${res.statusMessage}"`;
    if (res.statusCode !== 404) {
      loggerInfo.info(message);
    } else {
      loggerWarn.warn(message);
    }
  });

  next();
};

export default requestsLogger;
