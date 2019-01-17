console.log('Server is starting ...');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");
const DatabaseService = require('./service/database.js');
const UserService = require('./service/user');
const PostService = require('./service/post');
const CommentService = require('./service/comment');


const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://forum-7ed19.firebaseio.com"
  });

console.log('try to connect to database');
DatabaseService.connect();

   //getToken
// admin.auth()
//     .verifyIdToken(accessToken)
//     .then(decodedIdToken => {
//         return firebaseAdmin.auth().getUser(decodedIdToken.uid);
//     })
//     .then(user => {
//         // Do whatever you want with the user.
//     });
    
app.post('/register', (request, response)=>{
    
    console.log(request.body);
    let accessToken = request.body.uid;
    admin.auth()
    .verifyIdToken(accessToken)
    .then(decodedIdToken => {
        return firebaseAdmin.auth().getUser(decodedIdToken.uid);
    })
    .then(user => {
        console.log(user.email);
            
        response.send({
            message: `Hallo ${user.email}`
        });
        // Do whatever you want with the user.
    }).catch(err => {
        response.send({
            message: `you are not the real user`
        });
    });
    
    
    
    
    
    //UserService.create(request.body);


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

app.post('/comment', (request, response)=>{
    var data = request.body;
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
          console.log(result[0]);
          response.send({
              documents: result
          });
      }
    );

});

app.post('/dummy', (request, response)=>{});

app.listen(process.env.PORT || 8081);
