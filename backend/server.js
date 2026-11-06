require('dotenv').config();

const { validateEnv } = require('./config/env');
const problems = validateEnv();
if (problems.length > 0) {
  console.error('Cannot start the server. Fix your .env file:');
  problems.forEach((problem) => console.error(' - ' + problem));
  process.exit(1);
}

const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log('Server running at http://localhost:' + PORT);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });