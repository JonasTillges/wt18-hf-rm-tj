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
        update: SecurityConfiguration.ADMIN,
        delete: SecurityConfiguration.ADMIN
    },

    /**
     * database schema
     */
    Tag: mongoose.model('Tag', new Schema(
      {
          name: {type: String},
      },
      {
          collection: 'tag',
          timestamps: {createdAt: 'created_at'}
      }
      )
      .index('name', {unique: true})
    ).on('error', function (err) {
        console.log('Tag error: ' + err);
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
            var query = this.Tag.find(data);
            // execute the query at a later time
            query.exec(function (err, tags) {
                // Prints the users
                console.log(tags);
            });
        }
    },
    create: function (data) {
        if (PermissionService.test(this.permission.create)) {

            console.log('find tag?');

            // TODO maybe unique index?
            this.Tag.findOne({name: data.name}).exec(function (err, result) {

                if (err) {
                    console.log('ERROR - TODO ERROR HANDLING!!!!');
                    return err;
                }

                if (result) {
                    console.log('Tag ALREADY EXISTS:' + result);
                    this.postRelation({
                        postId: data.postId,
                        tagId: result._id
                    });
                    return result;
                }

                let newTag = new this.Tag({
                    name: data.name
                });

                return newTag.save().then(
                  function (result) {
                      console.log('Tag CREATED:' + result);
                      this.postRelation({
                          postId: data.postId,
                          tagId: result._id
                      });
                      return result;
                  }.bind(this)
                );

            }.bind(this));

        }
    },

    postRelation: function (data) {

        console.log(data);

        if (!data.postId || !data.tagId) {
            return;
        }

        new this.PostToTag(
          {
              _post: data.postId,
              _tag: data.tagId
          }
        ).save().then(
          function (ptt) {
              console.log('PostToTag CREATED: ' + ptt);
          }
        );

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