const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Тур должен иметь название'],
    unique: true,
  },
  rating: Number,
  price: {
    type: Number,
    required: [true, 'Тур должен иметь стоимость'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
