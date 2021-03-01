import ErrorResponse from '../models/response/ErrorResponse';
export default async (req, _, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : null;

  if (!token) {
    return next(new ErrorResponse(401, 'base token is required'));
  }
  // neu ton tai token

  const decode = new Buffer.from(token, 'base64').toString();

  if (`${process.env.BASE_USER}:${process.env.BASE_PASSWORD}` === decode) {
    // console.log('success');
    next();
  } else next(new ErrorResponse(404, 'invalid'));
};
