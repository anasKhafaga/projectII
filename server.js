/**
 * projectData Object
 */
const projectData = {};

/**
 * Packages requiring
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/**
 * Express App Initiation
 */
const app = express();

/**
 * Gloabl variables
 */
const port = 3000;

/**
 * Starting the Server
 */
app.listen(port, () => {
  console.log(`Server is now listening on port ${port}`);
});

/**
 * Middlewares
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));

/**
 * Routes
 */
app.get('/', (req, res) => {
  res.send(projectData);
});

app.post('/', (req, res) => {
  const { feelings, temperature, date } = req.body;
  projectData.feelings = feelings;
  projectData.temperature = temperature;
  projectData.date = date;
  res.send(projectData);
});
