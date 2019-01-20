const SecurityConfiguration = require('../configuration/security');
const PermissionService = require('./permission.js');
const DatabaseService = require('./database.js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
     * Object with db model
     */
    Comment: mongoose.model('Comment', new Schema(
      {
          content: String,
          votes: Number,
          _user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
          _post: {type: Schema.Types.ObjectId, ref: 'Post', required: true}
      },
      {
          collection: 'comment',
          timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
      })
    ).on('error', function (err) {
        console.log('Comment Error: ' + err);
    }),

    /**
     * get comments by data 
     * @param data for select
     * @param user for permission
     * @returns {Promise}
     */
    get: function (data, user) {
        return new Promise((resolve, reject) => {
            // make this accessable
            let _this = this;
            if (PermissionService.test(this.permission.read)) {
                _this.Comment.find(data)
                .populate('_user')
                .exec((error, comments) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(comments);
                })
            } else {
                reject("PERMISSION DENIED: Comment GET");
            }
        })
    },

    /**
     * create a comment
     * @param data for new document
     * @param user for permission
     * @returns {Promise}
     */
    create: function (data, user) {
        return new Promise((resolve, reject) => {
            if (PermissionService.test(this.permission.create, user.privilege)) {

                // make this accessable
                let _this = this;

                // create and save post data
                new _this.Comment({
                    content: data.content,
                    _user: user._id,
                    _post: data._post
                }).save().then(
                  (result) => {
                      resolve(result);
                  }
                );

            } else {
                reject("PERMISSION DENIED: Create Comment ") ;
            }
        });

    },

    /**
     * update a comment
     * @param data to find and update
     * @param user for permission
     * @returns {Promise}
     */
    update: function (data, user) {
        return new Promise((resolve, reject) => {
            if (PermissionService.test(this.permission.update, user.privilege)) {
                this.Comment.updateOne({_id: data._id}, {content: data.content}).exec((err, result) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });

            } else {
                reject("PERMISSION DENIED");
            }
        });
    },

    /**
     * Delete a user TODO - next version
     * @param data for query to delete
     * @param user for permission
     */
    delete: function (data, user) {
        if (PermissionService.test(this.permission.delete)) {

        }
    }

};