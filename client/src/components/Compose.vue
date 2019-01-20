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
      <p v-if="errors.length">
        <b>Bitte behebe die folgenden fehler:</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>
    <button type="submit" @click="checkForm" class="btn btn-primary">Thema online stellen</button>
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
        errors: [],
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
        checkForm: function (e) {
          if (this.title != "" && this.content != "") {
            this.compose();
          }

          this.errors = [];

          if (this.title == "") {
            this.errors.push('Du hast den Titel vergessen.');
          }
          if (this.content == "") {
            this.errors.push('Dein Post braucht Content.');
          }
          e.preventDefault();
      },
      compose: function () {
        let _this = this;
        ActionService.compose({
          token: _this.$applicationStorage.token,
          title: _this.title,
          content: _this.content,
          tags: _this.tags
        }).then(function (answer) {
          let newPost = answer.data.document.pop();
          _this.$applicationStorage.posts.push(newPost);
          _this.$router.replace('post/' + newPost._id);
        }, function (error) {
          console.log(error.message)
        });
      }
    }

  }
</script>
