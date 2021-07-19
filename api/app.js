const express = require('express');

// Utils
const headers = require('./utils/headers');
const dbConnect = require('./utils/dbConnet');

// Routers
const appRoutes = require('./routes/appRoutes');

const app = express();

app.use(headers);

app.use(express.json());

app.use('/upload', appRoutes);

dbConnect(app);
