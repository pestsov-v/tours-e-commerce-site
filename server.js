const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! hutting down...');
  console.log(err.name, err.message);
  console.log(err.stack);
  process.exit(1);
});

dotenv.config({ path: './.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace('<password>', process.env.PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Data base connection successful'));

const PORT = process.env.PORT;
const handleOpen = () => console.log(`Server is running on port ${PORT}`);
app.listen(PORT, handleOpen);

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated!');
  });
});
