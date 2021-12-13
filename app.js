const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');

const tourRoutes = require('./routes/tourRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Не удалось найти путь ${req.originalUrl} на сервере!`,
  // });

  // const err = new Error();
  // err.status = 'fail';
  // err.statusCode = 404;

  next(
    new AppError(`Не удалось найти путь ${req.originalUrl} на сервере!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
