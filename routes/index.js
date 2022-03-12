const express = require('express'); //we need express, obv.

const apiRouter = require('./apiRouter'); //targets apiRouter file

const app = express();

app.use('/notes', apiRouter); //points up to apiRouter when in the /notes route, built up from server.js L13


module.exports = app; //sends out express to next depended file

