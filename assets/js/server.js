const express = require ('express');
const fs = require('fs');
const { get } = require('http');
const uuid = require('./uuid');

const app = express();

const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));



app.get('./api/notes', (req,res) => {

res.sendFile(path.join(_dirname,'../notes.html'));

console.info(`${req.method} request received to get reviews`);

})


app.post('./api/notes/', (req, res) => {

console.info(`${req.method} request to post data was received`);

const {title, description} = req.body;

if (title && description) {
    const newNote = {
        title,
        description,
        noteID: uuid(),

    };

    //grab the data from the json file, and push in the new title object array

    var data = fs.readFileSync('../db/db.json');
    var myObject = JSON.parse(data);
    
    myObject.push(newNote);
    
    var newData = JSON.stringify(myObject);
    fs.writeFile('../db/db.json', newData, (err) => {
        err ? console.err('Error Detected') : console.log('Success: New Data Append');
    })



}


})










app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});