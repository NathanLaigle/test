const express = require('express');

// Utils
const headers = require('./utils/headers');
const dbConnect = require('./utils/dbConnet');
const errorHandler = require('./utils/errorHandler');

// Routers
const appRoutes = require('./routes/appRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const commentRoutes = require('./routes/commentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

//cron
const fileCheck = require('./cron/fileCheck');

const app = express();

app.use(headers);

app.use(express.json({ limit: '60mb' }));

app.use('/app', appRoutes);
app.use('/user', userRoutes);
app.use('/login', authRoutes);
app.use('/comment', commentRoutes);
app.use('/uploads', uploadRoutes);

app.use(errorHandler);

dbConnect(app);
