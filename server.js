const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace('<password>', process.env.PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successful'));

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

const testTour = new Tour({
  name: 'Поход по дикому парку',
  rating: 4.2,
  price: 1899,
});

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const PORT = 4000 || process.env.PORT;
const handleOpen = () => console.log(`Server is running on port ${PORT}`);
app.listen(PORT, handleOpen);
