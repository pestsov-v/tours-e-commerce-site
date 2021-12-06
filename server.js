const app = require('./app');

const PORT = 4000;
const handleOpen = () => console.log(`Server is running on port ${PORT}`);
app.listen(PORT, handleOpen);
