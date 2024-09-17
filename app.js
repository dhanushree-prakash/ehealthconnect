const express = require('express');
const connectDB = require('./db');  // Import the database connection function

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

(async () => {
  const db = await connectDB();  // Connect to MongoDB

  // Basic route to test if the server is working
  app.get('/', (req, res) => {
    res.send('Welcome to E-Health Connect!');
  });

  // Example route: Add a patient to the database
  app.post('/add-patient', async (req, res) => {
    const patient = req.body;
    try {
      const patientsCollection = db.collection('patients');
      const result = await patientsCollection.insertOne(patient);
      res.status(200).send({ success: true, message: 'Patient added', data: result });
    } catch (err) {
      res.status(500).send({ success: false, message: 'Error adding patient', error: err });
    }
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();
