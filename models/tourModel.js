const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Тур должен иметь название'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'Тур должен иметь продолжительность'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Тур должен иметь размер групы'],
  },
  difficulty: {
    type: String,
    required: [true, 'Тур должен наличивать сложность путешествия'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'Тур должен иметь стоимость'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'Тур должен иметь описание'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'Тур должен иметь картинку'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
