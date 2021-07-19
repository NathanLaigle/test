const express = require('express');

// Utils
const headers = require('./utils/headers');
const { dbConnect } = require('./utils/dbConnet');

// Routers
const uploadFileRoutes = require('./routes/uploadFileRoutes');

const app = express();

app.use(headers);

app.use(express.json());

app.use('/upload', uploadFileRoutes);

dbConnect(app);
