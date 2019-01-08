console.log('Server is starting ...');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const DatabaseService = require('./service/database.js');
<<<<<<< HEAD
=======
const UserService = require('./service/user');
>>>>>>> master

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

console.log('try to connect to database');
DatabaseService.connect();

<<<<<<< HEAD
app.post('/register', (req,res) => {
    res.send({
        message: `Hallo ${req.body.email}`
    })
=======
app.post('/register', (request, response)=>{
    
    console.log('request');
    console.log(request);
    console.log('response');
    console.log(response);

    UserService.action.create();

    res.send({
        message: "Hallo"
    });
>>>>>>> master
});

app.listen(process.env.PORT || 8081);
