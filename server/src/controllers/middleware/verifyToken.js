function verifyToken(req, res, next) {
  console.log(req.cookies);
  next();
}
export default verifyToken;
