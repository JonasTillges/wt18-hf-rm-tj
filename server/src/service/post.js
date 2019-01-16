const SecurityConfiguration = require('../configuration/security');
const PermissionService = require('./permission');
const TagService = require('./tag');
const CommentService = require('./comment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = {

    /**
     * Object for set the CRUD Security Levels
     */
    permission: {
        create: SecurityConfiguration.LOGGED_IN,
        read: SecurityConfiguration.ALL,
        update: SecurityConfiguration.OWNER,
        delete: SecurityConfiguration.MODERATOR
    },

    /**
     * database schema
     */
    Post: mongoose.model('Post', new Schema(
      {
          title: String,
          content: String,
          votes: {type: Number, default: 0},
          _user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
          _tags: Array,
          _comments: Array
      },
      {
          collection: 'post',
          timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
      }
      )
    ).on('error', function(err) {
        console.log('Post error: ' + err);
    }),

    PostToTag: mongoose.model('PostToTag',
      new Schema(
        {
            _post: {type: Schema.Types.ObjectId, ref: 'User', required: true, index: true},
            _tag: {type: Schema.Types.ObjectId, ref: 'Tag', required: true, index: true}
        },
        {
            collection: 'post_to_tag',
            timestamps: {createdAt: 'created_at'}
        }
      )
      .index({_post: 1, _tag: 1}, { "unique": true })
    ).on('error', function (err) {
        console.log('PostToTag error: ' + err);
    }),

    /**
     *
     * @param data
     * @returns {Promise}
     */
    get: function (data) {

        return new Promise((resolve, reject) => {
            if (PermissionService.test(this.permission.read)) {
                // make this accessable
                let _this = this;
                this.Post.find(data)
                .populate({path: '_user', model: 'User'})
                .exec((err, posts) => {
                    if (err) reject(err);
                    //Reason: Not able to populate over Post <- PostToTag -> Tag
                    let cycle = 0;
                    posts.forEach((element, index) => {
                       // get Tags of Post
                        _this.PostToTag.find({_post: element._id})
                        .populate({path: '_tag', model: 'Tag'})
                        .exec((err, tags) => {
                            // save tags
                            element._tags = tags;

                            // get Comments of Post
                            CommentService.get({_post: element._id})
                            .then(
                              (comments) => {
                                  // save comments
                                  element._comments = comments;
                                  // until all posts are mapped
                                  if(++cycle == posts.length) {
                                      resolve(posts);
                                  }
                              },
                              (error) => {
                                  reject(error);
                              }
                            );
                        })
                    });

                });
            } else {
                reject("ERROR: PostService.get() -> permission denied")
            }
        });

    },

    /**
     * Create Post with Tags
     * @param {Object} data
     * @returns {Promise}
     */
    create: function (data) {

        return new Promise((resolve, reject) => {
            // check for permission
            if (!PermissionService.test(this.permission.create)) {
                reject("Error: Keine Rechte zum Erzeugen von Post");
            } else {

                // make this accessable
                let _this = this;

                // create and save post data
                new _this.Post({
                    title: data.title,
                    content: data.content,
                    _user: data._id
                }).save().then(

                  (result) => {

                      // string to array
                      let tags = data.tags.split(',');

                      // create each Tag
                      tags.forEach(function(element, index) {
                          if (element != "") {
                              TagService.create(
                                {name: element.trim(), postId: result._id}
                              ).then(
                                function (tagResult) {
                                    // create Post to Tag relation
                                    new _this.PostToTag(
                                      {
                                          _post: result._id,
                                          _tag: tagResult._id
                                      }
                                    ).save().then(
                                      (ptt) => {
                                          console.log('PostToTag CREATED: ' + ptt);
                                          // if last tag
                                          if (index == tags.length-1) {
                                              resolve(result);
                                          }
                                      }
                                    )
                                }
                              );
                          } else {
                              // no tag found
                              if (index == tags.length-1) {
                                  resolve(result);
                              }
                          }

                      });

                      console.log('POST CREATED: ' + result);

                  }
                );
            }

        });

    },
    update: function () {
        if (PermissionService.test(this.permission.update)) {

        }
    },
    delete: function (userId) {
        if (PermissionService.test(this.permission.delete)) {

        }
    },
    postRelation: function (data) {

        return new Promise((resolve, reject) => {
            if (!data.postId || !data.tagId) {
                reject("PARAMETER ERROR: PostToTag NotEnoughGivenParams");
            } else {
                new this.PostToTag(
                  {
                      _post: data.postId,
                      _tag: data.tagId
                  }
                ).save().then(
                  function (ptt) {
                      console.log('PostToTag CREATED: ' + ptt);
                      resolve(ptt);
                  }
                );
            }
        });

    }

};