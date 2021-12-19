const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');

const tourRoutes = require('./routes/tourRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message:
    'Слишком много запросов от этого IP, пожалуйста попробуйте через час!',
});

app.use('/api', limiter);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ limit: '10kb' }));

app.use(mongoSanitize());
app.use(xss());

app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);

app.all('*', (req, res, next) => {
  next(
    new AppError(`Не удалось найти путь ${req.originalUrl} на сервере!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
