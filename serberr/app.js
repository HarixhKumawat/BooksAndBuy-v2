const express = require('express');
const indexRouter = require('./Routes/indexRouter');
const userRouter = require('./Routes/userRouter');
const bookRouter = require('./Routes/bookRouter');
const cors = require("cors");
const sessions = require("express-session");
const app = express();

app.use(cors());

app.use(express.json());
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/book', bookRouter);

module.exports = app