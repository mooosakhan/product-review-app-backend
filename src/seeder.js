// src/seeder.js
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/Product');

const products = [
  { name: 'Widget A', description: 'First widget', image: 'https://via.placeholder.com/150', price: 9.99 },
  { name: 'Widget B', description: 'Second widget', image: 'https://via.placeholder.com/150', price: 14.99 },
  { name: 'Gadget X', description: 'X-series gadget', image: 'https://via.placeholder.com/150', price: 19.99 },
  { name: 'Gadget Y', description: 'Y-series gadget', image: 'https://via.placeholder.com/150', price: 24.99 },
  { name: 'Thingamajig 1', description: 'Thingamajig one', image: 'https://via.placeholder.com/150', price: 4.99 },
  { name: 'Thingamajig 2', description: 'Thingamajig two', image: 'https://via.placeholder.com/150', price: 5.99 },
  { name: 'Doohickey Alpha', description: 'Alpha doohickey', image: 'https://via.placeholder.com/150', price: 29.99 },
  { name: 'Doohickey Beta', description: 'Beta doohickey', image: 'https://via.placeholder.com/150', price: 34.99 },
  { name: 'Contraption 1', description: 'Basic contraption', image: 'https://via.placeholder.com/150', price: 44.99 },
  { name: 'Contraption 2', description: 'Advanced contraption', image: 'https://via.placeholder.com/150', price: 54.99 },
];

const seed = async () => {
  try {
    await connectDB();
    await Product.deleteMany();      // clear existing
    await Product.insertMany(products);
    console.log('✅ 10 Products seeded');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seed();
