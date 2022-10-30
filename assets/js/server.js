const express = require ('express');
const path = require('path');
const fs = require('fs');
const { get } = require('http');
const uuid = require('./uuid');

const app = express();

const PORT = 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('assets'));

app.get('/', (req, res) => {

    
res.sendFile(path.join(__dirname,'../../index.html'));
console.info(`${req.method} request received to get reviews`);

})


app.get('/notes', (req,res) => {

res.sendFile(path.join(__dirname,'../../notes.html'));
console.info(`${req.method} request received to get reviews`);

})

app.get('/api/notes', (req,res) => {

    var grabNotes = fs.readFileSync('./db/db.json');
    var displayNotes = JSON.parse(grabNotes);
    return res.json(displayNotes);
})

app.post('/notes', (req, res) => {

console.info(`${req.method} request to post data was received`);
console.info(req.body);

    var data = fs.readFileSync('./db/db.json');
    console.log(data);
    var myObject = JSON.parse(data);
    console.info(myObject);
    myObject.push(req.body);
    
    var newData = JSON.stringify(myObject);
    fs.writeFile('./db/db.json', newData, (err) => {
        err ? console.error('Error Detected') : console.log('Success: New Data Append');
    })

res.console.info(`${req.body} was added to db data`);

})



app.delete('/api/notes', (req, res) => {
    console.info(`${req.method} was called to request delete`);
var deleteData = fs.readFileSync('./db/db.json');
console.info(deleteData);

})






app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});