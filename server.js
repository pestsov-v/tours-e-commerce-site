const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

const PORT = 4000 || process.env.PORT;
const handleOpen = () => console.log(`Server is running on port ${PORT}`);
app.listen(PORT, handleOpen);
