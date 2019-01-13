console.log('Server is starting ...');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const DatabaseService = require('./service/database.js');
const UserService = require('./service/user.js');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

console.log('try to connect to database');
DatabaseService.connect();

// TODO - REMOVE TESTING PURPOSE ONLY
app.get('/', (reqest, response) => {
    console.log('User in database:');
    UserService.get({uid: 82959892852});
});

app.post('/register', (request, response)=>{
    
    console.log('request');
    console.log(request);
    console.log('response');
    console.log(response);

    UserService.create(request.body);

    console.log(request.body);
    //UserService.create($.body.email, )
    response.send({
        message: "Hallo"
    });
});

app.get('/activate', (request, response) => {
    console.log(request.body);
});

app.listen(process.env.PORT || 8081);
