const SecurityConfiguration = require('../configuration/security');
const PermissionService = require('./permission.js');
const DatabaseService = require('./database.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = {

    /**
     * Object for set the CRUD Security Levels
     */
    permission: {
        create: SecurityConfiguration.LOGGED_IN,
        read: SecurityConfiguration.ALL,
        update: SecurityConfiguration.LOGGED_IN,
        delete: SecurityConfiguration.ADMIN
    },

    PostToTag: mongoose.model('PostToTags', new Schema(
      {
          _post: {type: Schema.Types.ObjectId, ref: 'User', required: true},
          _tag: {type: Schema.Types.ObjectId, ref: 'PostToTags'}
      },
      {
          collection: 'post_to_tag',
          timestamps: {createdAt: 'created_at'}
      }
      )
    ),

    get: function (data) {
        if (PermissionService.test(this.permission.read)) {
            var query = this.PostToTag.find({_post: data._id})
            .populate({
                path: '_post',
                model: 'Post'
            },{
                path: '_tag',
                model: 'Tag'
            });
            // execute the query at a later time
            query.exec(function (err, posts) {
                if (err) return handleError(err);
                // Prints the users
                console.log(posts);
            });
        }
    },
    create: function (data) {
        if (PermissionService.test(this.permission.create)) {

           let newPostToTag = new this.PostToTag({
               _post: data.postId,
               _tag: data.tagId
           });

            newPostToTag.save().then(
                function (result) {
                    console.log('POST-To-Tag CREATED: ' + result);
                    this.get(result);
                }.bind(this)
            );
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