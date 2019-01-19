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

app.post('/register', (request, response)=> {
    let data = request.body;
    AuthService.userAuth(data.token)
    .then(
      error => {
          response.send({
              error: error
          });
      },
      proofed => {
          UserService.create(data).then(
            user => {
                response.send({
                    user: user
                });
            },
            error => {
                response.send({
                    error: error
                })
            }
          );

      });

});

app.post('/getUserData', (request, response) => {
    
    console.log('_______________ getUserData ________');
    let data = request.body;

    AuthService.userAuth(data.token)
    .then(
      user => {

          console.log('_______ userauth return ___________');
          console.log(user);
          console.log('___________________');

          response.send({
              user: user
          });
      },
      err => {
          response.send({
              error: err
          });
      });


});

//TODO - implement activated flag for user
app.get('/activate', (request, response) => {
    let data = request.body;
    AuthService.userAuth(data.token).then(
      user => {
          response.send({
              documents: user
          });
      },
      error => {
          response.send({
              error: error
          })
      }
    );
});

app.post('/compose', (request, response)=> {
    let data = request.body;
    AuthService.userAuth(data.token)
    .then(
      user => {
          console.log('_______ userauth return ___________');
          console.log(user);
          console.log('___________________');
          PostService.create(data, user).then(
            result => {
                console.log(result._id);
                PostService.get({_id: result._id}).then(
                  (postData) => {
                      console.log(postData);
                      response.send({
                          document: postData
                      });
                  }
                );
            },
            error => {
                response.send({
                    error: error
                });
            }
          );
      },
      error => {
          response.send({
              error: error
          });
      }
    );

});

app.post('/editPost', (request, response) => {
    let data = request.body;

    // get Post first for author uid -> check for owner
    PostService.get({_id: data._id}, true).then(
      posts => {
          let post = posts.pop();
          console.log(post);
          // authenticate the user and check ownership
          AuthService.userAuth(data.token, post._user.uid)
          .then(
            user => {

                console.log('_______ userauth return ___________');
                console.log(user);
                console.log('___________________');

                PostService.update(data, user).then(
                  (result) => {
                      PostService.get({_id: data._id}).then(
                        (postData) => {
                            response.send({
                             document: postData.pop()
                        });
                        },
                        error => {
                            response.send({
                                error: error
                            })
                        }
                      );
                  },
                  error => {
                      response.send({
                          error: error
                      })
                  }
                );
            },
            error => {
                response.send({
                    error: error
                });
            }
          );
      },
      error => {
          response.send({
              error: error
          });
      }
    )
});

app.post('/comment', (request, response)=> {
    let data = request.body;
    console.log(data);

    AuthService.userAuth(data.token).then(
      user => {
          CommentService.create(data, user).then(
            comment => {
                PostService.get({_id: comment._post}).then(
                  (post) => {
                      response.send({
                          document: post
                      });
                  },
                  error => {
                      response.send({
                          error: error
                      });
                  }
                );
            },
            error => {
                response.send({
                    error: error
                })
            }
          );
      },
      error => {

      }
    );


});

app.post('/editComment', (request, response) => {
    let data = request.body;

    // get Post first for author uid -> check for owner
    CommentService.get({_id: data._id}).then(
      comments => {
          let comment = comments.pop();
          console.log(comment);
          // authenticate the user and check ownership
          AuthService.userAuth(data.token, comment._user.uid)
          .then(
            user => {

                console.log('_______ userauth return ___________');
                console.log(user);
                console.log('___________________');

                CommentService.update(data, user).then(
                  (result) => {
                      console.log("comment updated"); 
                      PostService.get({_id: comment._post}).then(
                        (postData) => {
                            response.send({
                                document: postData.pop()
                            });
                        },
                        error => {
                            response.send({
                                error: error
                            })
                        }
                      );
                  },
                  error => {
                      response.send({
                          error: error
                      })
                  }
                );
            },
            error => {
                response.send({
                    error: error
                });
            }
          );
      },
      error => {
          response.send({
              error: error
          });
      }
    )
});


app.post('/post', (request, response) => {

    let data = request.body;

    AuthService.userAuth(data.token).then(
      user => {
          PostService.get(data).then(
            (result) => {
                response.send({
                    document: result.pop()
                });
            },
            (error) => {
                response.send({
                    error: error
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

    let data = request.body;

    PostService.get(data).then(
      posts => {
          response.send({
              documents: posts
          });
      },
      error => {
          response.send({
              error: error
          })
      }
    );

});

app.post('/dummy', (request, response)=> {
    let data = request.body;
    AuthService.userAuth(data.token).then(
      user => {
          response.send({
              documents: user
          });
      },
      error => {
          response.send({
              error: error
          })
      }
    );
});

app.listen(process.env.PORT || 8081);
