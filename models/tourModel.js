const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Тур должен иметь название'],
      unique: true,
      trim: true,
      maxlength: [40, 'Название тура должно быть меньше 40 символов'],
      minlength: [5, 'Название тура должно быть больше 5 символов'],
    },
    slug: {
      type: String,
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
      enum: {
        values: ['Лёгкая', 'Средняя', 'Трудная'],
        message:
          'Сложность может быть только трёх типов: "Лёгкая", "Средняя" или "Трудная"',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Рейтинг не может быть ниже единицы'],
      max: [5, 'Рейтинг не может быть больше 5'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Тур должен иметь стоимость'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'Скидочная цена ({VALUE}) не может быть больше обычной цены',
      },
    },
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
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
