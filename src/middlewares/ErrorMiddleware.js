import ErrorResponse from '../models/response/ErrorResponse';

export default (err, _, res, next) => {
  let errors = { ...err };

  if (!err.code && err.message) {
    errors = new ErrorResponse(500, err.message);
  }

  if (err.message) {
    errors.code = 500;
    errors.message = err.message;
  }

  // validator
  // Mongo Duplicate docs
  if (err.code === 11000) {
    errors = new ErrorResponse(400, err.keyValue);

    for (let i in errors.message) {
      errors.message[i] = `${i} is already existed`;
    }
  }

  // ObjectId validator
  if (err.name === 'CastError') {
    errors = new ErrorResponse(400, err.errors);
    errors.message = 'Id is invalid';
  }

  // Mongo validator

  if (err.name === 'ValidationError') {
    errors = new ErrorResponse(400, err.errors);
    for (let i in errors.message) {
      errors.message[i] = errors.message[i].message;
    }
  }

  res.status(errors.statusCode || 500).json({
    status: false,
    status_code: errors.statusCode || 500,
    message: errors.message || 'Server Error',
  });
  /*
    {code,message,success:false}
  */
  next();
};
