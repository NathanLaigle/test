const express = require('express');
const headers = require('./utils/headers');
const dbConnect = require('./utils/dbConnet');

const app = express();

app.use(headers);

app.use(express.json());

app.use('/', (req, res) => {
  res.json({ cul: 'swag' });
});

dbConnect(app);
