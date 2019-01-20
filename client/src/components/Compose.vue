<template>
  <div class="container" v-if="loggedIn">
    <h1>Thema verfassen</h1>
    <div class="form-group">
      <input v-model="title" type="text" class="form-control" id="title" aria-describedby="titleHelp" placeholder="Was ist dein Thema?">
      <small id="titleHelp" class="form-text text-muted">Benutze ein aussagekräftiges Thema, um andere User darauf
        aufmerksam zu machen.
      </small>
    </div>
    <div class="form-group">
      <wysiwyg v-model="content"/>
    </div>
    <div class="form-group">
      <label for="tags">Tags</label>
      <input v-model="tags" type="text" class="form-control" id="tags" aria-describedby="tagsHelp" placeholder="Webtechnologien, Vue, Javascript">
      <small id="tagsHelp" class="form-text text-muted">Kommaseparierte Tags z.B. "Webtechnologien, Vue, Javascript"
      </small>
    </div>
    <button type="submit" @click="compose" class="btn btn-primary">Thema online stellen</button>
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
        title: '',
        content: '',
        tags: '',
        loggedIn: AuthService.isReal()
      }
    },
    mounted() {
      let _this = this;
      // Listen for login-status event
      EventBus.$on('login-status', function() {
        if (AuthService.isReal()) {
          _this.$data.loggedIn = true;
        } else {
          _this.$router.replace('login');
        }

      });
    },
    methods: {
      compose: function () {
        let _this = this;
        ActionService.compose({
          token: _this.$applicationStorage.token,
          title: _this.title,
          content: _this.content,
          tags: _this.tags
        }).then(function (answer) {
          let newPost = answer.data.document.pop();
          _this.$applicationStorage.addPosts(newPost, _this.$applicationStorage);
          _this.$router.replace('post/' + newPost._id);
        }, function (error) {
          EventBus.$emit('notification', error.message);
        });
      }
    }

  }
</script>
