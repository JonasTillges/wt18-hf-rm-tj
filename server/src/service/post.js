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
        create: SecurityConfiguration.BASIC_USER,
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
    )
    .on('error', function (err) {
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
      .index({_post: 1, _tag: 1}, {"unique": true})
    ).on('error', function (err) {
        console.log('PostToTag error: ' + err);
    }),

    /**
     *
     * @param data
     * @param simple
     * @returns {Promise}
     */
    get: function (data, simple) {

        return new Promise((resolve, reject) => {
            if (PermissionService.test(this.permission.read)) {
                // make this accessible
                let _this = this;
                this.Post.find(data)
                .populate('_user')
                .exec((err, posts) => {
                    if (err) {
                        reject(err);
                    } else if (!posts.length) {
                        reject("No Posts found");
                    } else if (simple) {
                        resolve(posts);
                    } else {
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
                                  comments => {
                                      // save comments
                                      element._comments = comments;
                                      // until all posts are mapped
                                      if (++cycle == posts.length) {
                                          resolve(posts);
                                      }
                                  },
                                  error => {
                                      reject(error);
                                  }
                                );
                            })
                        });
                    }
                });
            } else {
                reject("ERROR: PostService.get() -> permission denied")
            }
        });

    },

    /**
     * Create Post with Tags
     * @param {Object} data
     * @param {Object} user
     * @returns {Promise}
     */
    create: function (data, user) {

        return new Promise((resolve, reject) => {
            // check for permission
            if (!PermissionService.test(this.permission.create, user.privilege)) {
                reject("Error: Keine Rechte zum Erzeugen von Post");
            } else {

                // make this accessable
                let _this = this;

                // create and save post data
                new _this.Post({
                    title: data.title,
                    content: data.content,
                    _user: user._id
                }).save().then(
                  (result) => {

                      // string to array
                      let tags = data.tags.split(',');

                      // create each Tag
                      tags.forEach(function (element, index) {
                          if (element != "") {
                              TagService.create(
                                {name: element.trim(), postId: result._id},
                                user
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
                                          // if last tag
                                          if (index == tags.length - 1) {
                                              resolve(result);
                                          }
                                      }
                                    )
                                }
                              );
                          } else {
                              // no tag found
                              if (index == tags.length - 1) {
                                  resolve(result);
                              }
                          }

                      });

                  }
                );
            }

        });

    },

    /**
     * update post
     * @param data
     * @param user
     * @returns {Promise}
     */
    update: function (data, user) {
        return new Promise((resolve, reject) => {
            if (PermissionService.test(this.permission.update, user.privilege)) {
                this.Post.updateOne({_id: data._id}, {title: data.title, content: data.content}).exec((err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });

            } else {
                reject("ERROR: no Permission");
            }
        });
    },

    /**
     * TODO WIP
     * @param data
     * @param user
     */
    delete: function (data, user) {
        if (PermissionService.test(this.permission.delete)) {

        }
    },

    /**
     * create relation between post and tag
     * @param data
     * @returns {Promise}
     */
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
                      resolve(ptt);
                  }
                );
            }
        });

    }


};