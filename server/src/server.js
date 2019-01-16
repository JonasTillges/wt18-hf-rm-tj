console.log('Server is starting ...');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const DatabaseService = require('./service/database.js');
const UserService = require('./service/user');
const PostService = require('./service/post');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

console.log('try to connect to database');
DatabaseService.connect();

app.post('/register', (request, response)=>{
    
    UserService.create(request.body);

    //UserService.create($.body.email, )
    response.send({
        message: `Hallo ${request.body.name}`
    });
});

app.post('/getUserData', (request, response) => {
    console.log('_______________ getUserData ________');
    var data = request.body;
    UserService.get(data).then(
            (result) => {
                let user = result[0]
                //TODO better way for first or get only one user
                response.send({
                    user: user
                });
            },
            (err) => {
                console.log(err)
                response.send({
                    message: `Hallo ${error}`
                });
            }
        );
});

app.get('/activate', (request, response) => {
    console.log(request.body);
});

app.post('/compose', (request, response)=>{
    
    var data = request.body;
    PostService.create(data).then(
      (result) => {
          console.log(result._id);
          //TODO refactor create and return full post object with tags
          PostService.get({_id: result._id}).then(
            (postData) => {
                console.log(postData);
                response.send({
                    document: postData
                });
            }
          );
      }
    );
});

app.post('/post', (request, response) => {

    var data = request.body;
    PostService.get(data).then(
      (result) => {
          response.send({
              document: result.pop()
          });
      }
    );

});

app.post('/list', (request, response) => {

    //TODO optimize result and remove privacy Data!!!

    var data = request.body;
    PostService.get(data).then(
      (result) => {
          response.send({
              documents: result
          });
      }
    );

});

app.post('/dummy', (request, response)=>{});

app.listen(process.env.PORT || 8081);
