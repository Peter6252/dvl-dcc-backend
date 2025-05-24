
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const user = new User({ email: 'admin@dvl.com', password: hashedPassword, role: 'admin' });
  await user.save();
  console.log('Admin user created');
  process.exit();
}
seed();
