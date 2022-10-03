import path from 'path';
const authenticationMiddleware = async (req, res, next) => {
  if (req.session.name) {
    return next();
  }
  res.status(401);
  res.sendFile(path.join(process.cwd(), '/views/redirect401.html'));
};

export default authenticationMiddleware;