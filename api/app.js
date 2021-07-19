const express = require('express');

// Utils
const headers = require('./utils/headers');
const dbConnect = require('./utils/dbConnet');
const errorHandler = require('./utils/errorHandler');

// Routers
const appRoutes = require('./routes/appRoutes');

const app = express();

app.use(headers);

app.use(express.json());

app.use('/app', appRoutes);

app.use(errorHandler);

dbConnect(app);
