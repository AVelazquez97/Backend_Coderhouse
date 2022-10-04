import path from 'path';
const authenticationMiddleware = async (req, res, next) => {
  if (req.session.email) {
    return next();
  }
  res.status(401);
  res.sendFile(path.join(process.cwd(), '/src/views/redirect401.html'));
};

export default authenticationMiddleware;