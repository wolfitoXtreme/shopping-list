const express = require('express');
const jsonServer = require('json-server');
const compression = require('compression');
const cors = require('cors');

const path = require('path');
require('dotenv').config();

const project = require('./package.json');

const { name: projectName } = project;

const port = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(compression());
app.use(express.static(path.join(__dirname, 'build')));
app.use(jsonServer.router('data/db.json'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(port, () => {
  console.log(
    projectName.toUpperCase() + ' - server is started!!, port: ',
    port
  );
});
