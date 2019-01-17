console.log('Server is starting ...');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const DatabaseService = require('./service/database.js');
const AuthService = require('./service/auth');
const UserService = require('./service/user');
const PostService = require('./service/post');
const CommentService = require('./service/comment');


const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());


console.log('try to connect to database');
DatabaseService.connect();

console.log('try to connect to firebase');
AuthService.init();

app.post('/register', (request, response)=>{
    
    console.log(request.body);
    let data = request.body;
    let accessToken = data.token;
    AuthService.userAuth()
    .verifyIdToken(accessToken)
    .then(user => {
        UserService.create(data);
        response.send({
            message: `Hallo ${user.email}`
        });
    }).catch(err => {
        response.send({
            message: `you are not the real user`
        });
    });

});

app.post('/getUserData', (request, response) => {
    console.log('_______________ getUserData ________');
    let data = request.body;
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
    
    let data = request.body;
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

app.post('/comment', (request, response)=>{
    let data = request.body;
    console.log(data);
    CommentService.create(data).then(
      (result) => {
          //TODO refactor create and return full post object with tags
          PostService.get({_id: result._post}).then(
            (result) => {
                response.send({
                    document: result
                });
            }
          );
      }
    );
});

app.post('/post', (request, response) => {

    let data = request.body;

    AuthService.userAuth(data.token, data.uid).then(
      result => {
          console.log(result);
          PostService.get(data).then(
            (result) => {
                response.send({
                    document: result.pop()
                });
            },
            (error) => {
                response.send({
                    error: "Nicht gefunden"
                });
            }
          );
      },
      error => {
          response.send({
              error: "Diese Seite ist nur für eingeloggt User verfügbar."
          })
      }
    );



});

app.post('/list', (request, response) => {


    //TODO optimize result and remove privacy Data!!!

    let data = request.body;

    console.log(data);


    PostService.get(data).then(
      (result) => {
          console.log(result[0]);
          response.send({
              documents: result
          });
      }
    );

});

app.post('/dummy', (request, response)=>{});

app.listen(process.env.PORT || 8081);
