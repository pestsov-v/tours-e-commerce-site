const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.objectId,
    ref: 'Tour',
    required: [true, 'Бронирование должен иметь тур!'],
  },
  user: {
    type: mongoose.Schema.objectId,
    ref: 'Tour',
    required: [true, 'Бронирование должен иметь пользователя!'],
  },
  price: {
    type: Number,
    required: [true, 'Бронирование должно иметь цену'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate('user').populate({
    path: 'tour',
    select: 'name',
  });
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
