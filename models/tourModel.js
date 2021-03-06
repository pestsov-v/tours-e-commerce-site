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
      minlength: [10, 'Название тура должно быть больше 5 символов'],
    },
    slug: String,
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
      set: (val) => Math.round(val * 10) / 10,
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
    startLocation: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.index({ startLocation: '2dsphere' });

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });

  next();
});

tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
});

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
