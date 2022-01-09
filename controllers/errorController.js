const AppError = require('./../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Не действительный ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleJWTExpiredError = () =>
  new AppError(
    'Срок действия Вашего токена авторизации истёк! Пожалуйста ввойдите в вашу учётную запись ещё раз.',
    401
  );

const handleJWTError = () =>
  new AppError(
    'Не верный токен авторизации! Пожалуйста ввойдите в вашу учётную запись ещё раз.',
    401
  );

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);

  const message = `Дублирующееся значение: ${value}. Пожалуйста используйте другое значение!`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Ошибочные данные из базы данных. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    res.status(err.statusCode).render('error', {
      title: 'Что-то произошло не так...',
      msg: err.message,
    });
  }
};

const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    console.error('ERROR 💥', err);

    return res.status(500).json({
      status: 'error',
      message: 'Что-то пошло не так!',
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Что-то пошло не так!',
      msg: err.message,
    });
  }

  console.error('ERROR 💥', err);

  return res.status(err.statusCode).render('error', {
    title: 'Что-то пошло не так!',
    msg: 'Пожалуйста попробуйте позже.',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') errror = handleJWTExpiredError();
    sendErrorProd(error, req, res);
  }
};
