const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;

const server = app.listen(port, () => { 
  console.log(`Server is now listening on port ${port}`)
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

const projectData = {};

app.get('/', (req, res) => { 
  res.send(projectData);
});

app.post('/', (req, res) => { 
  const { temperature, date, userResponse } = req.body;
  projectData.temperature = temperature;
  projectData.date = date;
  projectData.userResponse = userResponse;
});