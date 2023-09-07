const express = require('express');
const apiRoutes = require('./routes/authRoutes');
const connectToMongoDB = require('./config/db')
require('dotenv').config();

const app = express();
app.use(express.json());

connectToMongoDB()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });


app.use('/api/books', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//tes