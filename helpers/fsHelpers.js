const fs = require('fs');
const util = require('util');

// promise-version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

/**
 * Function to write data to the json file given destination and content
 * @param {string} destination the file you want to write to
 * @param {object} content content to be written
 * @returns {void} nothing
 */
const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => err ? console.error(err) : console.info (`\nData written to ${destination}`)
);

/**
 * Funtion to read data from given file and append content to it.
 * @param {object} content the content to be appended to file
 * @param {string} file file path for appending file
 * @returns {void} nothing
 */
const readAndAppend = (content, file) => {
    fs.readFile(file, `utf8`, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

module.exports = {readFromFile, writeToFile, readAndAppend};