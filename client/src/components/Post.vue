<template>
  <div class="container">
    <h1>{{document.title}}</h1>
    <hr>
    <div v-html="document.content" class="post_content"></div>
    <div>gefragt von: {{document._user.email}}</div>
    <div>am: {{document.created_at | formatDate}}</div>
    <div class="post_tags">
      <span v-for="(doc, index) in document._tags" class="post_tag">
        {{doc._tag.name}}
      </span>
    </div>
    <div class="post_comments">
      <div v-for="(doc, index) in document._comments" class="post_comment">
        <hr>
        <h5>Antwort von: {{doc._user.name}}, am {{doc.created_at | formatDate}}</h5>
        <div>{{doc.content}}</div>
      </div>
      <div class="post_new-comment">
        <h6>Jetzt antworten</h6>
        <div class="form-group">
          <wysiwyg v-model="newComment"/>
        </div>
        <button type="submit" @click="composeComment" class="btn btn-primary">Antworten</button>
      </div>
    </div>

  </div>
</template>

<script>

  import ActionService from '@/services/ActionService'
  import { EventBus } from '../global/event-bus.js';

  export default {
    name: 'list',
    data () {
      return {
        document: {
          _user: Object,
          _comments: Object,
          _tags: Object
        },
        newComment: "",
        fetching: true
      }
    },
    computed: {
      postData: function () {
      }
    },
    mounted() {
      let _this = this;
      // Listen for list-updated event and its payload.
      EventBus.$on('list-updated', function(value) {
        // while fetching flag is true
        // else it would jump
        if(_this.$data.fetching) {
          _this.getDocumentData();
          _this.$data.fetching = false;
        }
      });
      // get data
      _this.getDocumentData();
    },
    methods: {
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
          _user: this.$applicationStorage.user._id,
          content: this.newComment,
          _post: this.document._id
        }).then(
          function (answer) {
            _this.$applicationStorage.addPosts(answer.data.document, _this.$applicationStorage);
            _this.$data.document = answer.data.document.pop();
            _this.$data.newComment =  "";
          }, function (error) {
            console.log(err.message)
          })

      }
    }
  }
</script>
