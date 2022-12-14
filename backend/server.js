const express = require('express');

const port  = process.env.PORT || 5000
const colors = require('colors');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorHandlerMiddleware')
const connectDB = require('./config/db');
const {protect} = require('./middleware/authMiddleware')

connectDB();

const app = express()

app.use(express.json()) //Parse Body/Json
app.use(express.urlencoded({extended: false})) //URL Encoded


app.use('/api/user', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(port, () => { console.log(`Server started on port ${port}`)})