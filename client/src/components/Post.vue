<template>
  <div class="container">

    <div class="card border-light mb-3">
      <div class="card-header text-muted">
        <div class="text-muted">{{document._user.name}} schrieb am {{document.created_at | formatDate}}</div>
      </div>
      <div class="card-body">
        <div class="post_content" v-if="!edit.post.show">
          <h1>{{document.title}}</h1>
          <div v-html="document.content" class="post_content"></div>
          <div class="post_tags">
          <span v-for="(doc) in document._tags" :key="doc._tag._id" class="post_tag">
            {{doc._tag.name}}
          </span>
          </div>
          <div class="post_edit" v-if="owner && isLoggedIn">
            <button type="button" class="btn btn-sm btn-danger" @click="postEditShow(document.title, document.content)">
              <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
              Editieren
            </button>
          </div>
        </div>
        <div class="post_content-edit" v-if="edit.post.show">
          <input v-model="edit.post.title" type="text" class="form-control" id="title" placeholder="Was ist dein Thema?">
          <wysiwyg v-model="edit.post.content"/>
          <button type="button" class="btn btn-sm btn-success" @click="postEditPost()">
            <i class="fa  fa-floppy-o" aria-hidden="true"></i>
            Speichern
          </button>
          <button type="button" class="btn btn-sm btn-danger" @click="postEditClose()">
            <i class="fa  fa-times-circle-o" aria-hidden="true"></i>
            Abbrechen
          </button>
        </div>
      </div>
    </div>

    <div class="post_comments">
      <div v-for="(doc) in document._comments" :key="doc._id" class="post_comment">

        <div class="card border-light mb-3">
          <div class="card-header text-muted">
            {{doc._user.name}} antwortete am {{doc.created_at | formatDate}}
          </div>
          <div class="card-body">
            <div  v-if="edit.comment._id != doc._id || !edit.comment.show">
              <div v-html="doc.content" class="post_comment-content"></div>
              <div class="comment_edit" v-if="isOwner(doc._user._id)">
                <button v-if="!edit.show" type="button" class="btn btn-sm btn-danger" @click="commentEditShow(doc._id, doc.content)">
                  <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                  Editieren
                </button>
              </div>
            </div>
            <div v-if="edit.comment._id == doc._id && edit.comment.show">
              <wysiwyg v-model="edit.comment.content"/>
              <button type="button" class="btn btn-sm btn-success" @click="commentEditComment()">
                <i class="fa  fa-floppy-o" aria-hidden="true"></i>
                Speichern
              </button>
              <button type="button" class="btn btn-sm btn-danger" @click="commentEditClose()">
                <i class="fa  fa-times-circle-o" aria-hidden="true"></i>
                Abbrechen
              </button>
            </div>
          </div>
          </div>
        </div>

      
      </div>
      <div class="post_new-comment" v-if="isLoggedIn">
        <h6>Jetzt antworten</h6>
        <div class="form-group">
          <wysiwyg v-model="newComment"/>
        </div>

            <p v-if="errors.length">
            <b>Bitte behebe die folgenden fehler:</b>
            <ul>
              <li v-for="error in errors">{{ error }}</li>
            </ul>
          </p>
        <button type="submit" @click="checkComment" class="btn btn-primary">Antworten</button>
        
      </div>
    </div>

  </div>
</template>

<script>

  import ActionService from '@/services/Action';
  import AuthService from '@/services/Auth';
  import { EventBus } from '../global/event-bus.js';

  export default {
    name: 'list',
    data () {
      return {
        document: {
          _user: Object,
          _comments: Object,
          _tags: Object,
        },
        newComment: "",
        fetching: true,
        isLoggedIn: this.$applicationStorage.isLoggedIn,
        owner: false,
        edit: {
          post: {
            show: false,
            title: "",
            content: "",
          },
          comment: {
            show: false,
            content: "",
            _id: ""
          }
        },
        errors: []
      }
    },
    mounted() {
      let _this = this;
      // Listen for list-updated event and its payload.

      EventBus.$on('login-status', function() {
        _this.$data.isLoggedIn = _this.$applicationStorage.isLoggedIn;
      });

      EventBus.$on('list-updated', function() {
        // while fetching flag is true
        // else it would jump
        if(_this.$data.fetching) {
          _this.getDocumentData();
          _this.$data.fetching = false;
          _this.$data.owner = this.isOwner(this.document._user._id);
        }
      });
      // get data
      _this.getDocumentData();


      this.$data.owner = this.isOwner(this.document._user._id);

    },
    methods: {
      checkComment: function (e) {
        if (this.newComment != "") {
          this.composeComment();
        }

        this.errors = [];

        if (this.newComment == "") {
          this.errors.push('Schreibe einen Kommentar.');
        }
        e.preventDefault();
      },
      getDocumentData: function () {
        let _this = this;
        if (_this.$applicationStorage.posts.length != 0) {
          let postDocument = _this.$applicationStorage.posts.filter(
            function (document, index) {
              if (document._id == _this.$route.params.id) {
                return true;
              }
            }
          );
          if (postDocument.length === 0) {
            _this.$router.replace('/404');
          }
          this.$data.document = postDocument.pop();
        }

      },

      composeComment: function () {
        let _this = this;
        ActionService.comment({
          token: this.$applicationStorage.token,
          content: this.newComment,
          _post: this.document._id
        }).then(
          function (answer) {
            _this.$applicationStorage.addPosts(answer.data.document, _this.$applicationStorage);
            _this.$data.document = answer.data.document.pop();
            _this.$data.newComment =  "";
          }, function (error) {
            EventBus.$emit('notification', error.message);
          })
      },

      // EDIT - POST //

      postEditShow: function(title, content) {
        this.$data.edit.post.show = true;
        this.$data.edit.post.title = title;
        this.$data.edit.post.content = content;
      },
      postEditClose: function() {
        this.$data.edit.post.show = false;
      },
      postEditPost: function() {
        let _this = this;
        ActionService.editPost({
          token: _this.$applicationStorage.token,
          _id: this.$data.document._id,
          title: this.$data.edit.post.title,
          content: this.$data.edit.post.content
        }).then(
          result => {
            _this.$data.document.title = result.data.document.title;
            _this.$data.document.content = result.data.document.content
            _this.postEditClose();
          },
          error => {
            EventBus.$emit('notification', error.data.error);
          }
        );

      },

      // EDIT - COMMENT //

      commentEditShow: function(id, content) {
        this.$data.edit.comment.show = true;
        this.$data.edit.comment.content = content;
        this.$data.edit.comment._id = id;
      },
      commentEditClose: function() {
        this.$data.edit.comment.show = false;
      },
      commentEditComment: function() {
        let _this = this;
        ActionService.editComment({
          token: _this.$applicationStorage.token,
          _id: this.$data.edit.comment._id,
          content: this.$data.edit.comment.content
        }).then(
          result => {
            _this.$data.document = result.data.document;
            _this.commentEditClose();
          },
          error => {
            EventBus.$emit('notification', error.data.error);
          }
        );
      },

      isOwner: function (userId) {
        return (userId == this.$applicationStorage.user._id);
      }
    }
  }
</script>
