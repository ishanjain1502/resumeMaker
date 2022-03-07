const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { MongoClient, Db } = require('mongodb');
const { json } = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true,
}));

mongoose.connect('mongodb://localhost:27017/resumeTester', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"))



app.post('/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phno = req.body.phno; // primary key ki tarah use krne ka try kero
    const age = req.body.age
    const addrs = req.body.addrs
    const lnkdn = req.body.lnkdn
    const sumry = req.body.sumry
    const ed1 = req.body.ed1
    const ed2 = req.body.ed2
    const skills = req.body.skills
    const title = req.body.title
    const descr = req.body.descr

    var data = {
        "name": name,
        "email": email,
        "phone-number": phno,
        "age": age,
        "address": addrs,
        "linkdein": lnkdn,
        "summary": sumry,
        "edu-details1": ed1,
        "edu-details2": ed2,
        "skills": skills,
        "title": title,
        "descr": descr

    }

    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Succesfully");
    });
    res.redirect('register-success.html');
})

app.get('/', (req, res) => {
    res.set({
        "Allow-access-Allow-origin": "*",
    })
    return res.redirect('index.html');
}).listen(3000);

//////////////////////// Rendering Result----------------------------
function generateRes() {
    document.getElementById("nameRes").innerHTML = document.getElementById("name").value;
}



/////////////---------------------------------------------------

app.get('/database', (req, res) => {
    db.collection('users').find({}).toArray((err, result) => {
        if (err) throw err
        res.send(result);
    })

})

// SEARCHING RESUMES
let key;

console.log("Listening on port 3000");