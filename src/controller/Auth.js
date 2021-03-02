import SuccessResponse from '../../../Selling-project/models/response/success';
import asyncMiddleware from '../middlewares/asyncMiddleware';
import ErrorResponse from '../models/response/ErrorResponse';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const Register = asyncMiddleware(async (req, res, next) => {
  const { name, email, password } = req.body;

  const check_user = await User.findOne({ email });

  if (check_user) {
    return next(new ErrorResponse(400, 'Email is already in use'));
  }

  const user = new User({ name, email, password });

  const rs = await user.save();
  res.status(200).json(new SuccessResponse(200, rs));
});

const Login = asyncMiddleware(async (req, res, next) => {
  const { email, password } = req.body;

  const check_user = await User.findOne({ email });
  if (!check_user) {
    return next(new ErrorResponse(400, 'There is no email registered'));
  }
  const { _id, name } = check_user;
  const compare_result = await bcrypt.compare(password, check_user.password);
  if (!compare_result) {
    return next(new ErrorResponse(400, 'Invalid password'));
  }

  const token = jwt.sign({ _id, name, email }, process.env.JWT_SECRET, {
    expiresIn: '12h',
  });
  res.status(200).json(
    new SuccessResponse(200, {
      _id,
      email,
      name,
      token,
    })
  );
});

export default {
  Register,
  Login,
};
