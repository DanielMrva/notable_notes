const express = require('express'); //sets up app to require express
const path = require('path');
const apiRouter = require('./routes/index.js') //points to index.js in routes for further routing

const PORT = process.env.PORT || 3001; //heroku and default port usage

const app = express(); //assign app variable to express


//middleware
app.use(express.json()); //express json handling
app.use(express.urlencoded({ extended: true })); //express url encoding
app.use('/api', apiRouter); //points to index.js in routes to build route path.   

app.use(express.static('public')); //points to public folder for static pages.

//router for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

//router for homepage
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`)
});
