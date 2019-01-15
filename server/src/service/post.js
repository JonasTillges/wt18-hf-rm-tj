const SecurityConfiguration = require('../configuration/security');
const PermissionService = require('./permission.js');
const TagService = require('./tag.js');
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
    
    get: function (data) {
        if (PermissionService.test(this.permission.read)) {
            var query = this.Post.find({_id: data._id})
            .populate([
              {
                  path: '_user',
                  model: 'User'
              }
            ]);
            // execute the query at a later time
            query.exec(function (err, posts) {
                if (err) return err;
                // Prints the users
                console.log(posts);
            });
        }
    },
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
                                          if (index == tags.length-1) {
                                              console.log('last Tag');
                                              resolve(result);
                                          }
                                      }
                                    )
                                }
                              );
                          } else {
                              if (index == tags.length-1) {
                                  console.log("no tag");
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
            console.log(data);
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