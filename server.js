const express = require ('express');
const path = require('path');
const fs = require('fs');
const { get } = require('http');
const uuid = require('./uuid');
const { title } = require('process');

const app = express();

const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

//get request for the initial dashboard page
app.get('/', (req, res) => {

res.sendFile(path.join(__dirname,'public/index.html'));
console.info(`${req.method} request received to get reviews`);

})


//get request for the notes page linked from the dashboard page
app.get('/notes', (req,res) => {

res.sendFile(path.join(__dirname,'public/notes.html'));
console.info(`${req.method} request received to get reviews`);

})


//get request to grab the data from the json file to display
app.get('/api/notes', (req,res) => {

    var grabNotes = fs.readFileSync('./db/db.json');
    var displayNotes = JSON.parse(grabNotes);
    return res.json(displayNotes);
})


//post request to save in new note information to db json file
app.post('/notes', (req, res) => {

console.info(`${req.method} request to post data was received`);

//appending new id variable to new notes that are being saved
const {title,text} = req.body
const id = uuid();
const newNote = {title, text, id};

var data = fs.readFileSync('./db/db.json');
var myObject = JSON.parse(data);
myObject.push(newNote);
    
var newData = JSON.stringify(myObject);
fs.writeFile('./db/db.json', newData, (err) => {
    err ? console.error('Error Detected') : console.log('Success: New Data Append');
})

res.json("Push Successful");

});


//delete request to clear out note and render updated list to page
app.delete('/api/notes/:id', (req, res) => {

console.info(`${req.method} was called to request delete`);

var deleteData = fs.readFileSync('./db/db.json');
var deleteArray = JSON.parse(deleteData);

newArray = deleteArray.filter(function(item) {
    return item.id != req.params.id
});

var newArrayFile = JSON.stringify(newArray);
fs.writeFile('./db/db.json',newArrayFile, (err) => {
err ? console.error('Error Detected') : console.log('Success: delete data');
});

res.json("Delete Successful");

});


app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});