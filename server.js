
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const documentRoutes = require('./routes/documents');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api', authRoutes);
app.use('/api', documentRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
