import ErrorResponse from '../models/response/ErrorResponse';
import jwt from 'jsonwebtoken';
import User from '../models/user';
export default async (req, res, next) => {
  if (!req.headers.authorization)
    return next(new ErrorResponse(401, 'Token is required'));
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return next(new ErrorResponse(401, 'Token expired'));
    }
  });
  const { _id } = jwt.decode(token, process.env.JWT_SECRET);

  const check_user = await User.findOne({ _id });
  if (!check_user) {
    return next(new ErrorResponse(400, 'User does not exist'));
  }
  next();
};
