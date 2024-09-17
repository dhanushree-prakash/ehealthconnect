const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';  // Update with your MongoDB URI if needed
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('eHealthConnect');  // Use your database name here
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
  }
}

module.exports = connectDB;
