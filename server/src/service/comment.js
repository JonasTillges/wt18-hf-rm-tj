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
        create: SecurityConfiguration.LOGGED_IN,
        read: SecurityConfiguration.ALL,
        update: SecurityConfiguration.OWNER,
        delete: SecurityConfiguration.MODERATOR
    },


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
        console.log('Comment error: ' + err);
    }),

    get: function (data) {
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
    create: function (data) {
        return new Promise((resolve, reject) => {
            if (PermissionService.test(this.permission.create)) {

                // make this accessable
                let _this = this;

                // create and save post data
                new _this.Comment({
                    content: data.content,
                    _user: data._user,
                    _post: data._post
                }).save().then(
                  (result) => {
                      console.log('Comment CREATED:' + result);
                      resolve(result);
                  }
                );


            } else {
                reject("PERMISSION DENIED: ")
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
    }

};