// app.js

const express = require('express');
const app = express();
const pool = require('./db');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index1.html'));
});


// Define the form submission route
// Change the route to handle POST requests
app.post('/fetch-data', async (req, res) => {
    try {
      const { username } = req.body;
  
      if (!username) {
        return res.status(400).send('Username is required.');
      }
  
      const result = await pool.query('SELECT * FROM public.register WHERE name = $1', [username]);
      console.log('Data fetched:', result.rows);
  
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching data from the database:', error);
      res.status(500).send(`Internal Server Error: ${error.message}`);
    }
  });
  
  /*
  // Define a route to fetch data from the database
  app.get('/fetch-data/:username', async (req, res) => {
    try {
      const { username } = req.params;
  
      if (!username) {
        return res.status(400).send('Username is required.');
      }
  
      const result = await pool.query('SELECT * FROM public.register WHERE name = $1', [username]);
      console.log('Data fetched:', result.rows);
  
      // If data is found, send it as JSON; otherwise, send a message
      if (result.rows.length > 0) {
        res.json(result.rows);
      } else {
        res.send('No data found for the specified username.');
      }
    } catch (error) {
      console.error('Error fetching data from the database:', error);
      res.status(500).send(`Internal Server Error: ${error.message}`);
    }
  });
  */

  // Update the route to handle both GET and POST requests
  // Separate routes for GET and POST requests
  /*
  app.get('/fetch-data/:username', async (req, res) => {
    try {
      const { username } = req.params;
  
      if (!username) {
        return res.status(400).send('Username is required.');
      }
  
      const result = await pool.query('SELECT name FROM public.register WHERE name = $1', [username]);
      console.log('Data fetched:', result.rows);
  
      // If data is found, send the name value; otherwise, send a message
      if (result.rows.length > 0) {
        res.send(result.rows[0].name);
      } else {
        res.send('No data found for the specified username.');
      }
    } catch (error) {
      console.error('Error fetching data from the database:', error);
      res.status(500).send(`Internal Server Error: ${error.message}`);
    }
  });
  */

  app.get('/fetch-data/:username', async (req, res) => {
    try {
      const { username } = req.params;
  
      if (!username) {
        return res.status(400).send('Username is required.');
      }
  
      const result = await pool.query('SELECT name, "urls" FROM public.register WHERE name = $1', [username]);
      console.log('Data fetched:', result.rows);
  
      // If data is found, extract the URL and send it; otherwise, send a message
      if (result.rows.length > 0) {
        const extractedURL = result.rows[0].urls; // Assuming the column name is "URLs"
        res.send(extractedURL);
      } else {
        res.send('No data found for the specified username.');
      }
    } catch (error) {
      console.error('Error fetching data from the database:', error);
      res.status(500).send(`Internal Server Error: ${error.message}`);
    }
  });
  
  
  
  
  app.post('/fetch-data', async (req, res) => {
    try {
      const { username } = req.body;
  
      if (!username) {
        return res.status(400).send('Username is required.');
      }
  
      const result = await pool.query('SELECT * FROM public.register WHERE name = $1', [username]);
      console.log('Data fetched:', result.rows);
  
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching data from the database:', error);
      res.status(500).send(`Internal Server Error: ${error.message}`);
    }
  });
  
  // Route for handling the GET request without a specified username
  app.get('/fetch-data', (req, res) => {
    res.send('Please provide a username in the URL, e.g., /fetch-data/:username');
  });
  
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
