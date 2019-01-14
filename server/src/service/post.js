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
        if (PermissionService.test(this.permission.create)) {

           let newPost = new this.Post({
               title: data.title,
               content: data.content,
               _user: data._id
           });


            var postPromise = newPost.save()

            postPromise.then(
                function (result) {

                    // create Tags after Post creation
                    data.tags.split(',').forEach(function(element) {

                        TagService.create(
                          {name: element.trim(), postId: result._id}
                        );

                    });

                    console.log('POST CREATED: ' + result);


                }.bind(this)
            );

            return postPromise;
        }
    },
    update: function () {
        if (PermissionService.test(this.permission.update)) {

        }
    },
    delete: function (userId) {
        if (PermissionService.test(this.permission.delete)) {

        }
    }

};