const express = require('express');
const { v4: uuidv4 } = require('uuid');
const {readFromFile, readAndAppend, writeToFile, } = require('../helpers/fsHelpers');

const app = express();


/**
 * Because we get our routing from multiple files, we "/" here refers to "/api/notes"
 * we get "/api" from server.js
 * we get "xxx/notes" from index.js
 */

//gets the json from db which is then passed to client-side index.js
app.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//gets a specific note based on ID, again, passed off to client-side
app.get('/:id', (req, res) => {
    const noteID = req.params.id;
    readFromFile('./db/db.json').then((data) => JSON.parse(data)).then((json) => {
        const result=json.filter((note) => note.id !== noteID);
        return result.length > 0 ? res.json(result) : res.json('No note with that ID');
    });
});

//deletes specified ID'd note by filtering out the spcified note, then saving all the rest (effectively deleting the specified note)
app.delete('/:id', (req, res) => {
    const noteID = req.params.id;
    readFromFile('./db/db.json').then((data) => JSON.parse(data)).then((json) => {
        const result = json.filter((note) => note.id !== noteID);

        writeToFile('./db/db.json', result);

        res.json(`Note ${noteID} has been removed`);
    });
});


//posts a new note.
app.post('/', (req, res) => {
    console.log(req.body);

    const { title, text, id } = req.body;

    if (req.body && req.body.title) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json('New note accepted!');
    } else {
        res.error('Error in addting this note');
    }
});

module.exports = app;