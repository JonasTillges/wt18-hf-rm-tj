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

console.log('Try to connect to database');
DatabaseService.connect();

console.log('Try to connect to firebase');
AuthService.init();

/* Endpoints */

/**
 * Register an user
 */
app.post('/register', (request, response)=> {

    let data = request.body;
    // with registration flag
    AuthService.userAuth(data.token, false, true)
    .then(
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

      },
      error => {
          response.send({
              error: error
          });
      });

});

/**
 * get User Data
 */
app.post('/getUserData', (request, response) => {
    
    let data = request.body;

    AuthService.userAuth(data.token)
    .then(
      user => {
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

/**
 * compose a post
 */
app.post('/compose', (request, response)=> {
    let data = request.body;
    AuthService.userAuth(data.token)
    .then(
      user => {

          PostService.create(data, user).then(
            result => {
                PostService.get({_id: result._id}).then(
                  (postData) => {
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

/**
 * edit a post
 */
app.post('/editPost', (request, response) => {
    let data = request.body;

    // get Post first for author uid -> check for owner
    PostService.get({_id: data._id}, true).then(
      posts => {
          let post = posts.pop();
          // authenticate the user and check ownership
          AuthService.userAuth(data.token, post._user.uid)
          .then(
            user => {
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

/**
 * comment a post
 */
app.post('/comment', (request, response)=> {
    let data = request.body;
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

/**
 * Edit a comment of a post
 */
app.post('/editComment', (request, response) => {
    let data = request.body;

    // get Post first for author uid -> check for owner
    CommentService.get({_id: data._id}).then(
      comments => {
          let comment = comments.pop();
          // authenticate the user and check ownership
          AuthService.userAuth(data.token, comment._user.uid)
          .then(
            user => {
                CommentService.update(data, user).then(
                  (result) => {
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

/**
 * get data of a post
 */
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

/**
 * get a list of posts
 */
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

app.listen(process.env.PORT || 8081);
